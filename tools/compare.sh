#!/bin/sh
# Records the six reference playthroughs from a page and compares them with tools/baseline.
# Usage: sh tools/compare.sh [page.html]   (default: dist/index.html, else index.html)
P=${1:-dist/index.html}; [ -f "$P" ] || P=index.html
D=$(mktemp -d); echo "page $P -> $D"
run(){ node tools/record.mjs "$P" "$D/$1.log" $2 $3 $4; }
run en_p0_all en 0 all & run en_p1_two en 1 c1_told_kept,c2_friends & run en_p2_none en 2 none &
run my_p0_all my 0 all & run my_p1_two my 1 c1_told_kept,c2_friends & run my_p2_none my 2 none & wait
fail=0
for f in tools/baseline/*.log; do n=$(basename $f); if diff -q "$f" "$D/$n" >/dev/null; then echo "same  $n"; else echo "DIFF  $n"; diff "$f" "$D/$n" | head -20; fail=1; fi; done
grep -h '"errs"' $D/*.meta.json | grep -v '\[\]' && fail=1
exit $fail
