#!/bin/sh
# Builds the public (Vercel) version: same game, dev timeline removed.
set -e
rm -rf public && mkdir -p public
cp -r img snd public/
sed 's|const DEV_ON=true;|const DEV_ON=false;|' index.html > public/index.html
grep -q 'const DEV_ON=false;' public/index.html
