# LexiTrek

A vocabulary expedition for Malaysian Form One ESL learners. This first working version contains 40 provisional curriculum-aligned cards, original contexts, Malay support, synthesised pronunciation, adaptive practice, and an offline pack. It is a pilot app, not a validated research instrument.

## Start learning

Open the hosted app, choose a unit, and select **Start exploring**. New words receive an explanation before a recognition task. Ask for support whenever needed. Continue the trail to save a completed step. Learner profiles, practice history, stars, and review schedules remain in this browser's IndexedDB.

The word notebook allows deliberate study. My progress distinguishes independent recognition, word recall, and context practice. Unassessed skills display **Not yet assessed**. Game milestones celebrate participation; they do not establish vocabulary mastery.

## Offline learning

While connected, select **Save for offline**, then **Save complete offline pack**. Only a verified complete resource cache is marked ready. The pack includes every word's MP3 pronunciation; no external speech or AI service is required. After preparation, add the app to the home screen and test reopening it in airplane mode on the intended device.

A first uncached visit requires connectivity. Clearing browser data may remove the app cache and progress. Export a backup in Teacher settings before clearing data or changing devices. Offline storage is browser-specific; the app cannot restore records from another browser without a backup. Updates use versioned caches and preserve IndexedDB records. Moving to another domain, including GitHub Pages, requires exporting and importing progress.

The private hosted version is for the owner's review. A public GitHub Pages deployment can be used for learner distribution once the content and research protocol are ready. No application account is required in the static GitHub version.

## GitHub Pages deployment

The source ZIP includes `dist/`, tests, and `.github/workflows/pages.yml`.

1. Extract the ZIP and upload its contents at the root of your chosen GitHub repository. Keep the `dist` directory intact and include the workflow directory.
2. In repository **Settings → Pages**, choose **GitHub Actions** as the source.
3. Push to `main` or run the Pages workflow manually. It runs the tests and publishes `dist/`.
4. Open the resulting Pages URL and prepare the offline pack. Relative paths and service-worker scope support a project subdirectory such as `/LexiTrexx/`.

For an existing repository, review its current files and Pages configuration before replacing them. The ZIP does not contain the private hosting identity or learner data.

## Local use

No application build or dependency installation is required. Serve `dist/` through HTTP during development, for example `python3 -m http.server 8000 --directory dist`, then open `http://localhost:8000/`. Opening `index.html` directly as a `file:` URL is insufficient for modules and service workers. Production offline installation requires HTTPS.

Run checks with Node 20 or newer: `node --test tests/*.test.mjs`. The test suite covers support versus independence, spaced selection, challenge progression across days, retention pauses, backup validation, CSV safety, and cached offline resources under a project subdirectory.

## Adaptation

- Two independent recognition successes on distinct items permit word recall.
- Independent recall must occur on at least two calendar days before context challenges.
- Supported success does not increment independent evidence.
- Repeated errors restore recognition support and bring the word back for review.
- Duplicate successes on the same item and day do not inflate skill evidence.
- Secure-for-now status requires recall across days and two independent context successes. Review remains scheduled.
- The algorithm's numerical thresholds are pilot choices, not validated estimates of proficiency.

Review prioritises due words and new words while interleaving recent attempts where possible. Unit practice also permits optional early review. Every unit contains eight cards; dice luck cannot skip the target list. Teaching cards and contextual sentences are original. Individual item CEFR levels have not been certified.

## Research controls

Teacher settings can set the study phase for this device. Orientation, baseline, immediate assessment, retention, and delayed assessment pause teaching and practice of the target pack, including the notebook. Use non-target orientation examples and independent standardised outcome tests outside this app. Intervention and ongoing learning permit practice. Restore ongoing access after the delayed assessment using **Study complete**.

These local settings are not researcher authentication and cannot prevent all incidental exposure or clock changes. They are suitable for a supervised pilot. Finalise the protocol, review content, pilot scoring and technical procedures, and freeze the app/content versions before formal collection. CSV exports are implementation logs, not pre-test or post-test scores. No motivation, proficiency, or reduced-forgetting claim is inferred from the logs.

## Content editing

Edit `dist/content.json` to revise definitions, translation, or contexts while preserving stable word/sense IDs. Each card has a unit, part of speech, two sentence gaps, an example, support translation, an audio path, and a provisional source note. Map the final selected targets to the actual textbook edition, units, and pages. Unit 2 covers both literature and professions; multiword vocabulary is supported.

If adding/removing files, regenerate `dist/sw.js` with `prepare_assets.mjs` after installing the optional `sharp` package. Bump the version in `dist/engine.js`, the pack, and the cache generator for a new release. Existing MP3 files are ready to use. `make_content.py` optionally regenerates the pilot content and voice files using installed Flite and FFmpeg libraries; it is not required to deploy or play.

## Privacy and recovery

Use learner codes or nicknames. The static app sends no learner progress to a server and includes no analytics tracker. It requests only its own static resources. Hosting providers still handle normal website requests. Backups contain the device's profiles and history; manage these according to the approved research procedures. Restore validates a backup before asking to replace profiles. Formula-looking values are neutralised in CSV exports. Corrupt saved data is preserved for recovery rather than silently discarded.

## Validation status

Automated learning-engine and service-worker integration tests pass. The service-worker tests simulate network loss and verify full cached HTML, JavaScript, content, and audio. They do not establish compatibility with every actual phone, browser, or private-hosting gateway. Browser visual QA and physical-device airplane-mode testing remain required before classroom deployment.

Pronunciation is synthesised English using Flite's SLT voice. Review pronunciation and Malay support with teachers; recordings can be replaced with reviewed audio. The current word list is provisional and is not a complete reproduction of Pulse 2 or the Cambridge vocabulary list.

See `docs/THESIS_ALIGNMENT.md` for the design rationale and pending methodology decisions.
