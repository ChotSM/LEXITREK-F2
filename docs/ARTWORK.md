# Vocabulary clue artwork

All 40 vocabulary cards use distinct, detailed photo-style images generated with the built-in image-generation tool. Actions and professions show a person doing the activity; weather scenes distinguish wind, cloud, rain, storm and fog; landscape scenes make the relevant geographical feature prominent. The original geometric figures have been removed. The emoji fallback is only for incomplete custom content, rather than the production pack.

Images are stored in `dist/media/u1-1.webp` through `dist/media/u5-8.webp`. Each file is 768 × 512 pixels. The complete set is approximately 2.7 MB. The full source scene is retained without cropping when optimising images or showing them in the game. A large responsive image panel replaces the small corner thumbnail. Alternative text describes each scene.

`ARTWORK_PROMPTS.json` records the final generation prompt for every asset. These are generated educational meaning cues, not documentary photographs of real people or events. Air and gas are represented by observable effects, such as turning a pinwheel or inflating a balloon, rather than incorrectly depicting an invisible gas as a coloured cloud. Poetry, story genres and abstract scientific vocabulary still benefit from the definition and teacher discussion alongside the image.

The pack keeps the existing word IDs, definitions, examples and independent evidence. Pack version is now 1.1.0-artwork; app/cache version is 1.3.0-artwork. Existing learner records remain compatible. Picture practice continues to be recorded as supported practice.

The resource generator recursively includes the image directory. Offline installation rejects HTML error pages served in place of images. Tests check that all 40 local images are distinct assets with accessible descriptions, valid WebP files and mobile-sized payloads. The browser test decodes every image and checks the 768 × 512 dimensions before exercising the normal session. Desktop and mobile screenshots are captured by CI for visual review.

The full set was reviewed as five topic contact sheets. Classroom testing should check whether pupils identify the intended word from each scene and whether the pictures help later recall.
