// Builds one self-contained page per story from the shared engine parts and the story's own files.
// Usage: node tools/build.mjs [--prod] [--out <dir>] [--only <storyId>]
//   default: every story, pages written next to the repo root (index.html for the main story, <page> for others)
//   --prod: the public build: dev timeline off, stories marked "hidden" left out (tools/build-vercel.sh uses it)
// src/parts.json lists the engine parts in order. Entries starting with slot: take the story's files for that
// slot (story.json "slots"); gen: entries are written here: gen:text (the story's lines), gen:flow (the story's
// step arrays joined into STORY_FLOW), gen:stories (the story list for the home page). {{key}} in a part is
// replaced by that key from story.json. Images, sounds and fonts stay as files next to the pages.
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const prod = args.includes('--prod');
const opt = k => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null };
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outDir = path.resolve(opt('--out') || root);
const only = opt('--only');

const parts = JSON.parse(fs.readFileSync(path.join(root, 'src/parts.json'), 'utf8'));
const storyDirs = fs.readdirSync(path.join(root, 'stories')).filter(d => fs.existsSync(path.join(root, 'stories', d, 'story.json'))).sort();
const stories = storyDirs.map(d => ({ dir: 'stories/' + d + '/', ...JSON.parse(fs.readFileSync(path.join(root, 'stories', d, 'story.json'), 'utf8')) }))
  .filter(s => !(prod && s.hidden))
  .sort((a, b) => (a.page === 'index.html' ? -1 : b.page === 'index.html' ? 1 : a.id.localeCompare(b.id)));

// what the home page needs to know about every story
const meta = stories.map(s => ({ id: s.id, title: s.title, page: s.page, mins: s.mins, tag: s.tag, tagline: s.tagline, cover: s.cover,
  chapters: s.chapters.map(c => { const o = { n: c.n, t: c.t, d: c.d }; if (c.soon) o.soon = true; return o }) }));

const read = p => fs.readFileSync(path.join(root, p), 'utf8');
export function textOf(s) {
  const EN = {}, MY = {}, OWN = [];
  for (const ch of s.text) for (const l of JSON.parse(read(s.dir + 'text/' + ch + '.json')).lines) { EN[l.id] = l.en; if (l.my !== undefined && l.my !== '') MY[l.id] = l.my; if (l.own) OWN.push(l.id) }
  return { EN, MY, OWN };
}

function page(s) {
  const gen = p => {
    if (p === 'gen:text') {
      const { EN, MY, OWN } = textOf(s);
      const ID_CH = Object.fromEntries(s.chapters.map((c, i) => [c.text, i]).filter(([k]) => k));
      return `const TEXT_EN=${JSON.stringify(EN)};\nconst TEXT_MY=${JSON.stringify(MY)};\nconst TEXT_OWN=new Set(${JSON.stringify(OWN)});\nconst ID_CH=${JSON.stringify(ID_CH)};\n`;
    }
    if (p === 'gen:flow') return `const STORY_FLOW=[${s.flow.map(n => '...' + n).join(',')}];\n`;
    if (p === 'gen:stories') return `const STORIES=${JSON.stringify(meta)};\nconst STORY_ID=${JSON.stringify(s.id)};\n`;
    throw new Error('unknown generated part ' + p);
  };
  let html = parts.map(p => {
    if (p.startsWith('gen:')) return gen(p);
    if (p.startsWith('slot:')) return (s.slots[p.slice(5)] || []).map(f => read(s.dir + f)).join('');
    return read(p);
  }).join('');
  html = html.replace(/\{\{(\w+)\}\}/g, (m, k) => (typeof s[k] === 'string' ? s[k].replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;') : m));
  if (prod) {
    const a = 'const DEV_ON=true;';
    if (!html.includes(a)) throw new Error('DEV_ON line not found');
    html = html.replace(a, 'const DEV_ON=false;');
  }
  return html;
}

if (import.meta.url === 'file://' + process.argv[1]) {
  for (const s of stories) {
    if (only && s.id !== only) continue;
    const html = page(s), out = path.join(outDir, s.page);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    console.log('built', path.relative(process.cwd(), out) || out, s.id, (Buffer.byteLength(html) / 1024).toFixed(0) + ' KB', prod ? '(prod)' : '(dev)');
  }
}
