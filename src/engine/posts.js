/* ============ POSTS ============ */
const HEART='<svg viewBox="0 0 256 256"><path d="M128,216S28,160,28,92A52,52,0,0,1,128,72h0A52,52,0,0,1,228,92C228,160,128,216,128,216Z"/></svg>';
const BUBBLE='<svg viewBox="0 0 256 256"><path d="M79.93,211.11a96,96,0,1,0-35-35h0L32.42,213.46a8,8,0,0,0,10.12,10.12l37.39-12.47Z"/></svg>';
async function profileStep(v){
  await holdChat();const c=v.c;
  const img=src=>`<i><img src="${src}" alt="" draggable="false"></i>`;
  const tiles=`<i class="txt"><span>${esc(v.text)}</span><small>${esc(v.when)}</small></i>`+(v.grid||[]).map(img).join('');
  $('#postBody').innerHTML=`<div class="prof">
     <div class="ptop">${av(c)}<div class="nums"><div><b>${v.posts}</b><small>posts</small></div><div><b>${v.friends}</b><small>friends</small></div></div></div>
     <b class="pn">${esc(C[c].name)}</b><p class="bio">${esc(v.bio||'')}</p><span class="act">${esc(v.stat||'')}</span>
     <div class="pbtn"><span>Friends</span><span>Message</span></div></div>
   <div class="ptabs"><b>Posts</b></div><div class="pgrid">${tiles}</div>`;
  $('#post .who b').textContent=C[c].name;$('#postTray').innerHTML='';$('#postBody').scrollTop=0;show('post');await sleep(1200);
  $('#postTray').innerHTML='<div class="vtap2">Tap to continue</div>';await waitStage(300);$('#postTray').innerHTML='';
  $('#post .who b').textContent='Post';if(v.back)show('chat');await sleep(500);
}
const LINKS={sbtv:{url:'https://www.watchsbtv.com/',domain:'watchsbtv.com',title:'SBTV · Football, all in one place',badge:'<img src="img/sbtv-logo.webp?v=2611161" alt="SBTV">',
  points:['Watch every football match and the highlights in one place','Weekly predictions on the big matches earn SBTV Coins','Redeem your coins for lucky draws and rewards']}};
const fv=(x)=>{if(typeof x!=='function')return x;const r=x(S.flags),D=S.lang==='my'&&MY_STORY[S.ch];return trS(r,D||{})};
const artHTML=a=>typeof ART[a]==='function'?ART[a]():ART[a];
const cmtHTML=c=>c.del?`<div class="cm del">${esc(c.del)} deleted a comment</div>`:`<div class="cm${c.me?' me':''}"><b>${esc(c.n)}</b>${esc(c.t)}</div>`;
function postBody(v,tag){const art=fv(v.art),text=fv(v.text);
  return `<div class="pa">${av(v.c,true)}<div><p class="pwho"><b>${esc(C[v.c].name)}</b>${v.act?` ${esc(v.act)}`:''}</p><span>${tag?'with Min Htet':esc(v.place||'')}</span></div></div>
   ${art?`<div class="pi${v.sq?' sq':''}"${v.zo?` style="--zo:${v.zo}"`:''}>${artHTML(art)}</div>`:`<div class="ptx">${v.mention?`<span class="mtn">@${esc(v.mention)}</span> `:''}${esc(text)}</div>`}
   <div class="acts"><span class="hrt">${HEART}</span><span>${BUBBLE}</span></div>
   <div class="lk" id="postLk">Liked by ${esc(v.likes)}</div>
   ${art?`<div class="cap"><b>${esc(v.handle||C[v.c].name.split(' ')[0].toLowerCase())}</b>${esc(fv(v.cap))}</div>`:''}
   <div class="cms" id="postCms"></div>
   <div class="when">${esc(v.when||'')}</div>`}
async function showCmts(list,gap){for(const c of list||[]){$('#postCms').insertAdjacentHTML('beforeend',cmtHTML(c));$('#postBody').scrollTo({top:9999,behavior:'smooth'});await sleep(gap||650)}}
function trayPick(labels){return new Promise(res=>{$('#postTray').innerHTML=`<div class="tray">${labels.map((o,i)=>`<button class="opt" data-i="${i}"><span>${esc(o)}</span></button>`).join('')}</div>`;requestAnimationFrame(()=>{const pb=$('#postBody');pb.scrollTop=pb.scrollHeight});
  $('#postTray').querySelectorAll('.opt').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();$('#postTray').innerHTML='';res(+b.dataset.i)}))})}
/* Before the post's option sheet opens: if the sheet would cover part of the post, scroll the post from the top down to the comments first so the player can read it, then open the sheet */
function pbScroll(pb,to,ms){return new Promise(r=>{const from=pb.scrollTop,d=to-from;if(Math.abs(d)<4){r();return}const t0=performance.now();
  (function st(){const k=Math.min(1,(performance.now()-t0)/ms),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;pb.scrollTop=from+d*e;if(k<1)requestAnimationFrame(st);else r()})()})}
async function scanPost(n){const pb=$('#postBody');const trayH=26+n*54;
  if(pb.scrollHeight<=pb.clientHeight-trayH)return;
  const sp=Math.max(1,S.speed||1);
  if(pb.scrollTop>4){await pbScroll(pb,0,700/sp);await rawSleep(500/sp)}
  const end=pb.scrollHeight-pb.clientHeight;if(end<=4){await rawSleep(2000/sp);return}
  await pbScroll(pb,end,Math.min(4200,Math.max(1400,end*6))/sp);await rawSleep(900/sp)}
async function postStep(v){
  await holdChat();renderList(liveRows(v.rows,null),null);show('list');await sleep(900);
  const tag=fv(v.tag);
  await banner(v.c,C[v.c].name,tag?'tagged you in a photo':'posted a photo');
  $('#postBody').innerHTML=postBody(v,tag);$('#postBody').scrollTop=0;
  $('#postTray').innerHTML='';show('post');await sleep(1400);
  await showCmts(fv(v.cmts));await sleep(500);
  const co=fv(v.cOpts);await scanPost(co?3:2);
  const i=await trayPick((sp=>co?['Like','Comment',sp]:['Like',sp])(S.lang==='my'?'ကျော်သွားမယ်':'Scroll past'));
  const mode=i===0?'like':(co&&i===1)?'comment':'skip';
  if(v.flag)S.flags[v.flag]=mode==='like'?true:mode==='comment'?'c':false;
  if(mode==='like'){$('#post .hrt').classList.add('on');$('#postLk').textContent='Liked by you, '+v.likes;Audio_.blip(true);await sleep(1400)}
  else if(mode==='comment'){const j=await trayPick(co.map(o=>o.label));const o=co[j];if(v.cflag)S.flags[v.cflag]='ABC'[j];
    await showCmts([{n:'Min Htet',t:o.label,me:true}]);Audio_.blip(true);await sleep(1300);
    await showCmts(o.reply.map(r=>({n:r[0],t:r[1]})),1100);await sleep(1200)}
  else{$('#postBody').scrollTo({top:9999,behavior:'smooth'});await sleep(900)}
}
