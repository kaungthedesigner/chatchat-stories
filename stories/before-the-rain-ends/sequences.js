/* ===== A photo opened from a notification, with actions in place of Like (Ch5 profile photo, the 2023 memory) ===== */
async function photoActs(v){
  await holdChat();renderList(liveRows(R4({}),null),null);show('list');await sleep(800);
  await banner(v.c,C[v.c].name,v.banner);
  $('#postBody').innerHTML=postBody(v,false);$('#postBody').scrollTop=0;$('#postTray').innerHTML='';
  $('#post .who b').textContent=v.head||'Post';show('post');await sleep(1300);
  await showCmts(fv(v.cmts),800);await sleep(400);
  const i=await trayPick(v.opts.map(o=>o.label));const o=v.opts[i];if(v.flag)S.flags[v.flag]='ABC'[i];
  if(o.set)Object.assign(S.flags,o.set);
  const pi=$('#postBody .pi');
  if(o.fx==='zoom'&&pi){$('#postBody').scrollTo({top:0,behavior:'smooth'});pi.classList.add('zoom');await sleep(1800)}
  /* Phone face down / app closed: the whole screen fades to near-black and holds a moment before Min's line */
  if(o.fx==='dark'){let dk=$('#postDark');if(!dk){dk=document.createElement('div');dk.id='postDark';$('#post').appendChild(dk)}
    requestAnimationFrame(()=>dk.classList.add('on'));await sleep(2600)}
  if(o.more)await showCmts(o.more,1100);
  /* Min's thoughts sit on a dark card over the post, like scene narration, so they never read as a comment */
  let shown=false,nar=$('#postNar');if(!nar){nar=document.createElement('div');nar.id='postNar';$('#post').appendChild(nar)}
  const note=async t=>{const pb=$('#postBody');pb.style.paddingBottom='130px';pb.scrollTo({top:9999,behavior:'smooth'});if(nar.classList.contains('on')){nar.classList.remove('on');await rawSleep(350)}nar.textContent=t;nar.classList.add('on');await rawSleep(700);
    /* each line stays until the player taps, so nobody misses the first one */
    $('#postTray').innerHTML='<div class="vtap2">Tap to continue</div>';await waitStage(200);$('#postTray').innerHTML='';shown=true};
  if(o.chat){for(const t of fv(v.after)||[])await note(t);nar.classList.remove('on');$('#postBody').style.paddingBottom='';
    await scrollFirst(o.chat);S._sf=1;for(const t of fv(o.notes)||[])await chatNarr(t);return}
  for(const t of fv(o.notes)||[])await note(t);
  for(const t of fv(v.after)||[])await note(t);
  if(!shown){$('#postTray').innerHTML='<div class="vtap2">Tap to continue</div>';await waitStage(300);$('#postTray').innerHTML=''}$('#post .who b').textContent='Post';nar.classList.remove('on');$('#postBody').style.paddingBottom='';
}
/* ===== Let go: Min posts a photo of the rain, and May likes it ===== */
async function minPost(v){
  await holdChat();$('#postBody').innerHTML=postBody(v,false);$('#postBody').scrollTop=0;$('#postLk').textContent='No likes yet';$('#postTray').innerHTML='';
  $('#post .who b').textContent='New post';show('post');await sleep(1500);
  $('#postTray').innerHTML='<div class="tray"><button class="opt"><span>Post</span></button></div>';await waitClick($('#postTray .opt'));$('#postTray').innerHTML='';
  $('#post .who b').textContent='Post';Audio_.blip(true);await sleep(3200);
  await banner('may','May Thiri','liked your photo');$('#post .hrt').classList.add('on');$('#postLk').textContent='Liked by May Thiri';await sleep(2000);
  $('#postTray').innerHTML='<div class="vtap2">Tap to continue</div>';await waitStage(300);$('#postTray').innerHTML='';
}
/* ===== Epilogue lock screen: a notice lights the phone ===== */
async function lockEp(v){await holdChat();$('#wall').innerHTML=EP_WALL;$('#lockDate').textContent=v.date;$('#lockTime').textContent=v.time;const n=$('#lkNote');n.classList.remove('on');n.innerHTML='';show('lock');
  await rawSleep(1800);n.innerHTML=`<small>${esc(v.from)} · now</small><b>${esc(v.text)}</b>`;n.classList.add('on');Audio_.blip(false);await rawSleep(1800);await swipeUp();n.classList.remove('on')}
/* ===== The ending: Min scrolls May's chat all the way back to her first message ===== */
/* Min's thoughts while a chat is open: a dark card over the chat, waits for a tap */
async function chatNarr(t){let n=$('#chatNar');if(!n){n=document.createElement('div');n.id='chatNar';$('#chat').appendChild(n)}
  n.innerHTML=`${esc(t)}<small>Tap to continue</small>`;await rawSleep(30);n.classList.add('on');await rawSleep(500);await waitStage(200);n.classList.remove('on');await rawSleep(300)}
async function scrollFirst(stat){const T=t=>S.lang==='my'&&MY_STORY[1]&&MY_STORY[1][t]||t;const th=(S.threads.may=S.threads.may||[]);
  if(!th.some(m=>m.text==='hey 👋'||m.text===T('hey 👋')))th.unshift({k:'div',text:'Jun 2018'},{k:'text',dir:'in',text:T('hey 👋')},{k:'text',dir:'in',text:T('I think you took my umbrella 👀')});
  openChat('may',stat);await sleep(900);const target=msgs.querySelector('.row.in');const from=msgs.scrollTop,D=4500/S.speed,t0=performance.now();
  await new Promise(r=>{(function f(){const k=Math.min(1,(performance.now()-t0)/D),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;msgs.scrollTop=from*(1-e);if(k<1)requestAnimationFrame(f);else r()})()});
  if(target)target.classList.add('glow');await sleep(2600);if(target)target.classList.remove('glow')}
