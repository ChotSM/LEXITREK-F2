export const VERSION = '1.0.0';
export const DAY = 86400000;
export const PHASES = ['learning', 'orientation', 'baseline', 'intervention', 'immediate', 'retention', 'delayed', 'released'];
export const PAUSED = new Set(['orientation', 'baseline', 'immediate', 'retention', 'delayed']);
export const normalize = s => String(s).normalize('NFKC').toLowerCase().trim().replace(/[.!?,;:]+$/g, '').replace(/\s+/g, ' ');
export const correctAnswer = (answer, word) => normalize(answer) === normalize(word);
export function newProfile(id, name, avatar = 'hiker') {
  return {id, name, avatar, unit: 1, position: 0, lap: 1, stars: 0, steps: 0, turn: 0, records: {}, events: [], badges: []};
}
export function recordFor(profile, id) {
  if (!profile.records[id]) profile.records[id] = {taught:false, independent:{recognition:0,recall:0,context:0}, qualified:[], recallDays:[], attempts:0, assisted:0, errors:0, support:0, lastTurn:-100, lastAt:0, dueAt:0};
  return profile.records[id];
}
export function stageFor(r) {
  if (!r?.taught) return 'teach';
  if (r.support >= 2 || r.independent.recognition < 2) return 'recognition';
  if (r.independent.recall < 2 || r.recallDays.length < 2) return 'recall';
  return 'context';
}
export function statusFor(r) {
  if (!r?.taught) return 'New word';
  if (r.support >= 2) return 'Needs support';
  if (r.independent.recall >= 2 && r.recallDays.length >= 2 && r.independent.context >= 2) return 'Secure for now';
  if (r.independent.recall > 0) return 'Building recall';
  if (r.independent.recognition >= 2) return 'Ready for recall';
  return 'Getting familiar';
}
export function candidates(profile, words, unit, reviewOnly = false, now = Date.now()) {
  const pool = words.filter(w => reviewOnly || w.unit === unit);
  const eligible = pool.filter(w => {
    const r=profile.records[w.id];
    return !reviewOnly || (r?.taught && r.dueAt <= now);
  });
  const spaced = eligible.filter(w => !profile.records[w.id] || profile.turn-profile.records[w.id].lastTurn >= 3);
  return (spaced.length ? spaced : eligible).sort((a,b) => {
    const ar=profile.records[a.id],br=profile.records[b.id];
    const priority=r=>!r?.taught?1:r.dueAt<=now?0:2;
    return priority(ar)-priority(br) || (ar?.lastAt??0)-(br?.lastAt??0) || a.id.localeCompare(b.id);
  });
}
export function teach(profile, wordId, now = Date.now()) {
  const r=recordFor(profile,wordId);r.taught=true;
  profile.events.push({id:`${profile.id}-${profile.events.length+1}`,type:'study',wordId,at:now,appVersion:VERSION});
}
export function applyResult(profile, task, answer, assistance = [], activeMs = 0, now = Date.now(), phase = 'learning') {
  if (PAUSED.has(phase)) throw new Error('Target practice is paused in this study phase.');
  if (!['recognition','recall','context'].includes(task.stage)) throw new Error('Invalid task stage');
  const r=recordFor(profile,task.wordId);
  const correct=correctAnswer(answer,task.word);
  const supported=assistance.length>0;
  profile.turn++; r.attempts++;r.lastAt=now;r.lastTurn=profile.turn;
  const day=new Date(now).toISOString().slice(0,10);
  const key=`${task.stage}:${task.variant}:${day}`;
  if(correct){
    if(supported)r.assisted++;
    else {
      if(!r.qualified.includes(key)){
        r.independent[task.stage]++;r.qualified.push(key);
        if(task.stage==='recall'&&!r.recallDays.includes(day))r.recallDays.push(day);
      }
      r.support=Math.max(0,r.support-1);
    }
  }else{r.errors++;r.support=Math.min(3,r.support+1);}
  const gap=!correct||supported?0:task.stage==='recognition'&&r.independent.recognition<2?0:statusFor(r)==='Secure for now'?Math.min(30,Math.max(3,r.independent.context*3)):1;
  r.dueAt=now+gap*DAY;
  const stars=correct?(supported?5:10):0;profile.stars+=stars;
  const event={id:`${profile.id}-${profile.events.length+1}`,type:'answer',wordId:task.wordId,stage:task.stage,variant:task.variant,answer:String(answer),correct,assistance:[...assistance],independent:correct&&!supported,activeMs:Math.max(0,Math.round(activeMs)),at:now,phase,appVersion:VERSION,packVersion:task.packVersion,stars};
  profile.events.push(event);return event;
}
export function finishStep(profile, correct, assisted) {
  profile.steps++;profile.position+=correct&&!assisted?2:1;
  let summit=false;
  if(profile.position>=30){profile.position=0;profile.lap++;summit=true;if(!profile.badges.includes('summit'))profile.badges.push('summit');}
  if(profile.steps>=6&&!profile.badges.includes('first-six'))profile.badges.push('first-six');
  return summit;
}
export function metrics(profile, words, now = Date.now()) {
  const answers=profile.events.filter(e=>e.type==='answer');
  const independent=answers.filter(e=>!e.assistance.length);
  const byStage=stage=>{const a=independent.filter(e=>e.stage===stage);return {total:a.length,correct:a.filter(e=>e.correct).length,accuracy:a.length?Math.round(100*a.filter(e=>e.correct).length/a.length):null};};
  return {seen:words.filter(w=>profile.records[w.id]?.taught).length,secure:words.filter(w=>statusFor(profile.records[w.id])==='Secure for now').length,due:words.filter(w=>profile.records[w.id]?.taught&&profile.records[w.id].dueAt<=now).length,assisted:answers.filter(e=>e.assistance.length).length,total:answers.length,recognition:byStage('recognition'),recall:byStage('recall'),context:byStage('context'),activeMs:answers.reduce((n,e)=>n+e.activeMs,0)};
}
export function csvCell(value) {
  let s=String(value??'');if(/^[=+\-@\t\r]/.test(s))s="'"+s;
  return '"'+s.replace(/"/g,'""')+'"';
}
export function validateBackup(data, wordIds) {
  if(data?.format!=='lexitrek-backup'||data.version!==1||!Array.isArray(data.profiles)||!data.profiles.length||data.profiles.length>50)throw new Error('This is not a supported LexiTrek backup.');
  if(!PHASES.includes(data.settings?.phase))throw new Error('Invalid study phase.');
  const seen=new Set(), allowed=new Set(wordIds), profiles=[];
  for(const p of data.profiles){
    if(typeof p.id!=='string'||!/^lx-[\w-]{1,80}$/.test(p.id)||seen.has(p.id)||typeof p.name!=='string'||!p.name.trim()||p.name.length>40)throw new Error('Invalid learner profile.');
    seen.add(p.id);
    for(const k of ['stars','steps','turn','lap','position','unit'])if(!Number.isInteger(p[k])||p[k]<0||p[k]>1e9)throw new Error('Invalid progress values.');
    if(p.position>29||p.unit<1||p.unit>5||p.lap<1||!Array.isArray(p.events)||p.events.length>200000||!p.records||typeof p.records!=='object'||!Array.isArray(p.badges))throw new Error('Invalid profile data.');
    const safe={...newProfile(p.id,p.name,['hiker','fox','bird','bear'].includes(p.avatar)?p.avatar:'hiker'),unit:p.unit,position:p.position,lap:p.lap,stars:p.stars,steps:p.steps,turn:p.turn,badges:p.badges.filter(x=>['summit','first-six'].includes(x))};
    for(const [id,r] of Object.entries(p.records)){
      if(!allowed.has(id))throw new Error('Backup uses another vocabulary pack.');
      if(typeof r.taught!=='boolean'||!r.independent||!Array.isArray(r.qualified)||!Array.isArray(r.recallDays))throw new Error('Invalid learning record.');
      for(const k of ['recognition','recall','context'])if(!Number.isInteger(r.independent[k])||r.independent[k]<0||r.independent[k]>1e7)throw new Error('Invalid skill record.');
      for(const k of ['attempts','assisted','errors','support','lastTurn','lastAt','dueAt'])if(!Number.isFinite(r[k])||r[k]< (k==='lastTurn'?-100:0))throw new Error('Invalid learning schedule.');
      if(r.qualified.some(x=>typeof x!=='string')||r.recallDays.some(x=>typeof x!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(x)))throw new Error('Invalid practice history.');
      safe.records[id]={taught:r.taught,independent:{...r.independent},qualified:[...r.qualified],recallDays:[...r.recallDays],attempts:r.attempts,assisted:r.assisted,errors:r.errors,support:r.support,lastTurn:r.lastTurn,lastAt:r.lastAt,dueAt:r.dueAt};
    }
    for(const e of p.events){
      if(!['study','answer'].includes(e.type)||!allowed.has(e.wordId)||!Number.isFinite(e.at)||typeof e.id!=='string')throw new Error('Invalid event history.');
      if(e.type==='answer'&&(!['recognition','recall','context'].includes(e.stage)||typeof e.correct!=='boolean'||!Array.isArray(e.assistance)||e.assistance.some(a=>typeof a!=='string')||!Number.isFinite(e.activeMs)||e.activeMs<0||typeof e.answer!=='string'))throw new Error('Invalid answer history.');
      safe.events.push(JSON.parse(JSON.stringify(e)));
    }
    profiles.push(safe);
  }
  return {format:'lexitrek-backup',version:1,profiles,activeId:seen.has(data.activeId)?data.activeId:profiles[0].id,settings:{phase:data.settings.phase,reducedMotion:!!data.settings.reducedMotion,translation:!!data.settings.translation}};
}
