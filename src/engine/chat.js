/* ============ CHAT ============ */
const msgs=$('#msgs');
function scrollDown(){requestAnimationFrame(()=>{msgs.scrollTop=msgs.scrollHeight})}
function el(m,prev){
  const d=document.createElement('div');
  if(m.k==='div'){d.className='div';d.textContent=m.text;return d}
  if(m.k==='sys'){d.className='sys';d.textContent=m.text;return d}
  if(m.k==='call'){d.className='call';d.innerHTML=(m.missed?IC.phoneX:IC.phone)+esc(m.text);return d}
  if(m.k==='rcpt'){d.className='rcpt';d.textContent=m.text;return d}
  d.className='row '+m.dir+(prev&&prev.dir!==m.dir?' gap':'');
  if(m.k==='text'){d.innerHTML=`<div class="b">${m.re?`<span class="rq" role="button" tabindex="0" aria-label="Replying to ${esc(m.re.who)}: ${esc(m.re.q)}"><b>${esc(m.re.who)}</b><span>${esc(m.re.q)}</span></span>`:''}${esc(m.text)}</div>`}
  if(m.k==='photo'){d.innerHTML=`<div class="b photo">${ART[m.art]&&typeof ART[m.art]==='function'?ART[m.art]():ART[m.art]}</div>`}
  if(m.k==='sticker'){d.innerHTML=ART.STK[m.art]}
  if(m.k==='link'){const L=LINKS[m.id];d.innerHTML=`<div class="b lnk"><a href="${L.url}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><div class="lt"><div class="lg">${L.badge}</div><div><b>${esc(L.title)}</b><small>${esc(L.domain)}</small></div></div><ul>${L.points.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></a></div>`}
  if(m.k==='loc'){d.innerHTML=`<div class="b loc"><div class="lm">${MAP_LOC}</div><div class="lt"><b>${esc(m.place)}</b><small>${esc(m.area)} · Shared location</small></div></div>`}
  if(m.k==='voice'){d.innerHTML=`<div class="b"><div class="voice"><div class="pl">${IC.play}</div><div class="wv">${Array.from({length:26},(_,i)=>`<i style="height:${20+Math.abs(Math.sin(i*1.7))*70}%"></i>`).join('')}</div><small>${m.text}</small></div>${m.tr?`<div class="vtr">${m.tr[0]==='('?esc(m.tr):'“'+esc(m.tr)+'”'}</div>`:''}</div>`}
  d._m=m;rxPaint(d,m);
  return d;
}
const MAP_LOC='<svg viewBox="0 0 240 132" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="240" height="132" fill="#ECE5D6"/><path d="M-4 96 C40 88 70 104 110 92 S190 70 244 80 L244 132 L-4 132Z" fill="#DCE6DA"/><path d="M58 -4 C64 30 52 58 70 84 S92 120 86 136" fill="none" stroke="#A9C6D3" stroke-width="7" stroke-linecap="round"/><g fill="none" stroke="#fff" stroke-linecap="round"><path d="M-4 52 L244 40" stroke-width="6"/><path d="M150 -4 L136 136" stroke-width="5"/><path d="M96 -4 C104 40 118 70 120 136" stroke-width="3"/><path d="M168 44 L244 96" stroke-width="3"/><path d="M-4 20 L80 30" stroke-width="3"/></g><g fill="#D9D0BE"><rect x="164" y="8" width="22" height="16" rx="2"/><rect x="194" y="12" width="28" height="18" rx="2"/><rect x="112" y="98" width="16" height="14" rx="2"/><rect x="176" y="60" width="18" height="14" rx="2"/><rect x="20" y="60" width="20" height="14" rx="2"/></g><circle cx="143" cy="54" r="15" fill="#2F6F66" opacity=".16"/><path d="M143 56c-6.5-7.2-10-12.4-10-17a10 10 0 0 1 20 0c0 4.6-3.5 9.8-10 17z" fill="#C2553D" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><circle cx="143" cy="38.5" r="3.6" fill="#fff"/></svg>';
function renderThread(){msgs.innerHTML='';const th=S.threads[S.contact]||[];let prev=null;
  th.forEach(m=>{msgs.appendChild(el(m,prev));if(m.dir)prev=m});
  const lo=[...th].reverse().find(m=>m.dir);if(lo&&lo.dir==='out'&&lo.rc){const r=el({k:'rcpt',text:lo.rc});r.id='rc';msgs.appendChild(r)}
  scrollDown();}
/* ===== Reactions. Hold a message from someone else (450 ms), double-click or right-click it to react. A reaction the story set is locked: the player can't change it. ===== */
const REACTIONS=['❤️','😂','😮','😢','🙏','👍'];
function rxPaint(d,m){const b=d.querySelector('.b')||d.querySelector('.stk');if(!b)return;const old=b.querySelector('.rx');if(old)old.remove();d.classList.toggle('hasrx',!!m.rx);
  if(m.rx){if(m.rx==='♥')m.rx='❤️';b.insertAdjacentHTML('beforeend',`<span class="rx${m.rxMe?' mine':''}" aria-label="Reaction ${m.rx}">${m.rx}</span>`)}}
let rxSwallow=false,rxT=null;
function rxClose(){const b=$('#rxBar');if(b)b.remove();document.querySelectorAll('.b.held').forEach(x=>x.classList.remove('held'))}
function rxOpen(row){const m=row._m;if(!m||m.dir!=='in'||(m.rx&&!m.rxMe))return;rxClose();
  const ch=$('#chat'),cr=ch.getBoundingClientRect(),k=cr.height/ch.offsetHeight||1,b=row.querySelector('.b')||row.firstElementChild,br=b.getBoundingClientRect();
  const bar=document.createElement('div');bar.id='rxBar';bar.setAttribute('role','toolbar');bar.setAttribute('aria-label','React to message');
  bar.innerHTML=REACTIONS.map(e=>`<button type="button" class="${m.rx===e?'on':''}" aria-pressed="${m.rx===e}" aria-label="React ${e}">${e}</button>`).join('');
  ch.appendChild(bar);const W=bar.offsetWidth,H=bar.offsetHeight;
  let top=(br.top-cr.top)/k-H-8;if(top<60)top=(br.bottom-cr.top)/k+8;
  bar.style.top=top+'px';bar.style.left=Math.max(8,Math.min(ch.offsetWidth-W-8,(br.left-cr.left)/k))+'px';
  b.classList.add('held');Audio_.blip(false);
  bar.querySelectorAll('button').forEach((x,i)=>x.addEventListener('click',e=>{e.stopPropagation();const em=REACTIONS[i];
    if(m.rx===em){delete m.rx;delete m.rxMe}else{m.rx=em;m.rxMe=true}rxPaint(row,m);Audio_.blip(true);rxClose();
    try{if(!localStorage.getItem('tib-rx-hint'))localStorage.setItem('tib-rx-hint','1')}catch(_){ }}));}
(()=>{const ms=$('#msgs');
  const rowOf=e=>{const r=e.target.closest('.row.in');return r&&r._m&&r._m.dir==='in'&&!(r._m.rx&&!r._m.rxMe)?r:null};
  ms.addEventListener('pointerdown',e=>{const r=rowOf(e);if(!r||!e.target.closest('.b,.stk'))return;clearTimeout(rxT);rxT=setTimeout(()=>{rxSwallow=true;rxOpen(r)},450)});
  ['pointerup','pointercancel','pointerleave'].forEach(t=>ms.addEventListener(t,()=>clearTimeout(rxT)));
  ms.addEventListener('scroll',()=>clearTimeout(rxT),{passive:true});
  ms.addEventListener('dblclick',e=>{const r=rowOf(e);if(r){e.stopPropagation();rxOpen(r)}});
  ms.addEventListener('contextmenu',e=>{const r=rowOf(e);if(r){e.preventDefault();rxSwallow=true;rxOpen(r)}});
  // a tap that ends a hold, or one that closes the picker, never also moves the story on
  document.addEventListener('click',e=>{if(rxSwallow){rxSwallow=false;e.stopPropagation();e.preventDefault();return}
    const bar=$('#rxBar');if(bar&&!bar.contains(e.target)){rxClose();e.stopPropagation();e.preventDefault()}},true);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#rxBar'))rxClose()},true);})();
function rxHint(){try{if(localStorage.getItem('tib-rx-hint'))return;localStorage.setItem('tib-rx-hint','1')}catch(_){return}setTimeout(()=>toast('Press and hold a message to react'),600)}
function push(m,c=S.contact){if(S.langSwitched){storyMaps();['text','cap'].forEach(k=>{if(m[k])m[k]=swapT(m[k])});if(m.re&&m.re.q)m.re.q=swapT(m.re.q)}
  if(m.dir&&!m.st){const lab=stampDiv(c);if(lab)push({k:'div',text:lab},c);m.st={d:S.day||0,n:S.now||0}}(S.threads[c]=S.threads[c]||[]).push(m);
  if(c===S.contact&&$('#chat').classList.contains('on')){const th=S.threads[c];const prev=[...th].slice(0,-1).reverse().find(x=>x.dir);
    const r=$('#rc');if(r&&m.dir)r.remove();msgs.appendChild(el(m,prev));if(m.dir==='out'){m.rc='Sent';const rc=el({k:'rcpt',text:'Sent'});rc.id='rc';msgs.appendChild(rc)}scrollDown();}}
function markSeen(){const th=S.threads[S.contact]||[];const lo=[...th].reverse().find(m=>m.dir);if(lo&&lo.dir==='out'){lo.rc='Seen';const r=$('#rc');if(r)r.textContent='Seen'}}
function openChat(c,stat){S.contact=c;$('#chAv').innerHTML=av(c,true);$('#chName').textContent=C[c].name;$('#chStat').textContent=stat||'Active now';show('chat');renderThread();}
async function typingFor(ms){markSeen();const t=document.createElement('div');t.className='row in gap';t.innerHTML='<div class="b typing"><i></i><i></i><i></i></div>';msgs.appendChild(t);scrollDown();await sleep(ms);t.remove();}
async function incoming(m){if(!S.rxHinted){S.rxHinted=1;rxHint()}const len=(m.text||'').length;const dur=m.k==='text'?Math.min(2300,Math.max(650,380+len*30)):1300;
  await typingFor(dur);push(Object.assign({dir:'in'},m));Audio_.blip(false);await sleep(m.k==='text'?Math.min(1800,600+len*22):900);}
const field=$('#field'),sendic=$('#sendic');
function setField(t,cursor){field.innerHTML=t?esc(t)+(cursor?'<span class="cur"></span>':''):'<span class="ph">Message</span>';sendic.classList.toggle('on',!!t);field.classList.toggle('multi',!!t&&field.scrollHeight>44);}
async function typeField(t){for(let i=1;i<=t.length;i++){setField(t.slice(0,i),true);await rawSleep(Math.max(8,24/S.speed))}}
async function hesitate(t){const cut=Math.max(0,t.lastIndexOf(' ',t.length-2));
  for(let i=t.length-1;i>=cut;i--){setField(t.slice(0,i),true);await rawSleep(Math.max(20,90/S.speed))}
  await sleep(900);
  for(let i=cut-1;i>=0;i--){setField(t.slice(0,i),true);await rawSleep(Math.max(14,55/S.speed))}setField('');}
async function backspace(t){for(let i=t.length-1;i>=0;i--){setField(t.slice(0,i),true);await rawSleep(Math.max(10,38/S.speed))}setField('');}
/* ===== Quoted replies: a message can quote an earlier one in the same chat (who = "You" for Min's own lines, else the sender's first name). Tapping the quote jumps to the original. ===== */
function reOf(q){const th=S.threads[S.contact]||[];const o=[...th].reverse().find(x=>x.k==='text'&&x.text===q);
  return {q,who:o&&o.dir==='out'?'You':(C[S.contact]&&C[S.contact].name||'').split(' ')[0]}}
function reBar(re){const f=$('.foot');let b=$('#rebar');if(!re){if(b)b.remove();return}
  if(!b){b=document.createElement('div');b.id='rebar';b.className='rebar';f.insertBefore(b,f.querySelector('.comp'))}
  b.innerHTML=`<b>Replying to ${re.who==='You'?'yourself':esc(re.who)}</b><span>${esc(re.q)}</span>`;scrollDown()}
(()=>{const ms=$('#msgs');const go=e=>{const q=e.target.closest('.rq');if(!q)return false;e.stopPropagation();e.preventDefault();
  const row=q.closest('.row');const m=row&&row._m;if(!m||!m.re)return true;
  const t=[...ms.querySelectorAll('.row')].find(r=>r!==row&&r._m&&r._m.k==='text'&&r._m.text===m.re.q);
  if(t){const b=t.querySelector('.b');t.scrollIntoView({block:'center',behavior:'smooth'});b.classList.add('flashq');setTimeout(()=>b.classList.remove('flashq'),1200)}return true};
  ms.addEventListener('click',go,true);ms.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest('.rq'))go(e)});})();
async function outgoing(m){if(S.langSwitched&&m.text){storyMaps();m.text=swapT(m.text)}if(m.re)reBar(m.re);if(m.k==='text'){await typeField(m.text);await rawSleep(220)}reBar(null);setField('');push(Object.assign({dir:'out'},m));Audio_.blip(true);await sleep(450);}
function tray(html){$('#tray').innerHTML=html;scrollDown();}
function choose(opts,hint,scene){return new Promise(res=>{
  const wrap=scene?$('#dlg'):$('#tray');
  const h=(scene?'':'')+ (hint?`<div class="${scene?'lbl':'hint'}">${hint}</div>`:'')+opts.map((o,i)=>`<button class="opt${(o.act||/^\s*[(（]/.test(o.label))?' act':''}${o.ph?' ph':''}" data-i="${i}">${o.ph?'<span class="thw">'+(typeof ART[o.ph]==='function'?ART[o.ph]():ART[o.ph])+'</span>':''}<span>${esc(o.label)}</span></button>`).join('');
  if(scene){const keep=[...wrap.querySelectorAll('.nm,.tx')].map(e=>e.outerHTML).join('');wrap.innerHTML=keep+`<div class="opts" style="margin-top:14px">${h}</div>`}else{wrap.innerHTML=`<div class="tray">${h}</div>`;scrollDown()}
  wrap.querySelectorAll('.opt.ph .thw .shotc').forEach(d=>{const m=(d.style.aspectRatio||'4/3').split('/').map(Number);const r=m[0]/(m[1]||1);if(r>4/3){d.style.height='48px';d.style.width=(48*r)+'px'}else{d.style.width='64px';d.style.height=(64/r)+'px'}});
  wrap.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();wrap.innerHTML='';res(+b.dataset.i)}));});}

