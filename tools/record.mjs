// Records a full playthrough as a step log, so a restructured build can be compared line by line.
// Usage: node tools/record.mjs <page.html> <out.log> <lang en|my> <pick 0|1|2> <send: comma list of courage drafts to send, or "all"/"none">
// The game runs about 40x faster (timers scaled), an autopilot taps through, side quests that need skill
// (photo walk, water street) are replaced by fixed results, and every step the engine runs is logged
// after translation, together with each choice picked and each draft sent or deleted.
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const [page_, out, lang = 'en', pickS = '0', sendS = 'all'] = process.argv.slice(2);
const pick = +pickS;
const COURAGE = ['c1_told_kept', 'c1_wouldnt_mind', 'c2_friends', 'c4_night', 'c5_station'];
const send = sendS === 'all' ? COURAGE : sendS === 'none' ? [] : sendS.split(',');
const url = page_.startsWith('http') ? page_ : 'file://' + path.resolve(page_);

const init = `
(()=>{
  // no autostart, no a2hs/oib sheets, fixed language
  window.__CARRY=1;localStorage.clear();localStorage.setItem('tib-lang',${JSON.stringify(lang)});localStorage.setItem('tib-a2hs','1');localStorage.setItem('tib-rx-hint','1');
  const st=window.setTimeout.bind(window),si=window.setInterval.bind(window);
  window.__st=st;window.__si=si;
  window.setTimeout=(f,d,...a)=>st(f,Math.min(60,(+d||0)/40),...a);
  window.setInterval=(f,d,...a)=>si(f,Math.max(4,(+d||0)/40),...a);
})();`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 430, height: 900 } });
await ctx.addInitScript(init);
const pg = await ctx.newPage();
const errs = [];
pg.on('pageerror', e => errs.push(String(e)));
await pg.goto(url);
await pg.waitForFunction(() => typeof runFlow === 'function' && typeof FLOW !== 'undefined');

await pg.evaluate(({ pick, send, COURAGE }) => {
  const LOG = (window.__LOG = []);
  const strip = (k, v) => (typeof v === 'function' ? undefined : k === 'then' || k === 'onSend' || k === 'onDelete' || k === 'else' ? undefined : v);
  const E = exec;
  exec = async function (s) {
    if (s && typeof s === 'object') {
      const t = trStep(s);
      const k = Object.keys(t)[0];
      if (k !== 'if') LOG.push(k + ' ' + JSON.stringify(t[k], strip));
      if (k === 'draft') window.__draft = t[k].flag || null;
      if (k === 'final') setTimeout(() => { LOG.push('FINAL ' + (document.querySelector('#end') || {}).innerText); window.__DONE = 1 }, 400);
    }
    return E(s);
  };
  const Ch = choose;
  choose = function (...a) { return Ch(...a).then(i => { LOG.push('pick ' + i); return i }) };
  const Tp = trayPick;
  trayPick = function (...a) { return Tp(...a).then(i => { LOG.push('postpick ' + i); return i }) };
  photoWalk = async () => { S.walk = SPOTS.slice(0, 3).map(x => ({ id: x.id, px: 50, py: 50, ok: true })); S.flags.c2_walk_framed = 3; LOG.push('QUEST photowalk (fixed)') };
  waterStreet = async () => { S.flags.c3_wet = ['dry', 'wet', 'soaked'][pick % 3]; S.flags.c3_splashes = 2; LOG.push('QUEST waterstreet (fixed) ' + S.flags.c3_wet) };
  const vis = e => e && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden';
  const q = s => document.querySelector(s), qa = s => [...document.querySelectorAll(s)];
  const on = id => { const e = q('#' + id); return e && e.classList.contains('on') };
  let busy = false;
  window.__si(() => {
    if (busy || window.__DONE) return; busy = true;
    try {
      if (on('lock')) { const lk = q('#lk'); const r = lk.getBoundingClientRect(), x = r.x + r.width / 2;
        lk.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: x, clientY: r.bottom - 50, pointerId: 1 }));
        lk.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: x, clientY: r.top - 400, pointerId: 1 }));
        lk.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX: x, clientY: r.top - 400, pointerId: 1 })); return }
      if (q('#banner') && q('#banner').classList.contains('on')) { q('#banner').click(); return }
      const snd = q('#tray .snd');
      if (vis(snd)) { const f = window.__draft; const s = f && COURAGE.includes(f) ? send.includes(f) : pick !== 1; const b = s ? snd : q('#tray .del') || snd; LOG.push('draft ' + (b === snd ? 'send' : 'delete')); b.click(); return }
      const opts = qa('#tray .opt:not(.cont), #dlg .opts .opt').filter(vis);
      if (opts.length) { opts[Math.min(pick, opts.length - 1)].click(); return }
      const po = qa('#postTray .opt').filter(vis);
      if (po.length) { po[Math.min(pick, po.length - 1)].click(); return }
      const cont = q('#tray .cont'); if (vis(cont)) { cont.click(); return }
      const cta = q('.uphint.cta'); if (cta) { cta.click(); return }
      if (on('gallery')) { const h = q('#ggrid .hot'); if (h) h.click() }
      const pr = q('#rows .crow.pulse'); if (on('list') && pr) { pr.click(); return }
      if (on('callv')) { const o = qa('#cTray button, #cTray .opt').filter(vis); if (o.length) { o[Math.min(pick, o.length - 1)].click(); return }
        const c = qa('#cCtl button').filter(b => vis(b) && !b.disabled); if (c.length) { c[c.length - 1].click(); return } }
      if (on('padauk')) { const g = q('#pdGo'); if (vis(g)) { g.click(); return } busy = false; return }
      if (on('pack')) { const it = qa('#pkGrid .it'); if (qa('#pkGrid .it.in').length < 2) { const x = it.find(b => !b.classList.contains('in')); x && x.click() } else q('#pkGo').click(); return }
      if (on('ticket')) { const g = q('#tkGo'); if (vis(g) && !g.disabled) { g.click(); return }
        const b = qa('#tkBody button, #tkBody [role=button], #tkBody .seat, #tkBody .note').filter(x => vis(x) && !x.disabled && !x.classList.contains('on') && !x.classList.contains('taken')); if (b.length) b[0].click(); return }
      const ap = q('#a2hs.on #a2hsOk'); if (ap) { ap.click(); return }
      q('#stage').click();
    } finally { busy = false }
  }, 25);
}, { pick, send, COURAGE });

await pg.evaluate(() => { window.__CARRY = 0; playFrom(0, false) });
let last = 0, lastT = Date.now();
const t0 = Date.now();
while (true) {
  await pg.waitForTimeout(500);
  const [n, done, at] = await pg.evaluate(() => [window.__LOG.length, !!window.__DONE, S.at]);
  if (done) break;
  if (n !== last) { last = n; lastT = Date.now() }
  if (Date.now() - lastT > 25000) { await pg.screenshot({ path: out + '.stall.png' }); errs.push('STALL at step ' + at); break }
  if (Date.now() - t0 > 20 * 60000) { errs.push('TIMEOUT'); break }
}
const log = await pg.evaluate(() => window.__LOG);
fs.writeFileSync(out, log.join('\n') + '\n');
fs.writeFileSync(out + '.meta.json', JSON.stringify({ lang, pick, send, errs, lines: log.length, secs: Math.round((Date.now() - t0) / 1000) }, null, 1));
console.log(path.basename(out), lang, 'pick', pick, 'lines', log.length, 'secs', Math.round((Date.now() - t0) / 1000), errs.length ? 'ERRS ' + errs.slice(0, 3).join(' | ') : 'ok');
await browser.close();
