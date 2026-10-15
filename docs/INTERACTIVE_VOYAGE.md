# Interactive voyage: first revision

## Learner experience

- The main map button starts a mission in the selected unit. Due words from other units no longer override that choice. Explicit all-island review remains in Voyage progress, and each review card identifies its source unit.
- Each island has a short mission story. The existing selector interleaves new and due words within that island, including its three-turn spacing preference.
- Next clue advances directly to the next activity. Back to map is separate. A supported retry stays on the same clue, with the worked answer counted as assistance. Closing completed feedback also finalises that map step exactly once.
- Clue X of 6 and a progress bar stay inside the task window. After six completed clues, a summary shows final correct answers, coins and unique words practised, with buttons to stop, continue the island or visit the next topic. An explicit review can finish earlier if no words remain due.
- Recognition activities rotate through text choice, picture choice where a context scene exists, listening, tap matching and drag-or-tap. Recall and context stages still use typed responses and retain their existing eligibility rules.
- Listening starts only when the learner presses Play the word. Replay and Use a text clue instead are available. The alternative also works when sound is unavailable.
- Ten words have original inline SVG context scenes: cook, draw, writer, pilot, engineer, windy, gravity, flood, liquid and gas. Other cards retain the existing emoji or approved local-image fallback. Scenes have accessible descriptions, no external resources and no animation.

## Learning records and research interpretation

The app version is 1.2.0-engagement. The vocabulary pack, word IDs, definitions and examples are unchanged. Existing profiles and backups continue to work.

Picture and word-audio prompts exercise different skills from independent text-meaning recognition. They use the existing supported-practice route (`picture-practice` or `listening-practice` in assistance), earn five coins on success, and do not promote independent recognition evidence. A listening-to-text alternative retains its support marker. Worked retries are also supported. These assisted attempts remain in exports; they are not independent vocabulary-test results.

The summary counts the final answer on each completed clue. Earlier incorrect attempts remain in the practice log. The engine still requires independent evidence across distinct items and days before later stages and secure-for-now status. Paused study phases still disable target teaching and practice.

Session progress is temporary for the current page and profile. Completed answers, coins and map progress persist as before. A reload begins a new six-clue session without deleting learning history.

## Validation

Run `npm test` for learning-engine, unit-selection, activity-evidence, summary, illustration and offline regression checks. Run `node prepare_assets.mjs --cache-only` to regenerate the complete resource list without regenerating icons or installing Sharp.

For browser integration, install Playwright and its Chromium browser, then run `node tests/browser-smoke.mjs`. The test serves the app under `/LEXITREK-F2/`, plays a complete session including an incorrect answer and retry, checks topic transitions and saved progress, captures desktop/mobile screenshots, and confirms the retention pause. CI runs both sets of checks on the proposed branch and pull request.

Ship customisation, spending coins, friend challenges and illustrations for the remaining vocabulary are later additions. Pilot this revision with pupils before deciding which of those features to prioritise.
