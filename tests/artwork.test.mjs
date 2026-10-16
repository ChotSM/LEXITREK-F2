import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {renderClueVisual,hasClueScene} from '../dist/treasure-visuals.js';
const pack=JSON.parse(fs.readFileSync(new URL('../dist/content.json',import.meta.url)));

test('every vocabulary word has its own local artwork and a scene description',()=>{
  const paths=new Set();
  for(const w of pack.words){
    assert.ok(hasClueScene(w),w.word);
    assert.match(w.image,/^media\/u[1-5]-[1-8]\.webp$/);
    assert.ok(w.imageAlt.length>30,w.word);
    assert.ok(!paths.has(w.image),'Each word needs a distinct cue');paths.add(w.image);
    const bytes=fs.readFileSync(new URL('../dist/'+w.image,import.meta.url));
    assert.equal(bytes.subarray(0,4).toString(),'RIFF');
    assert.equal(bytes.subarray(8,12).toString(),'WEBP');
    assert.ok(bytes.length>8000&&bytes.length<180000,`${w.word}: artwork should be detailed and mobile-sized`);
    const html=renderClueVisual(w);
    assert.match(html,/<img class="vocabulary-art"/);
    assert.doesNotMatch(html,/clue-scene|clue-emoji/);
    assert.match(html,/width="768" height="512"/);
  }
  assert.equal(paths.size,40);
});

test('meaning cues use escaped accessible descriptions',()=>{
  const html=renderClueVisual({word:'draw',image:'media/u1-2.webp',imageAlt:'A student making a "tree" picture & using a pencil.'});
  assert.match(html,/&quot;tree&quot;/);assert.match(html,/&amp;/);
  assert.equal(hasClueScene({image:'media/../secret.webp'}),false);
});
