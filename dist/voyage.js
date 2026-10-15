// Session presentation is separate from the vocabulary evidence and review engine.
import {candidates} from './engine.js';

export const SESSION_LENGTH = 6;
export const missions = {
  1: {title:'Get the crew ready', story:'Your crew is preparing an island celebration. Discover useful activities to help them.', ending:'The crew has more ideas for the island celebration.'},
  2: {title:'Find the storyteller', story:'The island library needs stories and people with useful skills. Follow the clues to help.', ending:'You have helped the island library on its search.'},
  3: {title:'Read the weather', story:'Your crew is planning its next journey. Learn the weather clues before setting sail.', ending:'Your crew has practised reading the weather clues.'},
  4: {title:'Explore the island', story:'An explorer needs help describing the land and wildlife. Discover words for the journey.', ending:'You have helped the explorer describe the island.'},
  5: {title:'Help the discovery team', story:'The island science team is investigating the world around us. Help them name what they find.', ending:'You have helped the science team explore new ideas.'}
};

export function sessionChoices(profile, words, unit, reviewOnly=false, now=Date.now()) {
  // Normal missions interleave new and due words in the chosen unit. Deliberate
  // all-island review remains available from Voyage progress.
  return candidates(profile, words, unit, reviewOnly, now);
}

export function activityFor(stage, step, hasPicture=false) {
  if (!['teach','recognition'].includes(stage)) return stage;
  const mode=['choice','picture','listen','match','choice','drag'][step % SESSION_LENGTH];
  return mode==='picture'&&!hasPicture?'match':mode;
}

export function activityAssistance(mode) {
  // Word-audio and picture prompts exercise different skills. Keep them out of
  // independent text-meaning evidence while using the existing supported path.
  return mode==='listen'?['listening-practice']:mode==='picture'?['picture-practice']:[];
}

export function sessionSummary(events) {
  return {
    clues:events.length,
    correct:events.filter(e=>e.correct).length,
    coins:events.reduce((n,e)=>n+(e.stars||0),0),
    wordIds:[...new Set(events.map(e=>e.wordId))]
  };
}
