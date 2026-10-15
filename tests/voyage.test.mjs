import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {newProfile,teach,applyResult,metrics,validateBackup} from '../dist/engine.js';
import {SESSION_LENGTH,missions,sessionChoices,activityFor,activityAssistance,sessionSummary} from '../dist/voyage.js';
const pack=JSON.parse(fs.readFileSync(new URL('../dist/content.json',import.meta.url)));
const now=Date.UTC(2026,9,15);
const answer=(p,w,assistance=[],correct=true)=>applyResult(p,{wordId:w.id,word:w.word,stage:'recognition',variant:0,packVersion:pack.version},correct?w.word:'wrong',assistance,1200,now);

test('switching islands with a due weather word still starts the chosen topic',()=>{
  const p=newProfile('lx-test','Navigator'),windy=pack.words.find(w=>w.word==='windy');
  teach(p,windy.id,now);answer(p,windy,[],false);
  assert.equal(metrics(p,pack.words,now).due,1);
  const normal=sessionChoices(p,pack.words,2,false,now);
  assert.ok(normal.length);assert.ok(normal.every(w=>w.unit===2));
  assert.equal(sessionChoices(p,pack.words,2,true,now)[0].id,windy.id);
});

test('a six-clue mission interleaves words before revisiting the first answer',()=>{
  const p=newProfile('lx-test','Navigator'),ids=[];
  for(let step=0;step<SESSION_LENGTH;step++){
    const w=sessionChoices(p,pack.words,1,false,now)[0];
    ids.push(w.id);teach(p,w.id,now);answer(p,w,activityAssistance(activityFor('recognition',step,true)));
  }
  assert.equal(new Set(ids.slice(0,4)).size,4);
  assert.ok(ids.every(id=>pack.words.find(w=>w.id===id).unit===1));
});

test('new activities do not bypass adaptive recall or context stages',()=>{
  assert.equal(activityFor('recall',2,true),'recall');
  assert.equal(activityFor('context',1,true),'context');
  assert.equal(activityFor('recognition',1,false),'match');
  assert.equal(activityFor('teach',1,true),'picture');
});

test('picture and listening successes earn supported coins without independent evidence',()=>{
  for(const mode of ['picture','listen']){
    const p=newProfile('lx-test','Navigator'),w=pack.words[0];teach(p,w.id,now);
    const e=answer(p,w,activityAssistance(mode));
    assert.equal(e.stars,5);assert.equal(e.independent,false);
    assert.equal(p.records[w.id].independent.recognition,0);
    const restored=validateBackup({format:'lexitrek-backup',version:1,profiles:[p],activeId:p.id,settings:{phase:'learning'}},pack.words.map(w=>w.id));
    assert.deepEqual(restored.profiles[0].events,p.events);
  }
});

test('summary reports actual final answers, coins and unique practised words',()=>{
  const p=newProfile('lx-test','Navigator'),w=pack.words[0];teach(p,w.id,now);
  const events=[answer(p,w),answer(p,w,['worked-answer-retry']),answer(p,w,[],false)];
  assert.deepEqual(sessionSummary(events),{clues:3,correct:2,coins:15,wordIds:[w.id]});
  assert.deepEqual(sessionSummary([]),{clues:0,correct:0,coins:0,wordIds:[]});
  assert.ok(pack.units.every(u=>missions[u.id]?.story&&missions[u.id]?.ending));
});
