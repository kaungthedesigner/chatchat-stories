/* ============ STORIES · SAVES ============ */
const STORIES=[{id:'bre',title:'Before the Rain Ends',mins:110,chapters:[
  {n:'P',t:'Prologue',d:'November 2020'},
  {n:'1',t:'The First Rain',d:'June 2018'},
  {n:'2',t:'Monsoon Season',d:'July to October 2018'},
  {n:'3',t:'Thingyan',d:'March to December 2019'},
  {n:'4',t:'The Station',d:'January to September 2020'},
  {n:'5',t:'Seen',d:'October 2020 to early 2021'},
  {n:'E',t:'Still waiting',d:'June 2023 · Epilogue 2024'}]}];
const STORY=STORIES[0];
/* Home card line: the chapter range comes from the list above, so it updates by itself when a chapter goes live */
(()=>{const live=STORY.chapters.filter(c=>!c.soon&&/^\d+$/.test(c.n)),last=live.length?live[live.length-1].n:null,el=$('#libMeta');
  const fin=STORY.chapters.some(c=>c.n==='E'&&!c.soon);
  if(el)el.textContent='Prologue'+(last?(fin?', Chapters 1–':' & Chapters 1–')+last:'')+(fin?', Ending & Epilogue':'')+' · about '+STORY.mins+' minutes'})();
const CH_START=(()=>{const a=[0];FLOW.forEach((st,i)=>{const t=st&&st.title&&st.title.big;if(!t)return;const m=/^<em>Chapter (\d+)<\/em>/.exec(t);if(m)a[+m[1]]=i;else if(/^<em>Ending<\/em>/.test(t))a[STORY.chapters.length-1]=i});return a})();
const CH_END=(()=>{const a={};FLOW.forEach((st,i)=>{const m=st&&st.title&&/^<em>End of Chapter (\d+)<\/em>/.exec(st.title.big);if(m)a[i]=+m[1]});return a})();
const SAVE_KEY='chatchat.saves.v1';let SAVES={};
try{SAVES=JSON.parse(localStorage.getItem(SAVE_KEY)||'{}')||{}}catch(e){SAVES={}}
function sv(){return SAVES[STORY.id]=SAVES[STORY.id]||{cps:{},done:[],cur:null}}
function persist(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(SAVES))}catch(e){}carrySoon()}
/* Writes the progress into the page link (?p=…, see the script at the top), so it comes along to Safari or the Home Screen app.
   Only what Continue needs: chapter save points drop their chat history, and each chat keeps its last 40 messages. Not in the Home Screen app itself, not on dev jumps. */
let CARRY_T=0;
function carrySoon(){if(STANDALONE||window.__CARRY)return;clearTimeout(CARRY_T);CARRY_T=setTimeout(carryWrite,600)}
function carryTrim(v){const o=JSON.parse(JSON.stringify(v));for(const k in o.cps||{})if(o.cps[k])o.cps[k].threads={};const th=o.pos&&o.pos.s&&o.pos.s.threads;if(th)for(const c in th)if(Array.isArray(th[c])&&th[c].length>40)th[c]=th[c].slice(-40);return o}
async function carryCode(str){const u=new TextEncoder().encode(str);let t='j',b=u;
  if(window.CompressionStream){try{b=new Uint8Array(await new Response(new Blob([u]).stream().pipeThrough(new CompressionStream('deflate-raw'))).arrayBuffer());t='z'}catch(e){b=u;t='j'}}
  let bin='';for(let i=0;i<b.length;i+=8192)bin+=String.fromCharCode.apply(null,b.subarray(i,i+8192));return t+btoa(bin).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
async function carryWrite(){if(STANDALONE||DEVJUMP||window.__CARRY||!libState().any)return;let a=0;try{a=localStorage.getItem('tib-a2hs')==='1'?1:0}catch(e){}
  const code=await carryCode(JSON.stringify({t:Date.now(),h:inApp()?1:0,l:S.lang,a,s:{[STORY.id]:carryTrim(sv())}}));
  const q=location.search.replace(/[?&]p=[^&]*/,'').replace(/^&/,'?');
  try{history.replaceState(history.state,'',location.pathname+(q?q+'&':'?')+'p='+code+location.hash)}catch(e){}}
setInterval(()=>{if(document.visibilityState==='visible')carrySoon()},60e3);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')carrySoon()});
function snap(){let day=S.day||0,tl=S.tlabel||null;if(S.pendTime){const o={now:S.now,day:S.day,tl:S.tlabel,clk:$('#clock').textContent};setTime(S.pendTime);day=S.day||0;tl=S.tlabel;S.now=o.now;S.day=o.day;S.tlabel=o.tl;$('#clock').textContent=o.clk}
  return JSON.parse(JSON.stringify({flags:S.flags,memories:S.memories,unsent:S.unsent,threads:S.threads,day,tl,rain:S.rain||0,walk:S.walk||null,ym:S.ym==null?null:S.ym}))}
function restore(c){S.pendTime=null;S.flags=c.flags||{};S.memories=c.memories||[];S.unsent=c.unsent||[];S.threads=c.threads||{};S.day=c.day||0;S.now=null;S.contact=null;if(c.tl){setTime(c.tl)}setRain(c.rain||0);S.walk=c.walk||null;S.ym=c.ym==null?null:c.ym;(S.walk||[]).forEach(w=>{const sp=SPOTS.find(x=>x.id===w.id);if(sp)ART['shot_'+w.id]=shotHTML(w)})}
const FIRST_SAFE_OF=()=>FLOW.findIndex(st=>st&&typeof st==='object'&&SAFE.includes(Object.keys(st)[0]));let FIRST_SAFE=1e9;
const SAFE=['notify','scene','title','browse','friend','lock'];
