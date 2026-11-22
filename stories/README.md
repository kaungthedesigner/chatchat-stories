# Stories

Each folder here is one story. The engine (src/) never names a story; it plays whatever `story.json` describes.

## story.json

- `id`, `title`, `page` (the page it builds to; the main story is `index.html`), `mins`, `tag`, `tagline`, `cover`
- `chapters`: `{n, t, d, text}` for the Chapters page; `text` is the line-ID prefix of that chapter (`c1` …)
- `text`: the chapter files in `text/`, in order (`text/<name>.json`)
- `slots`: the story's own code, by slot: `art` (ART, SCENE, SPOTS, PACK…), `cast` (C, the people in the chats),
  `memories` (MEM_INFO), `sequences` (story-only step helpers), `endings` (END_NAME, finalCard…), `flow` (the step files)
- `flow`: the step arrays, in play order, that make the story (`["PROLOGUE","CH1",…]`)
- `hidden: true` keeps a story out of every normal build (`npm run build -- --hidden` includes it)

## text/<chapter>.json

`{ chapter, title, lines: [{ id, who, where, en, my, own }] }`. The flow files only hold IDs (`c2.may.14`);
`who` and `where` tell an editor whose line it is and where it shows. `own: true` marks a Burmese line meant
for that one place only. Wording can change freely; adding, removing or reordering lines is a code change
(the checker's `--text-only` rule).

## Adding a story

1. Copy `test-story/` (the smallest working story) to a new folder and change `story.json`.
2. Write the flow files (steps with line IDs) and the text files.
3. Add art and sounds, `npm run build`, `npm run check`, then play it and publish a preview.
