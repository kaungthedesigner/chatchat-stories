// One-time migration (restructure phase 2): gives every story line in the flow files a stable ID,
// writes text/en.json and text/my.json, and replaces the lines in the flow files with their IDs.
// Burmese comes from MY_STORY (keyed by English, per chapter) or from a step's own myTr, exactly as the
// game picked it before. Keys in MY_STORY that no flow line uses (used by other code) become
// <chapter>.extra.<n>. A report lists what was done.
import fs from 'fs';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';

const S = 'stories/before-the-rain-ends/';
const FILES = [['prologue', 0, 'p'], ['ch1', 1, 'c1'], ['ch2', 2, 'c2'], ['ch3', 3, 'c3'], ['ch4', 4, 'c4'], ['ch5', 5, 'c5'], ['ending', 6, 'e']];
const MY = Function(fs.readFileSync(S + 'text/my.js', 'utf8') + ';return MY_STORY')();
const anyKey = new Set(Object.values(MY).flatMap(d => Object.keys(d)));
const MOMENT_KEYS = { scene: v => prop(v, 'art'), notify: v => prop(v, 'c'), open: v => prop(v, 'c'), browse: v => prop(v, 'c'), friend: () => 'may', title: () => 'title',
  post: () => 'post', glance: () => 'glance', call: v => 'call-' + (prop(v, 'c') || ''), profile: () => 'profile', lockEp: () => 'lock', lock: () => 'lock', minpost: () => 'minpost', pphoto: () => 'photo', memshare: () => 'memshare' };
function prop(obj, name) { if (!obj || obj.type !== 'ObjectExpression') return null; const p = obj.properties.find(p => p.key && (p.key.name === name || p.key.value === name)); return p && p.value.type === 'Literal' ? String(p.value.value) : null }
const slug = s => String(s || 'x').replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '') || 'x';

const EN = {}, MYJ = {}, report = { lines: 0, myFromStory: 0, myFromMyTr: 0, noMy: [], extras: 0, myTrRemoved: 0 };
const usedKeys = {}; // ch -> Set(en) used by a line of that chapter's file

for (const [f, ch, pre] of FILES) {
  const file = S + 'flow/' + f + '.js';
  let src = fs.readFileSync(file, 'utf8');
  const ast = acorn.parse(src, { ecmaVersion: 'latest', ranges: true });
  const markers = [];
  walk.simple(ast, { ObjectExpression(n) { const p = n.properties[0]; if (!p || !p.key) return; const k = p.key.name || p.key.value; if (MOMENT_KEYS[k]) markers.push([n.start, slug(MOMENT_KEYS[k](p.value))]) } });
  markers.sort((a, b) => a[0] - b[0]);
  const momentAt = pos => { let m = 'start'; for (const [s, name] of markers) { if (s <= pos) m = name; else break } return m };
  const edits = [], counters = {};
  usedKeys[ch] = usedKeys[ch] || new Set();
  walk.fullAncestor(ast, (n, _st, anc) => {
    if (n.type === 'Property' && n.key && (n.key.name === 'myTr' || n.key.value === 'myTr')) {
      // remove the property together with one comma next to it
      const parent = anc[anc.length - 2]; const i = parent.properties.indexOf(n);
      let a = n.start, b = n.end;
      if (i > 0) { a = parent.properties[i - 1].end } else if (parent.properties.length > 1) { b = parent.properties[i + 1].start }
      edits.push([a, b, '']); report.myTrRemoved++; return;
    }
    if (n.type !== 'Literal' || typeof n.value !== 'string') return;
    const parent = anc[anc.length - 2];
    if (parent && parent.type === 'Property' && parent.key === n) return;
    if (anc.some(a => a.type === 'Property' && a.key && (a.key.name === 'myTr' || a.key.value === 'myTr'))) return;
    // nearest step object carrying a myTr
    let myTr = null;
    for (let i = anc.length - 2; i >= 0; i--) { const a = anc[i]; if (a.type === 'ObjectExpression') { const p = a.properties.find(p => p.key && (p.key.name === 'myTr' || p.key.value === 'myTr')); if (p) { myTr = Function('return (' + src.slice(p.value.start, p.value.end) + ')')(); break } } }
    const en = n.value;
    if (!anyKey.has(en) && !(myTr && myTr[en] !== undefined)) return;
    const m = momentAt(n.start); counters[m] = (counters[m] || 0) + 1;
    const id = `${pre}.${m}.${counters[m]}`;
    EN[id] = en; report.lines++;
    if (myTr && myTr[en] !== undefined) { MYJ[id] = myTr[en]; report.myFromMyTr++; (report.ownIds = report.ownIds || []).push(id) }
    else if (MY[ch] && MY[ch][en] !== undefined) { MYJ[id] = MY[ch][en]; report.myFromStory++; usedKeys[ch].add(en) }
    else report.noMy.push(id + '  ' + en);
    edits.push([n.start, n.end, `'${id}'`]);
  });
  edits.sort((a, b) => b[0] - a[0]);
  for (const [a, b, t] of edits) src = src.slice(0, a) + t + src.slice(b);
  fs.writeFileSync(file, src);
}
// keys no flow line uses: keep them, by ID, so MY_STORY can be rebuilt unchanged
for (const [ch, d] of Object.entries(MY)) {
  const pre = FILES.find(x => x[1] === +ch)[2]; let n = 0;
  for (const [en, my] of Object.entries(d)) { if (usedKeys[ch] && usedKeys[ch].has(en)) continue; const id = `${pre}.extra.${++n}`; EN[id] = en; MYJ[id] = my; report.extras++ }
}
fs.mkdirSync(S + 'text', { recursive: true });
fs.writeFileSync(S + 'text/en.json', JSON.stringify(EN, null, 1) + '\n');
fs.writeFileSync(S + 'text/my.json', JSON.stringify(MYJ, null, 1) + '\n');
// check: MY_STORY rebuilt from the files (first ID wins) equals the original
const CH = { p: 0, c1: 1, c2: 2, c3: 3, c4: 4, c5: 5, e: 6 };
const own = new Set(report.ownIds || []); const R = {}; for (const id in MYJ) { if (own.has(id)) continue; const ch = CH[id.split('.')[0]], en = EN[id]; (R[ch] = R[ch] || {}); if (R[ch][en] === undefined) R[ch][en] = MYJ[id] }
const diffs = [];
for (const ch of Object.keys(MY)) { for (const [en, my] of Object.entries(MY[ch])) if (R[ch][en] !== my) diffs.push(`${ch} ${en} | ${my} | ${R[ch][en]}`); for (const en of Object.keys(R[ch] || {})) if (MY[ch][en] === undefined) diffs.push(`${ch} EXTRA ${en}`) }
report.rebuildDiffs = diffs;
fs.writeFileSync('tools/dev/migrate-ids-report.json', JSON.stringify(report, null, 1));
console.log({ lines: report.lines, myFromStory: report.myFromStory, myFromMyTr: report.myFromMyTr, noMy: report.noMy.length, extras: report.extras, myTrRemoved: report.myTrRemoved, rebuildDiffs: diffs.length });
