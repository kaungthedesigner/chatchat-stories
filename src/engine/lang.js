S.lang=(()=>{try{return localStorage.getItem('tib-lang')||'my'}catch(e){return 'my'}})(); /* Burmese is the default (Kaung, 17 Nov 2026); a saved choice wins */
S.ch=0;
/* Line IDs (chapter.moment.n): idStatic gives the flow steps their English at start and remembers each ID by
   its place (IDMAP), so a step still reads as English everywhere the engine looks at FLOW. trS translates a
   step just before it runs: a remembered place shows its ID's Burmese, a bare ID (steps built later, inside
   functions) is looked up directly, and any other string goes through D, the English-keyed map, as before. */
const ID_RX=/^(?:p|c[1-5]|e)\.[a-z0-9-]+\.\d+$/;
const IDMAP=new WeakMap(),IDSEEN=new WeakSet();
const idTxt=(id,my)=>my&&TEXT_MY[id]!==undefined?TEXT_MY[id]:TEXT_EN[id]!==undefined?TEXT_EN[id]:id;
function idStatic(x){if(!x||typeof x!=='object'||IDSEEN.has(x)||!(Array.isArray(x)||x.constructor===Object))return;IDSEEN.add(x);
  for(const k of Object.keys(x)){const v=x[k];if(typeof v==='string'){if(ID_RX.test(v)){let m=IDMAP.get(x);if(!m)IDMAP.set(x,m=new Map());m.set(k,v);x[k]=idTxt(v,false)}}else idStatic(v)}}
const trV=(x,k,v,D)=>{const m=IDMAP.get(x),id=m&&m.get(k);return id!==undefined&&typeof v==='string'?(S.lang==='my'?idTxt(id,true):v):trS(v,D)};
const trS=(x,D)=>typeof x==='string'?(ID_RX.test(x)?idTxt(x,S.lang==='my'):D[x]!==undefined?D[x]:x):Array.isArray(x)?x.map((y,i)=>trV(x,String(i),y,D)):(x&&typeof x==='object'&&x.constructor===Object)?(D2=>Object.fromEntries(Object.entries(x).filter(([k])=>k!=='myTr').map(([k,v])=>[k,trV(x,k,v,D2)])))(x.myTr?{...D,...x.myTr}:D):x;
const trStep=s=>{if(!s||typeof s!=='object')return s;if(S.lang==='my'){const D=MY_STORY[S.ch];return trS(s,D||{})}
  /* English mode: a branch that was translated before the player switched language is turned back */
  if(!S.langSwitched)return trS(s,{});storyMaps();return trS(s,MY2EN)};
const UI_RX=[[/^(\d+) of 3$/,'$1 / 3'],[/^([\d,]+) Ks$/,'$1 ကျပ်'],[/^of ([\d,]+) Ks$/,'/ $1 ကျပ်'],[/^([\d,]+) Ks · not used$/,'$1 ကျပ် · မသုံးရသေးပါ'], [/^Seat (\w+)$/,'ထိုင်ခုံ $1'],[/^Seat (\w+)\. Count out the fare\.$/,'ထိုင်ခုံ $1။ ကားခ ရေတွက်ပေးပါ။'],[/^Seat (\w+)\. Change: ([\d,]+) Ks\.$/,'ထိုင်ခုံ $1။ ပြန်အမ်းငွေ $2 ကျပ်။'], [/^Night bus to the city · seat (\w+)$/,'မြို့ကြီးသွား ညကား · ထိုင်ခုံ $1'], [/^(Mostly dry|Wet|Soaked) · camera (bone dry|still working)$/,(m,a,b)=>({'Mostly dry':'သိပ်မစို','Wet':'ရေစို','Soaked':'ရွှဲနစ်'})[a]+' · '+(b==='bone dry'?'ကင်မရာ လုံးဝမစို':'ကင်မရာ အလုပ်လုပ်သေးတယ်')], [/^You splashed (\d+) friends?\. Min got splashed (\d+) times?\.$/,'သူငယ်ချင်း $1 ယောက်ကို ရေပက်ခဲ့တယ်။ မင်းထက်ကတော့ $2 ခါ ရေအပက်ခံရတယ်။']];
