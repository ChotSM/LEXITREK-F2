// Optional real-browser integration check. Install Playwright and Chromium first.
// Run: node tests/browser-smoke.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright':'playwright');
const dist=new URL('../dist/',import.meta.url).pathname;
const pack=JSON.parse(await fs.readFile(path.join(dist,'content.json')));
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.mp3':'audio/mpeg','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json'};
const server=http.createServer(async(req,res)=>{
  try{
    const relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/LEXITREK-F2\//,'');
    const file=path.resolve(dist,relative||'index.html');
    if(!file.startsWith(dist))throw new Error('Invalid path');
    const data=await fs.readFile(file);res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream'});res.end(data);
  }catch{res.writeHead(404);res.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}/LEXITREK-F2/`;
const output=new URL('../browser-results/',import.meta.url).pathname;
await fs.mkdir(output,{recursive:true});
let browser;
try{
  browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  const saved=async()=>{await page.waitForFunction(()=>document.querySelector('#save-status').textContent==='Saved on this device');};
  const readState=()=>page.evaluate(()=>new Promise((resolve,reject)=>{
    const open=indexedDB.open('lexitrek-local-v1',1);
    open.onsuccess=()=>{const db=open.result;const r=db.transaction('state').objectStore('state').get('main');r.onsuccess=()=>{db.close();resolve(r.result);};r.onerror=()=>reject(r.error);};open.onerror=()=>reject(open.error);
  }));
  await page.goto(base);await page.locator('#start-learning').waitFor();
  await page.locator('#start-learning').click();
  await page.locator('#task-dialog .clue-scene').waitFor();
  await page.screenshot({path:path.join(output,'desktop-discovery.png')});
  // Six clues, including a wrong answer and a supported retry. Use the pack's
  // visible clue to identify targets; never inject app task state.
  for(let step=0;step<6;step++){
    assert.match(await page.locator('.clue-progress strong').innerText(),new RegExp(`Clue ${step+1} of 6`));
    let word;
    if(await page.locator('#after-study').count()){
      const text=await page.locator('#task-title').innerText();word=pack.words.find(w=>w.word===text);
      await page.locator('#after-study').click();
    }else{
      const definition=await page.locator('#task-dialog .definition').innerText();
      word=pack.words.find(w=>w.meaning===definition);
    }
    assert.ok(word,`target at step ${step}`);
    if(step===1){assert.equal(await page.locator('#task-title').innerText(),'Name the scene');await page.screenshot({path:path.join(output,'desktop-picture.png')});}
    if(step===2){
      assert.equal(await page.locator('#task-title').innerText(),'Listen and find the word');
      assert.ok(await page.locator('[data-answer]').first().isDisabled());
      await page.locator('#listen-prompt').click();
      await page.waitForFunction(()=>document.querySelector('#listen-prompt').textContent.includes('Listen again'));
      const wrong=page.locator('[data-answer]').filter({hasText:/^sing$/});
      await wrong.click();await page.locator('.feedback.error').waitFor();
      await page.locator('#retry-word').click();
      await page.locator(`[data-answer="${word.word}"]`).click();
    }else if(await page.locator('[data-answer]').count()){
      await page.locator(`[data-answer="${word.word}"]`).click();
    }else{
      await page.locator(`[data-pick="${word.word}"]`).click();
      assert.equal(await page.locator('#matching-zone').evaluate(el=>el===document.activeElement),true);
      await page.locator('#matching-zone').click();
    }
    await page.locator('.feedback').waitFor();
    // No map visit between clues. The final action opens the summary.
    await page.locator('#next-word').click();
  }
  assert.equal(await page.locator('#task-title').innerText(),'Six clues explored!');
  assert.deepEqual(await page.locator('.summary-stats strong').allTextContents(),['6','6','+50']);
  await page.screenshot({path:path.join(output,'desktop-summary.png')});
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:path.join(output,'mobile-summary.png')});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await saved();
  let state=await readState(),p=state.profiles[0];
  assert.equal(p.steps,6);assert.equal(p.events.filter(e=>e.type==='answer').length,7);
  assert.equal(p.stars,50);
  assert.equal(p.records['u1-2'].independent.recognition,1);
  assert.equal(p.records['u1-3'].independent.recognition,0);
  assert.ok(p.badges.includes('first-six'));
  await page.locator('#next-island').click();
  assert.match(await page.locator('#task-dialog .word-meta').innerText(),/UNIT 2/);
  assert.equal(await page.locator('#task-title').innerText(),'writer');
  await page.screenshot({path:path.join(output,'mobile-writer.png')});
  await page.locator('#close-task').click();
  await page.locator('[data-unit="3"]').click();
  await page.locator('#start-learning').click();
  assert.match(await page.locator('#task-dialog .word-meta').innerText(),/UNIT 3/);
  await page.screenshot({path:path.join(output,'mobile-weather.png')});
  await page.locator('#close-task').click();await saved();
  await page.reload();await page.locator('#start-learning').waitFor();
  state=await readState();assert.equal(state.profiles[0].stars,50);assert.equal(state.profiles[0].unit,3);
  // An explicit global review is labelled with its source unit.
  await page.getByRole('button',{name:'Voyage progress',exact:true}).click();
  await page.locator('#review-due').click();
  assert.match(await page.locator('.review-transition').innerText(),/Review from Unit 1/);
  await page.locator('#close-task').click();
  await page.setViewportSize({width:1280,height:900});
  await page.locator('#teacher-open').click();
  await page.locator('#study-phase').selectOption('retention');
  await page.locator('#save-settings').click();
  await page.getByRole('button',{name:'Treasure map',exact:true}).click();
  assert.ok(await page.locator('#start-learning').isDisabled());
  assert.deepEqual(errors,[]);
  await context.close();
  console.log('Browser session, supported retry, topic switching, saving, mobile layout and study pause passed.');
}finally{
  await browser?.close();await new Promise(resolve=>server.close(resolve));
}
