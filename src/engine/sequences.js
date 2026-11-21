/* ============ SPECIAL SEQUENCES ============ */
// A tappable hint that also accepts a tap anywhere in the chat (after a moment) and, for scrolling back, a pull-down or scroll-up.
function ctaWait(html,tip,swipe){return new Promise(r=>{const ch=$('#chat'),h=document.createElement('button');h.type='button';h.className='uphint cta';h.innerHTML=html+'<span class="tip">'+tip+'</span>';ch.appendChild(h);
  let y0=null,fin=false;const any=e=>{if(e.target.closest('.ch')||e.target===h||h.contains(e.target))return;e.stopPropagation();e.preventDefault();done()},
  wh=e=>{if(swipe&&e.deltaY<-8)done()},ts=e=>{y0=e.touches[0].clientY},tm=e=>{if(swipe&&y0!==null&&e.touches[0].clientY-y0>36)done()};
  const t1=setTimeout(()=>ch.addEventListener('click',any,true),1800),t2=setTimeout(()=>h.classList.add('nudge'),5000);
  function done(){if(fin)return;fin=true;clearTimeout(t1);clearTimeout(t2);ch.removeEventListener('click',any,true);ch.removeEventListener('wheel',wh);ch.removeEventListener('touchstart',ts);ch.removeEventListener('touchmove',tm);h.remove();r()}
  h.addEventListener('click',e=>{e.stopPropagation();done()});ch.addEventListener('wheel',wh,{passive:true});ch.addEventListener('touchstart',ts,{passive:true});ch.addEventListener('touchmove',tm,{passive:true});setTimeout(()=>h.focus({preventScroll:true}),50)})}
async function scrollBack(){
  await rawSleep(200);await ctaWait(IC.up+'Tap to read older messages','Or pull down to scroll back',true);
  const sc=$('#scroll'),col=$('#scol'),fl=$('#flash');
  col.innerHTML=Array.from({length:140},(_,i)=>`<i class="${(i*7)%3===0?'o':''}" style="width:${35+((i*37)%45)}%"></i>`).join('');
  {const ch=$('#chat'),cr=ch.getBoundingClientRect(),hd=ch.querySelector('.ch'),ft=ch.querySelector('.foot'),k=cr.height/ch.offsetHeight||1;
   if(hd)sc.style.top=Math.round((hd.getBoundingClientRect().bottom-cr.top)/k)+'px';if(ft)sc.style.bottom=Math.round((cr.bottom-ft.getBoundingClientRect().top)/k)+'px';}
  col.style.transition='none';col.style.transform='translateY(0)';sc.classList.add('on');await rawSleep(80);
  col.style.transition='transform 7s cubic-bezier(.3,.1,.3,1),opacity .5s';col.style.transform='translateY(5600px)';
  const fd=d=>`<div class="fdate">${d}</div>`;
  const flashes=[`<div class="fwrap">${fd('Aug 2020')}<div class="call">${IC.phoneX}Missed voice call</div></div>`,`<div class="fwrap">${fd('Mar 2019')}<div class="call">${IC.phone}Voice call · 2:14:07</div></div>`,`<div class="fwrap">${fd('Jun 2018')}<div class="row in" style="width:100%;padding:0 16px;box-sizing:border-box"><div class="b">${S.lang==='my'&&MY_STORY[1]?(MY_STORY[1]['goodnight umbrella thief']||'goodnight umbrella thief'):'goodnight umbrella thief'}</div></div></div>`];
  for(const [i,f] of flashes.entries()){await rawSleep(1500);fl.innerHTML=f;fl.classList.add('on');sc.classList.add('fl');await rawSleep(1100);if(i<flashes.length-1){fl.classList.remove('on');sc.classList.remove('fl')}}
  await rawSleep(1600);
  await ctaWait('<span class="ic i-images"></span>Tap to open Photos','Or tap anywhere to continue',false);
  sc.classList.remove('on');$('#older').classList.remove('on');setTimeout(()=>{fl.classList.remove('on');sc.classList.remove('fl')},400);}
async function gallery(){
  const g=$('#ggrid');const hues=[30,200,15,90,340,180,50,260,120,10,300,160,45,220,70];
  g.innerHTML=hues.map((h,i)=>`<div class="${i===4?'hot':''}">${i===4?ART.thingyan:ART.thumb(h,28)}</div>`).join('');
  show('gallery');await sleep(600);await waitClick(g.querySelector('.hot'));
  const v=$('#viewer');$('#vimg').innerHTML=ART.thingyan;$('#vdet').textContent='13 April 2019 · 3:26 PM';v.classList.add('on');
  $('#status').classList.add('light');
  const vt=$('#vtap');setTimeout(()=>vt.classList.add('on'),1800);
  await Promise.race([waitStage(600),rawSleep(6500)]);vt.classList.remove('on');
  setRain(3);v.classList.add('zoom');await rawSleep(2700);}
const pwT=t=>{const D=S.lang==='my'&&MY_STORY[2];return D&&D[t]||t};
