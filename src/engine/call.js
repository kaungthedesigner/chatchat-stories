/* ===== Voice call: ring, a few lines, fast-forward, the goodbye, then a record in the chat ===== */
const fmtDur=sec=>{sec=Math.max(0,Math.round(sec));const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),x=sec%60;return (h?h+':'+String(m).padStart(2,'0'):m)+':'+String(x).padStart(2,'0')};
const parseDur=t=>t.split(':').map(Number).reduce((a,b)=>a*60+b,0);
async function callStep(v){const c=v.c,x=C[c],cv=$('#callv'),total=parseDur(v.dur);let el=0,tick=null;
  await sleep(500);
  $('#cName').textContent=x.name;$('#cAv').innerHTML=(x.img?`<img src="img/av-${c}.webp" alt="">`:`<div class="ini">${x.ini}</div>`)+'<i></i><i></i><i></i>';
  $('#cBg').style.backgroundImage=x.img?`url(img/av-${c}.webp)`:'none';$('#cCap').innerHTML='';$('#cTray').innerHTML='';cv.classList.remove('ff');
  const st=t=>$('#cSt').textContent=t;const ctl=h=>$('#cCtl').innerHTML=h;
  const btn=(cls,ic,lab,dis)=>`<button class="cb ${cls}"${dis?' disabled':''}><span class="k"><span class="ic i-${ic}"></span></span>${lab}</button>`;
  const inCall=(dis)=>btn('','microphone-slash','Mute',1)+btn('','speaker-high','Speaker',1)+btn('end','phone-disconnect','End',dis);
  show('callv');cv.classList.add('ring');
  let ringT;
  if(v.dir==='in'){st('Voice call');ctl(btn('dec','phone-x','Decline')+btn('acc','phone','Accept'));
    const ringLoop=()=>{Audio_.ring();ringT=setTimeout(ringLoop,2200)};ringLoop();
    for(;;){const a=await new Promise(r=>{$('#cCtl .acc').onclick=e=>{e.stopPropagation();r(1)};$('#cCtl .dec').onclick=e=>{e.stopPropagation();r(0)}});
      if(a)break; clearTimeout(ringT);S.flags[(v.flag||'call')+'_declined']=true;st('Declined');ctl('');await sleep(1600);st('Voice call');ctl(btn('dec','phone-x','Decline')+btn('acc','phone','Accept'));ringLoop()}
    clearTimeout(ringT);
  }else{st('Calling…');ctl(inCall(1));const rb=()=>{Audio_.ringback();ringT=setTimeout(rb,3000)};await sleep(500);rb();await sleep(1200);st('Ringing…');await sleep(v.rings||2600);clearTimeout(ringT)}
  cv.classList.remove('ring');Audio_.connect();ctl(inCall(1));
  const run1=()=>{tick=setInterval(()=>{el+=1;st(fmtDur(el))},1000/S.speed)};st('0:00');run1();
  const cap=$('#cCap');
  const say=async(l)=>{[...cap.children].forEach(n=>n.classList.add('old'));while(cap.children.length>2)cap.firstElementChild.remove();
    const d=document.createElement('div');let txt;
    if(l.nar){d.className='cl nar';txt=l.nar;d.textContent=txt}else{const me=!!l.out;txt=l.out||l.in;d.className='cl'+(me?' me':'');d.innerHTML=`<small>${me?'Min':esc(x.name.split(' ')[0])}</small>${esc(txt)}`}
    cap.appendChild(d);requestAnimationFrame(()=>requestAnimationFrame(()=>d.classList.add('on')));await sleep(Math.min(3200,900+txt.length*45))};
  const lines=async(arr)=>{for(const l of arr||[]){if(l.pick){const o=await callPick(l.pick);if(o.then)await lines(o.then)}else if(l.if){await lines(l.if.test(S.flags)?l.if.then:l.if.else)}else await say(l)}};
  const callPick=async(p)=>{const tr=$('#cTray');tr.innerHTML=(p.hint?`<div class="hint" style="color:rgba(251,247,239,.6)">${esc(p.hint)}</div>`:'')+p.opts.map((o,i)=>`<button class="opt" data-i="${i}"><span>${esc(o.label)}</span></button>`).join('');
    const i=await new Promise(r=>tr.querySelectorAll('.opt').forEach(b=>b.onclick=e=>{e.stopPropagation();r(+b.dataset.i)}));tr.innerHTML='';const o=p.opts[i];if(p.flag)S.flags[p.flag]='ABC'[i];if(o.say)await say({out:o.say});return o};
  await sleep(700);await lines(v.open);
  // fast-forward to the goodbye
  clearInterval(tick);const from=el,to=total-(v.byeSec||60),ffMs=3800;cv.classList.add('ff');Audio_.whirr(ffMs/1000/Math.max(1,S.speed/1.3));
  [...cap.children].forEach(n=>{n.classList.remove('on')});setTimeout(()=>cap.querySelectorAll('.cl').forEach(n=>n.remove()),350);
  const bits=v.ff||[];const t0=performance.now();let bi=0;
  await new Promise(res=>{const step=()=>{const k=Math.min(1,(performance.now()-t0)/(ffMs/Math.max(1,S.speed/1.3)));el=from+(to-from)*(k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2);st(fmtDur(el));
      if(bi<bits.length&&k>(bi+.4)/(bits.length+.6)){const b=document.createElement('div');b.className='cbit';b.textContent=bits[bi];b.style.left=(14+Math.random()*44)+'%';b.style.top=(20+Math.random()*50)+'%';cap.appendChild(b);setTimeout(()=>b.remove(),1600);bi++}
      if(k<1)requestAnimationFrame(step);else res()};requestAnimationFrame(step)});
  cv.classList.remove('ff');cap.querySelectorAll('.cl').forEach(n=>n.remove());run1();
  await lines(v.bye);
  if(v.by==='me'){ctl(inCall(0).replace('class="cb end"','class="cb end go"'));await new Promise(r=>{$('#cCtl .end').onclick=e=>{e.stopPropagation();r()}})}
  else await sleep(600);
  clearInterval(tick);st(fmtDur(total));Audio_.hangup();
  if(S.now!=null){let n=S.now+Math.round(total/60)+1,d=0;while(n>=1440){n-=1440;d++}const h=Math.floor(n/60),m=n%60;S.day=(S.day||0)+d;S.now=null;setTime(((h%12)||12)+':'+String(m).padStart(2,'0')+(h<12?' AM':' PM'));if(d)S.now=n}ctl(inCall(1));st('Call ended · '+fmtDur(total));await sleep(1700);
  show('chat');push({k:'call',dir:v.dir==='in'?'in':'out',text:'Voice call · '+v.dur});await sleep(900)}
async function glanceStep(v){
  await holdChat();renderList(liveRows(v.rows,null),null);show('list');await sleep(800);
  await banner(v.c,C[v.c].name,v.mention?'mentioned you in a post':'posted');
  $('#postBody').innerHTML=postBody(v,false);$('#postBody').scrollTop=0;$('#postTray').innerHTML='';show('post');await sleep(1300);
  await showCmts(fv(v.cmts),900);await sleep(600);
  $('#postTray').innerHTML='<div class="vtap2">Tap to continue</div>';await waitStage(200);$('#postTray').innerHTML='';
}
