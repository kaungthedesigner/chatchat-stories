// One-time (restructure phase 4/5): turns text/en.json + text/my.json into one file per chapter,
// text/<chapter>.json = { chapter, title, lines: [{ id, who, where, en, my?, own? }] }, the shape the wording editor uses.
// who/where are worked out from the flow files so an editor knows whose line it is and where it shows.
import fs from 'fs';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';

const S = 'stories/before-the-rain-ends/';
const EN = JSON.parse(fs.readFileSync(S + 'text/en.json', 'utf8'));
const MY = JSON.parse(fs.readFileSync(S + 'text/my.json', 'utf8'));
const OWN = new Set(JSON.parse(fs.readFileSync('tools/dev/migrate-ids-report.json', 'utf8')).ownIds || []);
const NAMES = { may: 'May', hnin: 'Hnin', mom: 'Mom', thura: 'Thura', min: 'Min' };
const ctx = {};
for (const f of ['prologue', 'ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ending']) {
  const src = fs.readFileSync(S + 'flow/' + f + '.js', 'utf8');
  const ast = acorn.parse(src, { ecmaVersion: 'latest' });
  walk.fullAncestor(ast, (n, _s, anc) => {
    if (n.type !== 'Literal' || typeof n.value !== 'string' || EN[n.value] === undefined) return;
    const id = n.value, moment = id.split('.')[1];
    let key = null, obj = null, idx = null, arr = null;
    for (let i = anc.length - 2; i >= 0; i--) {
      const a = anc[i];
      if (a.type === 'ArrayExpression' && idx === null) { idx = a.elements.indexOf(anc[i + 1]); arr = a }
      if (a.type === 'Property') { key = a.key.name || a.key.value; obj = anc[i - 1]; break }
    }
    const lit = (o, k) => { const p = o && o.properties && o.properties.find(p => p.key && (p.key.name || p.key.value) === k); return p && p.value.type === 'Literal' ? p.value.value : null };
    const contact = NAMES[moment] || (moment.startsWith('call-') ? NAMES[moment.slice(5)] : null);
    let who = '', where = '';
    if (key === 'say') { who = idx === 1 && arr.elements[0].type === 'Literal' ? arr.elements[0].value : ''; where = 'scene · ' + moment }
    else if (key === 'narr' || key === 'nar') { who = 'narration'; where = (contact ? 'chat · ' + contact : 'scene · ' + moment) }
    else if (key === 'min') { who = 'Min (thinking)'; where = (contact ? 'chat · ' + contact : 'scene · ' + moment) }
    else if (key === 'in' || key === 'inRe' || key === 'inVoice' || key === 'inCall') { who = contact || moment; where = 'chat · ' + (contact || moment) + (key === 'inRe' && idx === 0 ? ' (quoted)' : '') + (key === 'inVoice' ? ' (voice message)' : '') }
    else if (key === 'out' || key === 'send') { who = 'Min'; where = 'chat · ' + (contact || moment) }
    else if (key === 'label') { const ks = obj.properties.map(p => p.key && (p.key.name || p.key.value)); who = 'Min'; where = (ks.includes('say') ? 'scene option · ' : 'reply option · ') + (contact || moment) }
    else if (key === 't') { who = lit(obj, 'n') || ''; where = 'comment · ' + moment }
    else if (key === 'text') { who = contact || ''; where = (lit(obj, 'c') ? 'chat preview · ' + (NAMES[lit(obj, 'c')] || lit(obj, 'c')) : moment + ' text') }
    else if (key === 'cap') { where = moment + ' caption' }
    else if (key === 'big' || key === 'small') { where = 'title card' }
    else if (key === 'opts') { who = 'Min'; where = 'draft · ' + (contact || moment) }
    else where = (key || '?') + ' · ' + moment;
    if (!ctx[id]) ctx[id] = { who, where };
  });
}
const CH = [['p', 'Prologue'], ['c1', 'Chapter 1'], ['c2', 'Chapter 2'], ['c3', 'Chapter 3'], ['c4', 'Chapter 4'], ['c5', 'Chapter 5'], ['e', 'Ending and epilogue']];
const out = Object.fromEntries(CH.map(([k, t]) => [k, { chapter: k, title: t, lines: [] }]));
out.extra = { chapter: 'extra', title: 'Lines other code looks up by their English', lines: [] };
for (const id of Object.keys(EN)) {
  const pre = id.split('.')[0], extra = /\.extra\.\d+$/.test(id);
  const line = { id, who: extra ? '' : (ctx[id] || {}).who || '', where: extra ? 'looked up by English (' + pre + ')' : (ctx[id] || {}).where || '', en: EN[id] };
  if (MY[id] !== undefined) line.my = MY[id];
  if (OWN.has(id)) line.own = true;
  (extra ? out.extra : out[pre]).lines.push(line);
}
for (const [k, v] of Object.entries(out)) fs.writeFileSync(S + 'text/' + k + '.json', JSON.stringify(v, null, 1) + '\n');
fs.unlinkSync(S + 'text/en.json'); fs.unlinkSync(S + 'text/my.json');
console.log(Object.entries(out).map(([k, v]) => k + ':' + v.lines.length).join(' '));
