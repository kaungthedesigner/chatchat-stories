function addMem(id){if(S.memories.includes(id))return;S.memories.push(id);toast(S.lang==='my'?`အမှတ်တရ သိမ်းပြီး · <b>${SH[MEM_INFO[id].t]||MEM_INFO[id].t}</b>`:`Memory kept · <b>${MEM_INFO[id].t}</b>`)}
function addUnsent(text,when){S.unsent.push({text,when});toast(S.lang==='my'?`မပို့ဖြစ် · <b>အမှတ်တရများ</b> ထဲ သိမ်းထားတယ်`:`Not sent · kept in <b>Memories</b>`)}
function memCards(all,only){const ids=Object.keys(MEM_INFO);return ids.map(id=>{const m=MEM_INFO[id],has=S.memories.includes(id);if(!has&&!all)return '';if(only==='kept'&&!has||only==='other'&&has)return '';
  const pic=has?(m.art?(typeof ART[m.art]==='function'?ART[m.art]():ART[m.art]):`<div class="ph">${IC[m.icon]}</div>`):`<div class="ph"></div>`;
  return `<div class="mcard${has?'':' lock'}">${pic}<div class="c">${has?m.t:'Another path'}<span>${has?m.ty:'Not chosen'}</span></div></div>`}).join('')}
function unsentHTML(){return `<div class="unsent"><h3>Unsent</h3>${S.unsent.length?S.unsent.map((u,i)=>`<div class="u"><span>“${esc(u.text)}”</span><small>#${i+1} · ${u.when}</small></div>`).join(''):'<p class="e">Nothing yet. Every message you choose not to send will be kept here.</p>'}</div>`}
$('#bAlbum').onclick=()=>{const a=$('#album');if(a.classList.contains('on')){a.classList.remove('on');return}
  a.innerHTML=`<button class="icbtn x" id="ax" aria-label="Close">${IC.x}</button><h2>Memories</h2><div class="mgrid">${memCards(false)||'<p style="color:#7b858c;font-size:14px;grid-column:1/-1">Photos, notes and keepsakes you find will appear here.</p>'}</div>${unsentHTML()}`;
  a.classList.add('on');
  $('#ax').onclick=e=>{e.stopPropagation();a.classList.remove('on')};};
/* The sound button shows On only while sound is really playing. Until the browser lets audio start (the first tap), it shows Off. */
$('#bSound').onclick=()=>{Audio_.init();const c=Audio_.ctx;if(!c)return;
  if(c.state!=='running'){S.sound=true;startAudio();return} /* locked: this tap turns it on */
  S.sound=!S.sound;if(!S.sound)Audio_.songStop(200);sndSync()};
$('#bSpeed').onclick=e=>{e.stopPropagation();S.speed=S.speed===2?1:2;const on=S.speed===2;$('#bSpeed').classList.toggle('on',on);$('#bSpeed').setAttribute('aria-pressed',on)};


