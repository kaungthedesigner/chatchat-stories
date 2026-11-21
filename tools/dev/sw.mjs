import { chromium } from 'playwright';
const b=await chromium.launch();
for (const [startLang,tag] of [['en','old'],['en','new']]) {}
async function run(file){
  const ctx=await b.newContext({viewport:{width:430,height:900}});
  await ctx.addInitScript(`localStorage.setItem('tib-lang','en');localStorage.setItem('tib-a2hs','1')`);
  const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(String(e)));
  await pg.goto('file://'+file);await pg.waitForTimeout(800);
  const i=await pg.evaluate(()=>CH_START[1]+12);
  await pg.evaluate(i=>{sessionStorage.setItem('bre_jump',String(i));location.reload()},i);await pg.waitForTimeout(2500);
  await pg.evaluate(()=>S.speed=4);
  for(let n=0;n<40;n++){await pg.mouse.click(215,450);await pg.waitForTimeout(150);const o=await pg.$$('#tray .opt:not(.cont), #dlg .opts .opt');if(o.length)await o[0].click().catch(()=>{});}
  const before=await pg.evaluate(()=>[S.at,document.querySelector('#msgs')?.innerText.slice(-300)||'',document.querySelector('#dlg')?.innerText||'']);
  await pg.click('#bLang');await pg.waitForTimeout(800);
  const after=await pg.evaluate(()=>[S.lang,document.querySelector('#msgs')?.innerText.slice(-300)||'',document.querySelector('#dlg')?.innerText||'']);
  for(let n=0;n<25;n++){await pg.mouse.click(215,450);await pg.waitForTimeout(150);const o=await pg.$$('#tray .opt:not(.cont), #dlg .opts .opt');if(o.length)await o[0].click().catch(()=>{});}
  const later=await pg.evaluate(()=>[S.at,document.querySelector('#msgs')?.innerText.slice(-200)||'',document.querySelector('#dlg')?.innerText||'']);
  await ctx.close();return {before,after,later,errs};
}
const r=await run(process.argv[2]);console.log(JSON.stringify(r,null,1).slice(0,2500));await b.close();
