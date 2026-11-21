// Builds the game into one self-contained page: the parts listed in src/parts.json, in order.
// Usage: node tools/build.mjs [out=dist/index.html] [--prod]   (--prod turns the dev timeline off, for Vercel)
// Images, sounds and fonts stay as files next to the page.
import fs from 'fs';
import path from 'path';
const args = process.argv.slice(2);
const prod = args.includes('--prod');
const out = args.find(a => !a.startsWith('--')) || 'dist/index.html';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const parts = JSON.parse(fs.readFileSync(path.join(root, 'src/parts.json'), 'utf8'));
// gen:text:<story>/ emits that story's line text (text/en.json, text/my.json) as TEXT_EN / TEXT_MY
const gen = p => {
  const [, kind, dir] = p.split(':');
  if (kind === 'text') {
    const en = fs.readFileSync(path.join(root, dir, 'text/en.json'), 'utf8').trim();
    const my = fs.readFileSync(path.join(root, dir, 'text/my.json'), 'utf8').trim();
    const one = j => JSON.stringify(JSON.parse(j));
    return `const TEXT_EN=${one(en)};\nconst TEXT_MY=${one(my)};\n`;
  }
  throw new Error('unknown generated part ' + p);
};
let html = parts.map(p => p.startsWith('gen:') ? gen(p) : fs.readFileSync(path.join(root, p), 'utf8')).join('');
if (prod) {
  const a = 'const DEV_ON=true;';
  if (!html.includes(a)) throw new Error('DEV_ON line not found');
  html = html.replace(a, 'const DEV_ON=false;');
}
fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
fs.writeFileSync(out, html);
console.log('built', out, (html.length / 1024).toFixed(0) + ' KB', prod ? '(prod)' : '(dev)');
