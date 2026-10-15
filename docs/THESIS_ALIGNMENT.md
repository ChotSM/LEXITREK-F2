# LexiTrek thesis aligned design specification

Prepared 13 October 2026

LexiTrek is proposed as a researcher-developed digital gamified vocabulary intervention for Malaysian Form One ESL learners, using selected vocabulary from Pulse 2. Its core instructional target is A2 Mid Revised. The broader A2-B1 lower-secondary range guides possible extension tasks without expanding the thesis population or implying that every target word has an A2 classification. The study compares the complete instructional package with a specified conventional vocabulary condition, using a pre-test, an immediate post-test, and a delayed post-test. This specification connects the proposed app design with Chapters 1 and 2 and the current introduction to Chapter 3. It preserves online and offline access and adaptive support while keeping acquisition and retention as the study's measured outcomes.

This is a proposed implementation specification. It does not establish that the current app already implements these requirements. Chapter 3 remains provisional. Participant numbers, target-word count, intervention duration, lesson schedule, retention interval, scoring decisions, and analysis must be finalised before the study version is frozen. No thesis chapter has been edited.

## 1 Research boundaries

| Requirement | Chapter basis | Design consequence |
|---|---|---|
| Malaysian Form One ESL learners | Chapter 1 Sections 1.4 and 1.7.2; Chapter 3 Section 3.0 | Use age-appropriate, accessible instructions and curriculum-aligned content. Do not assume uniformly low proficiency. |
| Selected taught vocabulary | Chapter 1 Sections 1.6 and 1.7.2 | Use a defined target list, word senses, and content version. Findings concern those targets. |
| LexiTrek versus conventional instruction | Chapter 1 Sections 1.4 and 1.5.6; Chapter 3 Section 3.0 | Evaluate a complete package. Do not claim an isolated effect of badges, adaptation, or multimedia. |
| Immediate acquisition | Chapter 1 Sections 1.4 and 1.6 | Use a common independent immediate post-test, interpreted against baseline. |
| Delayed retention | Chapter 1 Sections 1.4 and 1.6; Chapter 2 Section 2.6.2 | Use a common delayed test after an explicit interval, documenting intervening exposure. |
| Motivation is explanatory, not a measured outcome | Chapter 1 Section 1.5.4; Chapter 2 Sections 2.3.4 and 2.7 | Provide supportive game mechanics without claiming increased motivation or tested mediation. |

## 2 Theory to feature alignment

| Perspective | Proposed implementation | Evidence of implementation |
|---|---|---|
| Retrieval practice | Present a cue; allow a response; reveal correction afterwards. Include both recognition and cued recall. | Task format, lexical access direction, first attempt, assistance, feedback, and subsequent independent attempts. |
| Spacing | Revisit the same target after intervening tasks and across planned sessions during treatment. | Actual timestamps and gaps between encounters, not just the number of sessions or laps. |
| Cognitive Theory of Multimedia Learning | Place relevant word information and imagery together; keep explanations concise; offer recorded pronunciation; reduce competing effects. | Content audit, support state, media timing, and successful offline availability. These do not directly measure cognitive processing. |
| Self-Determination Theory | Offer bounded choice, achievable challenge, informative feedback, and supportive teacher or peer interaction. | A design rationale and implementation record. Points and play time are not measures of psychological need satisfaction. |

Scaffolding and adaptation implement achievable retrieval and progressive challenge. Offline delivery supports equitable access and consistent implementation. Neither needs to become an additional dependent variable or separately tested theory in this study.

## 3 Vocabulary content

Create a fixed research pack using selected Pulse 2 vocabulary relevant to the Form One syllabus and the participating classes' teaching plan. The 2017 Form One DSKP identifies Pulse 2 Units 1-5 as the Form One textbook scope and A2 Mid Revised as the curriculum target. The retrieved document is a reproduction hosted on StudyLib; confirm the edition and applicable school Scheme of Work before finalising textbook page references. Record the selection criteria and teacher or expert review. Each entry should contain:

- A stable word and sense identifier, written form, part of speech, and intended meaning.
- A concise English definition; optional approved first-language support where suitable.
- Recorded pronunciation and a relevant illustration or contextual scene where useful.
- At least two reviewed contexts for practice, with familiar surrounding language.
- An isolated meaning task, recognition task, and cued recall task.
- Accepted responses, distractor rationales, staged hints, and explanatory feedback.
- Curriculum topic, textbook edition, unit, page, syllabus reference, content version, difficulty justification, and media attribution.

Tiers should reflect documented lexical and task demands. Board altitude must not be used as evidence that a learner has acquired a word. Adapt support and practice within the common target list; do not silently replace struggling learners' targets with an easier set.

### Pulse 2 curriculum mapping

| Form One unit | Vocabulary domains | Proposed pack organisation |
|---|---|---|
| 1 | Leisure activities and abilities | Familiar activities and skills |
| 2 | Literature and professions | Reading and people at work |
| 3 | Weather and natural disasters | Weather and safety |
| 4 | Geography, landscape, and animals | Places and wildlife |
| 5 | Science and classroom science | Science and discovery |

These domains follow the Form One syllabus scope, not a completed extraction of the user's textbook. The supplied cover screenshot identifies Pulse 2 Student's Book by Michele Crawford, but does not establish an ISBN or edition date. The target subset, page citations, and edition remain to be verified. The other supplied screenshot is headed KSSM Bahasa Inggeris Tingkatan 2 and identifies Units 6-9 as the Form Two vocabulary scope. Do not include these later units in the Form One research pack solely because they appear in the same book; use additional material only if it is explicitly selected and justified in the protocol. Later app packs can support other lower-secondary users. The overview screenshot omits a description of Unit 8; it should not be treated as a complete contents page.

Select a manageable subset of lexical items and senses according to the final intervention timetable. Include multiword items when appropriate, rather than restricting vocabulary to single words. Review curricular importance, prior familiarity in pilot learners, clarity of meaning, contextual usefulness, and feasibility of assessment. Keep both groups' target list fixed during formal collection. Baseline knowledge should be handled through the planned measurement and analysis rather than silently changing individuals' research targets.

The curriculum target is not a guarantee that every word in the textbook is A2 or that every learner begins at A2. Where a lexical CEFR label is needed, use sense-specific evidence such as the English Vocabulary Profile and record its source; otherwise use 'level not verified'. Do not infer B1 proficiency from success on an app extension task.

### Vocabulary source hierarchy

1. Use the selected Pulse 2 edition and applicable Form One syllabus or Scheme of Work to establish curriculum relevance, unit, intended sense, and classroom coverage.
2. Use the supplied Cambridge KET/KET for Schools Vocabulary List as a supplementary A2-oriented reference. Its cover and introduction identify it as the 2012 UCLES version, not a newly verified current list.
3. Where needed, consult a sense-specific lexical reference before assigning an individual CEFR label. The supplied syllabus screenshot recommends the English Vocabulary Profile, but no current entry-level EVP checks have yet been performed.

The Cambridge introduction describes receptive and productive vocabulary and says its list is not exhaustive. Presence in it supports an A2-oriented selection rationale; it does not establish that an individual item is exclusively A2, that every sense is covered, or that the learner knows it. Absence does not automatically establish that a Pulse 2 item is B1 or unsuitable. Keep curriculum relevance, reference-list coverage, and learner performance as separate fields.

For the research word bank, record Cambridge coverage as 'listed with matching sense', 'listed but sense uncertain', or 'not found in supplied 2012 list'. Maintain the edition/year in this field. Do not remove an important textbook item solely because a secondary list omits it. Inclusion in the final research subset requires curriculum justification, teacher review, task feasibility, and pilot evidence.

### Support and challenge within the selected vocabulary

| Pathway | Design | Research boundary |
|---|---|---|
| Additional support | Short clues, relevant images, optional approved translation, audio, word banks, and worked examples. | Same selected targets; record assistance. |
| Core A2-oriented practice | Familiar contexts, concise instructions, recognition and progressively independent recall. | Main Form One intervention pathway. |
| Extension toward B1 | Less support and more demanding contextual interpretation or explanation using the same targets. | Task classification is provisional. Include in the study only if described before the intervention is frozen. |

Increasing challenge should first change cues and response demands, rather than introduce an unrelated harder word list. Core instruction and outcome assessment remain accessible to the intended Form One cohort. Document any sentence-production rubric separately from the primary form-meaning assessment.

The DSKP also cautions against treating perfect spelling of every listed word as the A2 expectation. Establish accepted spelling variants and treatment of recognisable minor errors according to the assessed construct. A spelling activity may score spelling explicitly; a form-meaning measure should not silently become a spelling-only measure. Pilot and apply the same outcome scoring rules to both groups.

For the app, write original definitions, feedback, and contexts around the selected vocabulary. Use original or appropriately licensed media. The book supplies curriculum alignment; the app does not need to reproduce entire textbook exercises or pages in its downloadable packs.

## 4 Learning cycle

1. Introduce the word with its form, meaning, pronunciation, and useful context.
2. Practise recognition with suitable support.
3. Ask for retrieval with reduced cues, including isolated meaning or form recall.
4. Provide feedback after an attempted response.
5. Reteach the specific difficulty and offer supported practice when needed.
6. Revisit the word after other items and in later treatment sessions.
7. Present a different context to check flexible access to the taught meaning.

Example using the provisional word *market*:

| Activity | Example | Interpretation |
|---|---|---|
| Teaching | Display market, definition, pronunciation, and a clear scene. | Initial presentation; not a mastery test. |
| Recognition | Choose the word matching a buying-and-selling clue. | Supported form-meaning recognition. |
| Isolated form recall | Supply the English word for the definition, without choices. | Cued productive form recall. |
| Meaning recall | Explain the meaning of the supplied English word. | Receptive meaning recall. |
| Contextual recall | Complete a new sentence without a word bank. | Context-cued form recall, subject to item design. |
| Sentence creation | Use market in a new sentence. | Contextual use; requires an appropriate rubric or teacher review. |

Recognition and recall describe response demands. Receptive and productive describe the direction of lexical access. Typed recall is not automatically spontaneous communicative competence.

## 5 Adaptive scaffolding

Maintain records for each learner, word sense, and assessed skill. Keep recognition, meaning recall, form recall, spelling, and contextual use distinguishable. A correct sentence task must not automatically establish pronunciation knowledge.

Use the following initial rules only as proposals to pilot:

| Evidence | Proposed response |
|---|---|
| New target or insufficient evidence | Provide a teaching encounter and accessible first task. |
| First error | Give concise correction and a meaning-focused cue. |
| Repeated difficulty | Reteach using a clearer definition, example, approved translation, or worked response. |
| Success with assistance | Record supported success; arrange a later independent attempt. |
| Independent recognition on two distinct items | Offer recall with fewer cues. |
| Independent recall on two separate sessions | Offer a new-context task and consider a longer review gap. |
| Later forgetting | Restore suitable support and shorten the next interval. |
| Learner requests help | Provide it immediately. |

One correct multiple-choice answer is insufficient to establish secure knowledge. Repeating the word immediately after its revelation is practice, not independent recall. Response time must not be the sole trigger for lowering difficulty; reading, typing, interruptions, and accessibility can affect it.

Essential explanations, examples, and supported practice must remain free. Torches can represent optional assistance, but a learner must not lose access to necessary teaching when stars or torches run out. Fade cues gradually rather than removing all support at once.

Before formal data collection, specify the rules, thresholds, learner overrides, and teacher overrides in Chapter 3 or an intervention appendix. Use the same algorithm version for all intervention learners, while documenting individual pathways.

## 6 Teaching cues and retrieval cues

Use illustrations freely when introducing and explaining vocabulary. During independent retrieval, withhold media that reveal the requested answer. Show those media after the attempt or on request, and mark the resulting response as assisted.

Media decisions depend on the skill being assessed. Audio pronunciation that supplies the target word may support meaning learning but cannot accompany an independent word-form recall check without changing its demand. A picture that defines an object may likewise make a meaning-recall task strongly supported.

This requirement follows the caution in Chapter 2 Section 2.4.2 about answer-revealing images during retrieval. Multimedia should clarify learning without making every retrieval task answer inspection.

## 7 Game mechanics

Retain the mountain, climber, stars, badges, camps, vines, and weather as the app's identity. Tie progress to completing purposeful vocabulary activities. Keep a separate learning record; reaching the summit does not establish vocabulary mastery.

- Award points for independent retrieval, completing review, and constructive revision.
- Treat correction positively; avoid punitive penalties that repeatedly trap struggling learners.
- Keep timers optional for practice and avoid speed-based difficulty decisions.
- Explain what badges represent. A completion badge and an independently demonstrated skill are different.
- Ensure required content coverage is not determined by dice outcomes. A short lucky route must not omit target words.
- Limit decorative effects while a learner is reading, answering, or interpreting feedback.
- Preserve structured vocabulary practice as the core activity, consistent with the thesis description of a digital gamified vocabulary intervention.

Complex branching stories, speech scoring, and unrestricted generated content are future extensions unless they are included, validated, and documented before the study.

## 8 Study phases and ongoing use

| Phase | Target-word teaching and review | Research assessment |
|---|---|---|
| Orientation | Practise controls with non-target examples before baseline if possible. | No scored teaching of research targets. |
| Baseline | No app feedback or reteaching of target items during the common pre-test. | Same standardised pre-test procedures for both groups. |
| Intervention | Adaptive support and spaced target review within the agreed timetable. | Gameplay logs document implementation. |
| Immediate assessment | No practice, hints, rewards, or corrective feedback during the outcome test. | Common immediate test under comparable conditions. |
| Retention interval | Pause planned target-word review and notifications for the research cohort. Other ordinary learning can continue as specified. | Record incidental exposure and deviations; do not claim all exposure was prevented. |
| Delayed assessment | No app scaffolds during the common test. | Common delayed test after the finalised interval. |
| After delayed assessment | Restore the target pack and continued review. | Share learning feedback under the agreed protocol. |

Ongoing learning mode can provide continued scheduled review. Research mode should pause the experimental target pack between the immediate and delayed tests if the intended claim is retention without planned target reteaching. Continued review during that interval would require a different protocol and interpretation.

Apply phase restrictions to downloaded packs too. A server-only lock is insufficient for offline use. Local restrictions reduce planned access but cannot prevent every exposure or device-clock change; document limitations and protocol deviations. Avoid erasing saved records when access is paused.

## 9 Comparison condition

Define conventional instruction positively and in enough detail to replicate. It can include explicit meaning instruction, printed activities, retrieval, correction, and contextual examples. Do not artificially restrict it to copying solely to create a weak comparator.

Align the groups on the selected words and senses, intended knowledge, allocated instructional time, assessment procedures, and permitted extra practice. Standardise or document teacher support, attendance, materials, homework, and technical familiarisation. Classroom organisation can differ where it constitutes the treatment.

Actual exposure counts may differ because adaptation is part of LexiTrek. Log those counts and interpret results as effects of the complete implemented package. Do not claim that equal allocated time guarantees equal cognitive processing or practice dosage.

## 10 Assessment and logging

Create an outcome-test blueprint before finalising task design. Its primary emphasis should match Chapter 1's form-meaning focus. Recognition, meaning recall, and form recall are candidate components; which are included, their weighting, accepted answers, spelling rules, and scoring remain to be finalised.

Use common outcome tests independent of game scores. Paper tests or a neutral digital interface can be selected in the protocol. Both groups should face comparable presentation and scoring. Parallel forms require review and piloting for difficulty and construct comparability; merely changing order is insufficient.

Free sentence production may be useful practice, but claims about improved contextual use require a matching assessment and rubric. Do not infer speaking, listening, fluency, or overall English improvement from form-meaning tests alone.

Implementation logs should include pseudonymous learner ID, class/session, event ID, app and content version, word sense, task demand and lexical access direction, item/context, timestamps, first response, correctness, assistance, retries, feedback, active task duration, scheduled review, and actual next encounter. Keep names and consent records separately under the research plan.

Display denominators in reports. Show 'Not yet assessed' for a skill with no valid attempts. Keep assisted and unassisted results separate, and exclude idle or hidden-tab periods from active time where feasible. Logs can document fidelity; they do not independently establish motivation, engagement, or the cognitive mechanisms.

A higher delayed group score answers the delayed-performance question. It does not, by itself, establish a slower forgetting rate. If change from immediate to delayed scores is analysed, label it separately and specify the analysis in Chapter 3. Account for intact-class allocation; one class per condition leaves class and treatment closely linked.

## 11 Online and offline delivery

Implement a prepared offline app with downloadable vocabulary packs containing all required text, tasks, images, feedback, and recorded audio. Run adaptation, scoring, review scheduling, and progress saving locally. Online connectivity should primarily support pack preparation, updates, and optional permitted synchronisation, rather than richer teaching available only to connected learners.

Recommended implementation components are an app shell, web app manifest, service worker, versioned content files, and a local structured database. Use paths and service-worker scope appropriate to the existing GitHub project. A first uncached visit needs access to the app; learners without initial connectivity need school preinstallation or another distribution route.

Confirm download completeness before displaying 'Ready for offline learning'. Preserve progress during upgrades. Provide export and restore, separate learner profiles on shared devices, duplicate-safe synchronisation if used, and clear handling of incomplete downloads or storage failures.

Test on the intended low-cost phones and school devices. Record technical disruptions because they can reduce actual intervention exposure.

## 12 Chapter 3 decisions still required

- Setting, number of classes and learners, selection, allocation, permissions, consent, and assent.
- Selected Pulse 2 vocabulary and senses, exact edition, units and pages, Form One syllabus basis, A2 Mid Revised instructional target, selection criteria, and expert review.
- Intervention duration, session frequency and length, actual spacing plan, and review opportunities.
- Adaptive rules and support sequence, content coverage, reward rules, and permitted overrides.
- Detailed comparison lessons and procedures for matching allocated time and target content.
- Immediate-test timing, delayed interval, target review pause, and monitoring intervening exposure.
- Test blueprint, forms, scoring, validity and reliability procedures, and pilot revisions.
- Teacher preparation, technical orientation, attendance, fidelity, and handling disruptions.
- Baseline-adjusted analysis, class structure, missing data, attrition, effect sizes, and uncertainty.
- Pseudonymous data structure, access, retention, export, and deletion procedures.

These items are not established by the current Chapter 3 introduction. Finalise them before freezing the intervention version.

## 13 Acceptance criteria for the GitHub build

1. All selected targets receive the planned core encounters, regardless of dice movement.
2. An independent recall task does not display its answer or answer-revealing media before the attempt.
3. Support remains available when game currency is exhausted.
4. Assisted success is stored separately from independent success.
5. A target returns across planned treatment sessions, with actual encounter times recorded.
6. Prepared content, audio, adaptation, and progress saving work after closing and reopening in airplane mode.
7. The retention-phase pause applies online and offline without removing records.
8. Outcome assessments provide no instructional feedback until the agreed study point.
9. Updates preserve progress and identify the app, algorithm, and pack versions used.
10. Unassessed skills do not display as zero accuracy; idle time does not inflate active practice measures.
11. Shared-device profiles remain separate, and export/restore preserves the intended records.
12. Changes after the pilot are documented; material changes during formal collection require an explicit research decision.

## Source alignment

- Chapter 1: Sections 1.4, 1.5.1-1.5.6, 1.6, and 1.7.2 establish questions, theories, constructs, and scope.
- Chapter 2: Sections 2.2, 2.3, 2.4.2, 2.5.2, 2.6.2, and 2.7 develop task distinctions, theory, multimedia cautions, and limits of retention claims.
- Chapter 3: Section 3.0 currently establishes a quantitative nonequivalent comparison-group design using intact classes, three assessments, comparable conditions, and planned attention to validity, reliability, ethics, and intervening exposure.
- Kementerian Pendidikan Malaysia (2017), Form One English DSKP, reproduced at https://studylib.net/doc/26070759/dskp-kssm-tingkatan-1-bahasa-inggeris-cefr-v2--1---2- : curriculum target, syllabus vocabulary scope, task support, and spelling expectations. This is a historical curriculum document; confirm the participating school's applicable version and Scheme of Work. The exact Pulse 2 textbook edition has not yet been supplied.
- User-supplied screenshot at 7.17.46 PM: Pulse 2 Student's Book cover and an overview of topics; not a full textbook word list or bibliographic edition record.
- User-supplied screenshot at 7.14.48 PM: Form Two DSKP vocabulary section; Units 6-9, supplementary vocabulary references, and spelling expectations. It is not a Form One page.
- UCLES (2012), KET and KET for Schools Vocabulary List, supplied as 22105-ket-vocabulary-list.pdf: supplementary A2-oriented reference; introduction on printed pages 2-3 and topical appendix on printed pages 22-29. It is not the Pulse 2 vocabulary list.

The specification derives its pedagogical rationale from the supplied chapters. Numerical adaptation thresholds are proposals for pilot validation. It is not a new independent literature review or a source-code audit.
