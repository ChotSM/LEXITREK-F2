# Treasure Voyage + Multimodal Clue Cards (development)

## What changed
- Replaced mountain trail graphic with responsive inline-SVG ocean treasure map. Checkpoint progression uses existing `position` and `lap` values; scoring and spacing unchanged.
- Changed navigation, missions, coins, and progress language into voyage vocabulary. Existing persistent star values are displayed as coins; no progress migration.
- Replaced human/animal avatar picker with treasure-item emblems. Previous avatar IDs continue to display.
- Discovery cards include illustrated lexical clue (existing word emoji, or optional local image), audio pronunciation, definition and example. Translation is optional and collapsed by default.
- During independent recognition/recall, the illustration is hidden to avoid revealing the answer. It returns on feedback, consistent with retrieval practice.
- Minimalist task dialog keeps clue and answer controls prominent. Offline cache version bumped and new visual module pre-cached.

## Adding image illustrations later
Each word can optionally include `image: "media/<safe-filename>.svg"` and `imageAlt: "..."` in `dist/content.json`. Only local SVG, PNG or WebP paths under `media/` are accepted. Add approved image files to `dist/media/` and run `node prepare_assets.mjs` to regenerate the offline asset list. Existing emoji are the fallback.

## Research guardrails
40 existing vocabulary cards remain provisional. No EVP/DSKP verification claims are implied by the visual redesign. Neither the independent scoring rules nor the retrieval schedule were altered. Trial learners should test usability, image accuracy, audio availability and focus on the vocabulary task before publication.

- A short success-only treasure chest animation provides visual feedback. Incorrect answers retain non-reward feedback; points continue to come only from the learning engine.
