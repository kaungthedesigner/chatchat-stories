// The checker: guards the story's rules on every change.  Usage: node tools/check.mjs [--text-only <git-ref>]
// Errors fail the run; warnings are listed but don't.
//  - index.html is not the current build of src/ and stories/
//  - a flow line refers to an ID that has no English, or an ID in en.json is never used
//  - a line has no Burmese (warning)
//  - Burmese typed on a phone (chats, reply options, posts, comments) contains ။ or ၊ (error);
//    a scene line (spoken, narration) doesn't end in ။ ? ! or … (warning)
//  - an emoji in the English line is missing from the Burmese line, or the other way round (warning)
//  - an image or sound named in the code has no file (error), or a file in img/ snd/ is never named (warning)
//  - a flag is read but never set (error) or set but never read (warning)
//  - a quoted reply quotes a line that isn't earlier in the same chapter file (error)
//  - --text-only <ref>: the line list (IDs and their order) changed since <ref>, in a change meant to be wording only (error)
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
process.chdir(root);
const errors = [], warns = [];
const err = (rule, msg) => errors.push(`[${rule}] ${msg}`), warn = (rule, msg) => warns.push(`[${rule}] ${msg}`);
const args = process.argv.slice(2);

const parts = JSON.parse(fs.readFileSync('src/parts.json', 'utf8'));
const files = parts.filter(p => !p.startsWith('gen:'));
const stories = [...new Set(parts.filter(p => p.startsWith('gen:text:')).map(p => p.split(':')[2]))];

// 1. index.html is the current build
{
  const tmp = path.join(fs.mkdtempSync('/tmp/chk-'), 'index.html');
  execSync(`node tools/build.mjs ${tmp}`, { stdio: 'ignore' });
  if (fs.readFileSync(tmp, 'utf8') !== fs.readFileSync('index.html', 'utf8')) err('build', 'index.html is not the current build: run npm run build');
}

const ID_RX = /^(?:p|c[1-5]|e)\.[a-z0-9-]+\.\d+$/;
const EMO = /\p{Extended_Pictographic}/gu;
// inVoice is a voice message's sound caption, not typed text, so it may use ။
const PHONE_KEYS = new Set(['in', 'out', 'send', 'text', 't', 'cap', 'inRe', 'opts', 'inCall']);
const SCENE_KEYS = new Set(['say', 'narr', 'min']);

for (const dir of stories) {
  const EN = JSON.parse(fs.readFileSync(path.join(dir, 'text/en.json'), 'utf8'));
  const MY = JSON.parse(fs.readFileSync(path.join(dir, 'text/my.json'), 'utf8'));
  const flowFiles = files.filter(f => f.startsWith(dir + 'flow/'));
  const used = new Map(); // id -> context
  for (const f of flowFiles) {
    const src = fs.readFileSync(f, 'utf8');
    const ast = acorn.parse(src, { ecmaVersion: 'latest' });
    const seenText = [];
    walk.fullAncestor(ast, (n, _s, anc) => {
      if (n.type !== 'Literal' || typeof n.value !== 'string' || !ID_RX.test(n.value)) return;
      const id = n.value;
      if (EN[id] === undefined) err('ids', `${f}: ${id} has no English in text/en.json`);
      // context: the property this string sits under (directly or as an array element)
      let key = null, obj = null, idx = null;
      for (let i = anc.length - 2; i >= 0; i--) {
        const a = anc[i];
        if (a.type === 'ArrayExpression' && idx === null) idx = a.elements.indexOf(anc[i + 1]);
        if (a.type === 'Property') { key = a.key.name || a.key.value; obj = anc[i - 1]; break }
      }
      let kind = null;
      if (key === 'label') {
        const ks = new Set(obj.properties.map(p => p.key && (p.key.name || p.key.value)));
        kind = ks.has('say') ? 'scene' : (ks.has('send') || ks.has('sticker') || ks.has('photo')) ? 'phone' : null;
      } else if (key === 'say') kind = idx === 1 ? 'scene' : null;
      else if (key === 'inRe') { kind = 'phone'; if (idx === 0 && !seenText.includes(EN[id])) err('quote', `${f}: ${id} quotes "${EN[id]}", which is not earlier in this chapter`) }
      else if (SCENE_KEYS.has(key)) kind = 'scene';
      else if (PHONE_KEYS.has(key)) kind = 'phone';
      used.set(id, { f, kind, key });
      if (EN[id] !== undefined) seenText.push(EN[id]);
    });
  }
  for (const id of Object.keys(EN)) if (!used.has(id) && !/\.extra\.\d+$/.test(id)) err('ids', `${dir}text/en.json: ${id} is never used`);
  for (const id of Object.keys(MY)) if (EN[id] === undefined) err('ids', `${dir}text/my.json: ${id} is not in en.json`);
  const noMy = [...used.keys()].filter(id => MY[id] === undefined);
  if (noMy.length) warn('burmese', `${noMy.length} lines have no Burmese: ${noMy.slice(0, 12).join(', ')}${noMy.length > 12 ? ' …' : ''}`);
  for (const [id, c] of used) {
    const my = MY[id], en = EN[id]; if (my === undefined || en === undefined) continue;
    if (c.kind === 'phone' && /[။၊]/.test(my)) err('burmese-punct', `${id} (${c.key}) is typed on a phone but has ။ or ၊: ${my}`);
    if (c.kind === 'scene' && /[က-႟]/.test(my) && !/[။?!…)"”]\s*$/.test(my)) warn('burmese-punct', `${id} (${c.key}) is a scene line without a closing ။: ${my}`);
    const e1 = (en.match(EMO) || []).sort().join(''), e2 = (my.match(EMO) || []).sort().join('');
    if (e1 !== e2) warn('emoji', `${id}: English ${e1 || 'none'} vs Burmese ${e2 || 'none'}`);
  }
  // --text-only: the line list must not change
  const ti = args.indexOf('--text-only');
  if (ti >= 0) {
    const ref = args[ti + 1];
    let old = null; try { old = JSON.parse(execSync(`git show ${ref}:${dir}text/en.json`, { encoding: 'utf8' })) } catch (e) {}
    if (old && Object.keys(old).join('\n') !== Object.keys(EN).join('\n')) err('text-only', `${dir}: line IDs were added, removed or reordered since ${ref}`);
  }
}

// files named in code
{
  const code = files.map(f => fs.readFileSync(f, 'utf8')).join('\n') + fs.readFileSync('manifest.webmanifest', 'utf8');
  const named = new Set(), noComments = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/[;{}]\s*\/\/[^'"`\n]*$/gm, '');
  for (const m of noComments.matchAll(/\b((?:img|snd|fonts)\/[\w.-]+\.(?:webp|png|jpg|jpeg|svg|mp3|woff2?))/g)) named.add(m[1]);
  for (const n of named) if (!fs.existsSync(n)) err('files', `${n} is named in the code but the file is missing`);
  // names built at runtime: img/<name>.webp from SCENE keys, preload lists, stickers, avatars; count a file as used if its stem appears anywhere
  for (const d of ['img', 'snd']) for (const f of fs.readdirSync(d)) {
    const rel = d + '/' + f, stem = f.replace(/\.[^.]+$/, '');
    const dash = stem.indexOf('-'), dyn = dash > 0 && code.includes(stem.slice(0, dash + 1)) && code.includes(stem.slice(dash + 1));
    if (!named.has(rel) && !code.includes(stem) && !dyn) warn('files', `${rel} is never used`);
  }
}

// flags
{
  const code = files.map(f => fs.readFileSync(f, 'utf8')).join('\n');
  const set = new Set(), read = new Set();
  for (const m of code.matchAll(/\bflag:\s*'(\w+)'/g)) set.add(m[1]);
  for (const m of code.matchAll(/\b(?:flag|set):\s*\{([^}]*)\}/g)) for (const k of m[1].matchAll(/(\w+)\s*:/g)) set.add(k[1]);
  for (const m of code.matchAll(/S\.flags\.(\w+)\s*=(?!=)/g)) set.add(m[1]);
  for (const m of code.matchAll(/S\.flags\[['"](\w+)['"]\]\s*=[^=]/g)) set.add(m[1]);
  for (const m of code.matchAll(/\b(?:f|fl|F|flags|S\.flags)\.(\w+)\b(?!\s*=[^=])/g)) read.add(m[1]);
  for (const m of code.matchAll(/\bpick\('(\w+)'/g)) read.add(m[1]);
  for (const m of code.matchAll(/\[(?:'c\d_\w+',?\s*)+\]/g)) for (const k of m[0].matchAll(/'(c\d_\w+)'/g)) read.add(k[1]);
  const skip = new Set(['__done', 'ending']);
  for (const k of read) if (!set.has(k) && !skip.has(k) && /^[a-z]\w*_\w+$/.test(k)) err('flags', `flag ${k} is read but never set`);
  const unread = [...set].filter(k => !read.has(k) && !skip.has(k));
  if (unread.length) warn('flags', `${unread.length} flags are set but never read (kept for later callbacks): ${unread.slice(0, 8).join(', ')} …`);
}

// known issues already in the story (tools/check-known.json): listed, but they don't fail the run until fixed
let known = []; try { known = JSON.parse(fs.readFileSync('tools/check-known.json', 'utf8')) } catch (e) {}
if (args.includes('--update-known')) { fs.writeFileSync('tools/check-known.json', JSON.stringify(errors, null, 1) + '\n'); console.log('wrote tools/check-known.json'); }
const knownNow = errors.filter(e => known.includes(e) || args.includes('--update-known'));
for (const e of knownNow) errors.splice(errors.indexOf(e), 1);
for (const w of warns) console.log('warn  ' + w);
for (const e of knownNow) console.log('known ' + e);
for (const e of errors) console.log('ERROR ' + e);
console.log(`\n${errors.length} errors, ${warns.length} warnings`);
process.exit(errors.length ? 1 : 0);
