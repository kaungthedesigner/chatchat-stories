# Wording editor (Keystatic)

A small Astro app that shows each story's lines by chapter and lets you change **only the wording**
(English and Burmese). IDs, who and where are kept as they are; adding, removing or reordering lines
isn't offered, and `npm run check -- --text-only <branch>` rejects it anyway.

## On your computer

```sh
npm run admin:install   # once
npm run admin           # then open http://localhost:4321
```

Edits are saved straight into `stories/<story>/text/<chapter>.json` in this checkout. Then:
`npm run build`, `npm run check`, play the preview, commit.

## Online (GitHub mode), when you want it

1. Make a second Vercel project from this repo with **Root Directory** `admin`, and protect it
   (Vercel password or team-only access) so players never see it.
2. Set `PUBLIC_KEYSTATIC_GITHUB=true` and open the deployed `/keystatic`. Keystatic walks you through
   creating its GitHub app and gives the remaining variables (`KEYSTATIC_GITHUB_CLIENT_ID`,
   `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`) to add in Vercel.
3. Each save is then a commit on a `text/…` branch; Vercel builds a preview of the game for it, the
   check runs, and the change goes live when the branch is merged into main.

The text stays plain JSON in the repo, so the game never depends on Keystatic.
