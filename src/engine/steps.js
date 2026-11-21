/* ============ ENGINE ============ */
function swipeUp(){return new Promise(r=>{const lk=$('#lk');lk.classList.remove('snap');lk.style.transform='';lk.style.opacity='';
  let y0=null,t0=0,dy=0;const H=lk.offsetHeight||800;
  const set=d=>{lk.style.transform=`translateY(${d}px)`;lk.style.opacity=String(1-Math.min(.6,-d/H))};
  const down=e=>{y0=e.clientY;t0=performance.now();dy=0;lk.classList.remove('snap');lk.setPointerCapture&&lk.setPointerCapture(e.pointerId)};
  const move=e=>{if(y0===null)return;dy=Math.min(0,e.clientY-y0);set(dy)};
  const up=e=>{if(y0===null)return;const v=-dy/Math.max(1,performance.now()-t0);y0=null;lk.classList.add('snap');
    if(-dy>H*.22||v>.6){set(-H);done()}else{set(0);if(-dy<6){lk.animate([{transform:'translateY(0)'},{transform:'translateY(-18px)'},{transform:'translateY(0)'}],{duration:420,easing:'ease-out'})}}};
  const done=()=>{lk.removeEventListener('pointerdown',down);lk.removeEventListener('pointermove',move);lk.removeEventListener('pointerup',up);lk.removeEventListener('pointercancel',up);setTimeout(r,320)};
  lk.addEventListener('pointerdown',down);lk.addEventListener('pointermove',move);lk.addEventListener('pointerup',up);lk.addEventListener('pointercancel',up);})}
const HOLD_STEPS=new Set(['browse','notify','friend','scene','title','post','glance','profile','lock','ticket','pphoto','memshare','minpost','lockEp']);
const flushTime=()=>{if(S.pendTime){setTime(S.pendTime);S.pendTime=null}};
async function holdChat(){ if(!$('#chat').classList.contains('on'))return flushTime();
  await rawSleep(1200);
  tray(`<div class="tray"><button class="opt cont">Continue</button></div>`);
  await new Promise(r=>{$('#tray .cont').onclick=e=>{e.stopPropagation();r()}});tray('');flushTime();}
async function run(steps){for(const s of steps){await exec(s)}}
async function exec(s){
  if(typeof s==='function'){return run(s()||[])}
  const s0=s;s=trStep(s);
  const [k,v]=Object.entries(s)[0];
  if(S.pendTime&&k!=='time'&&!HOLD_STEPS.has(k)&&k!=='pause'&&k!=='rain'){setTime(S.pendTime);S.pendTime=null}
  switch(k){
  case 'time': if($('#chat').classList.contains('on'))S.pendTime=v;else setTime(v);break;
  case 'rain': setRain(v);break;
  case 'a2hs': if(a2hsDue()){await sleep(400);await a2hsShow()}break;
  case 'pause': await sleep(v);break;
  case 'flag': Object.assign(S.flags,v);break;
  case 'mem': addMem(v);await rawSleep(300);break;
  case 'lock':{ $('#wall').innerHTML=ART.teaTable();$('#lockDate').textContent=v.date;$('#lockTime').textContent=v.time;show('lock');await swipeUp();break}
  case 'list':{ renderList(v.rows,v.only);show('list');if(v.only){await waitRow(v.only)}break}
  case 'open': openChat(v.c,v.stat);await sleep(500);break;
  case 'browse':{ await holdChat();await sleep(700);renderList(liveRows(v.rows,null),null);show('list');await sleep(1700);openChat(v.c,v.stat);await sleep(600);break}
  case 'notify':{ await holdChat();if(v.div)await timeJump(v.div);renderList(liveRows(v.rows,v.c),null);show('list');await sleep(900);if(v.div)push({k:'div',text:v.div},v.c);push(Object.assign({dir:'in'},v.m||{k:'text',text:v.text}),v.c);await banner(v.c,C[v.c].name,v.text);openChat(v.c,v.stat);await sleep(600);break}
  case 'friend':{ await holdChat();renderList(v.rows,null);show('list');await sleep(900);await banner('may','May Thiri','sent you a friend request',true);toast('You and <b>May Thiri</b> are now connected');openChat('may','Active now');push({k:'sys',text:'You are now connected on ChatChat'});await sleep(900);break}
  case 'in': await incoming({k:'text',text:v});break;
  case 'inRe': await incoming({k:'text',text:v[1],re:reOf(v[0])});break;
  case 'inPhoto': await incoming({k:'photo',art:v});break;
  case 'inLoc': await incoming({k:'loc',place:v.place,area:v.area});break;
  case 'inLink': await incoming({k:'link',id:v});break;
  case 'inVoice': await incoming({k:'voice',text:v[0],tr:v[1]});break;
  case 'outPhoto': await outgoing({k:'photo',art:v});break;
  case 'photowalk': await photoWalk();break;
  case 'waterstreet': await waterStreet();break;
  case 'padauk': await padaukPick();break;
  case 'pack': await packBox();break;
  case 'ticket': await ticketStep(v);break;
  case 'pphoto': case 'memshare': await photoActs(v);break;
  case 'minpost': await minPost(v);break;
  case 'lockEp': await lockEp(v);break;
  case 'scrollFirst': if(S._sf){S._sf=0;break}await scrollFirst(v);break;
  case 'react':{const th=S.threads[S.contact]||[];const lo=[...th].reverse().find(m=>m.dir==='out');if(lo){lo.rx=v;lo.rxMe=false;lo.rc='Seen'}renderThread();Audio_.blip(false);await sleep(800);break}
  case 'rcpt':{const th=S.threads[S.contact]||[];const lo=[...th].reverse().find(m=>m.dir);if(lo&&lo.dir==='out'){lo.rc=v;const r=$('#rc');if(r)r.textContent=v}await sleep(300);break}
  case 'final': finalCard();await new Promise(()=>{});break;
  case 'post': await postStep(v);break;
  case 'profile': await profileStep(v);break;
  case 'glance': await glanceStep(v);break;
  case 'call': await callStep(v);break;
  case 'inCall': await incoming({k:'call',text:v});break;
  case 'inSticker': await incoming({k:'sticker',art:v});break;
  case 'out': await outgoing({k:'text',text:v});break;
  case 'typing': await typingFor(v);break;
  case 'falseStart':{ await typingFor(1400);await sleep(900);break}
  case 'div': await timeJump(v);push({k:'div',text:v});await sleep(300);break;
  case 'sys': push({k:'sys',text:v});await sleep(500);break;
  case 'offline':{ $('#chStat').textContent=v;await sleep(400);break}
  case 'choice':{
    const inScene=$('#scene').classList.contains('on');
    const i=await choose(v.opts,v.hint,inScene);const o=v.opts[i];
    if(v.flag)S.flags[v.flag]=o.v!==undefined?o.v:'ABC'[i];
    if(!inScene){ if(o.send)await outgoing(Object.assign({k:'text',text:o.send},o.re?{re:reOf(o.re)}:{}));else if(o.sticker)await outgoing({k:'sticker',art:o.sticker});else if(o.photo)await outgoing({k:'photo',art:o.photo}); }
    else if(o.say){ await dialog('Min',o.say,'min') }
    if(o.then)await run(o.then);break}
  case 'draft':{
    let text=v.text;
    if(v.opts){const i=await choose(v.opts.map(t=>({label:t})),v.hint);text=v.opts[i];if(v.flag)S.flags[v.flag]='ABC'[i]}
    await typeField(text);
    if(v.auto){await sleep(2400);await hesitate(text);await sleep(1100);if(v.keep!==false)addUnsent(text,v.when);await sleep(1500);break}
    tray(`<div class="dbtns">${v.only==='send'?'':`<button class="del">${IC.trash}Delete</button>`}<button class="snd">${IC.send}Send</button></div>`);
    const send=await new Promise(r=>{const d=$('#tray .del');if(d)d.onclick=e=>{e.stopPropagation();r(false)};$('#tray .snd').onclick=e=>{e.stopPropagation();r(true)}});
    tray('');
    if(send){setField('');push({k:'text',dir:'out',text});Audio_.blip(true);await sleep(500);if(v.flag)S.flags[v.flag]=true;if(v.onSend)await run(v.onSend)}
    else{await backspace(text);addUnsent(text,v.when);if(v.flag)S.flags[v.flag]=false;await sleep(700);if(v.onDelete)await run(v.onDelete)}
    break}
  case 'scene':{ await holdChat();S.amb=v.amb!==undefined?v.amb:AMB_ART[v.art];$('#sart').innerHTML=SCENE[v.art];S.k=0;$('#scap').textContent=v.cap||'';$('#dlg').innerHTML='';show('scene');if(v.rain!==undefined)setRain(v.rain);await sleep(1100);break}
  case 'shot':{ const a=$('#sart');const old=[...a.children];a.insertAdjacentHTML('beforeend',SCENE[v]);const n=a.lastElementChild;S.k=(S.k||0)+1;if(S.k%2)n.classList.add('k2');n.classList.add('in');requestAnimationFrame(()=>requestAnimationFrame(()=>n.classList.remove('in')));setTimeout(()=>old.forEach(o=>o.remove()),1000);await rawSleep(450);break}
  case 'say': await dialog(v[0],v[1]);break;
  case 'min': await dialog('Min',v,'min');break;
  case 'narr': if($('#chat').classList.contains('on'))await chatNarr(v);else await dialog('',v,'narr');break;
  case 'title':{ S.day=(S.day||0)+1;S.now=null;{const o=(s0&&s0.title)||v;const y=ymFrom((o.small||'')+' '+(o.big||''));if(y!=null)S.ym=y} await holdChat();const t=$('#title');$('#tTap').classList.remove('on');
    if(t.classList.contains('on')){t.classList.add('swap');await rawSleep(700);$('#tBig').innerHTML=v.big;$('#tSmall').textContent=v.small||'';t.classList.remove('swap');if(v.rain!==undefined)setRain(v.rain);await rawSleep(1600);}
    else{$('#tBig').innerHTML=v.big;$('#tSmall').textContent=v.small||'';t.classList.add('on');await rawSleep(1000);$('#viewer').classList.remove('on','zoom');show('');if(v.rain!==undefined)setRain(v.rain);await rawSleep(1400);}
    if(v.time)setTime(v.time);    $('#tTap').classList.add('on');await waitStage(0);$('#tTap').classList.remove('on');
    if(!v.keep){t.classList.remove('on');await rawSleep(900);}break}
  case 'scrollback': await scrollBack();break;
  case 'gallery': await gallery();break;
  case 'reset': S.threads=trStep({t:v()}).t;break;
  case 'end': endCard(v);await new Promise(()=>{});break;
  case 'if': await run(v.test(S.flags)?v.then:(v.else||[]));break;
  }
}


