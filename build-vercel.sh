#!/bin/sh
# Builds the public (Vercel) version from src/ and stories/: same game, dev timeline removed.
set -e
rm -rf public && mkdir -p public
cp -r img snd fonts manifest.webmanifest public/
node tools/build.mjs --prod --out public
grep -q 'const DEV_ON=false;' public/index.html
