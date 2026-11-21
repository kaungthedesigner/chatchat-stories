# Source layout

The game is still one classic (non-module) script, so these files are **parts of one page**, not separate
modules. `node tools/build.mjs` (or `npm run build`) joins them in the order listed in `src/parts.json` and
writes `index.html` at the repo root, the page the Claude preview publishes. `build-vercel.sh` builds the
public page the same way with the dev timeline off.

- `src/page/` — the HTML around everything (head, body markup, closing tags)
- `src/boot/` — the two small head scripts (progress hand-off from the link, manifest link)
- `src/ui/` — styles (Monsoon tokens and screens), icons, helpers, the shell around stories (home, chapters, language), Add to Home Screen sheets
- `src/engine/` — state, audio, rain, layout, chat, scenes, time jumps, posts, calls, steps, saves, running the flow, boot
- `src/quests/` — reusable side quests (photo walk, padauk, water street, packing, ticket), script and style
- `stories/before-the-rain-ends/` — the story: art, memories, Burmese text, story-only sequences, ending rule, and `flow/` (prologue, ch1–ch5, ending)

Order matters: a part can use anything defined in an earlier part. After any change, run `npm run build` and
`npm run compare` (six recorded playthroughs, compared with `tools/baseline/`).
