import test from 'node:test';
import assert from 'node:assert/strict';
import {renderTreasureMap,renderClueVisual} from '../dist/treasure-visuals.js';
test('map offers meaningful destinations without altering points',()=>{const map=renderTreasureMap(10,2);assert.match(map,/Treasure hunt voyage/);assert.match(map,/checkpoint 10 of 30/i);assert.match(map,/treasure chest/i);assert.match(map,/Voyage 2/i);});
test('map constrains out-of-range position',()=>{assert.match(renderTreasureMap(100,1),/checkpoint 30 of 30/i);});
test('image fallback draws meaningful word emoji',()=>{const card=renderClueVisual({word:'cook',emoji:'🍳'});assert.match(card,/🍳/);assert.match(card,/Visual clue/);});
test('only local named image paths are accepted',()=>{const card=renderClueVisual({word:'cook',image:'https://example.com/leak.png',emoji:'🍳'});assert.doesNotMatch(card,/example.com/);assert.match(card,/🍳/);});
