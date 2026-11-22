// The wording editor: a small Astro app hosting Keystatic. It only reads and writes the stories' text files
// (stories/<story>/text/<chapter>.json); the game itself stays plain web. Run it from the repo root:
//   npm run admin            local mode: edits the files in this checkout
// Deployed (for example its own protected Vercel project), set PUBLIC_KEYSTATIC_GITHUB=true and the Keystatic
// GitHub app variables: every save then becomes a commit on a branch, reviewed and merged like any change.
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: here,
  srcDir: here + 'src',
  integrations: [react(), keystatic()],
  output: 'server',
  adapter: process.env.VERCEL ? vercel() : undefined,
});
