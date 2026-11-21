async function waterStreet(){
  const V=$('#wstreet'),f=$('#wsField'),card=$('#wsCard'),hud=$('#wsHud');
  f.innerHTML='<img id="wsBg" src="img/ws-street.webp?v=2611161" alt="" draggable="false">';hud.style.display='none';
  show('wstreet');
  const cardShow=(html,btns)=>new Promise(res=>{card.innerHTML=html+'<div class="btns">'+btns.map((b,i)=>`<button id="${b[0]}" class="${i?'sec':''}">${b[1]}</button>`).join('')+'</div>';card.style.display='block';
    btns.forEach(b=>{$('#'+b[0]).onclick=e=>{e.stopPropagation();card.style.display='none';res(b[0])}})});
  Audio_.songLoad();
  await cardShow(`<div class="eb">Side quest · Water street</div><h2>Reach May before the song ends</h2><p>She's waiting at the far end of the street, by the pandal.</p>
    <ul><li><span class="th lr"><svg viewBox="0 0 150 144" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5.88134 77.4128C2.65825 74.2726 2.65825 69.0929 5.88134 65.9527L50.1351 22.8372C55.2041 17.8985 63.7178 21.4902 63.7178 28.5673L63.7178 114.798C63.7178 121.875 55.2041 125.467 50.1351 120.528L5.88134 77.4128Z" fill="#8F4630"/><path d="M144.117 77.4128C147.34 74.2726 147.34 69.0929 144.117 65.9527L99.863 22.8372C94.7939 17.8985 86.2803 21.4902 86.2803 28.5673L86.2803 114.798C86.2803 121.875 94.7939 125.467 99.863 120.528L144.117 77.4128Z" fill="#8F4630"/></svg></span><span><b>Tap left or right</b> of the screen to change lanes.</span></li>
    <li><span class="th" style="background-image:url(img/ws-pal1.webp?v=2611161)"></span><span><b>Tap friends to splash them</b> before they splash you. Getting wet is fine. It's Thingyan.</span></li>
    <li><span class="th tr" style="background-image:url(img/ws-truck.webp?v=2611161)"></span><span><b>Thura's truck drives down one lane</b> and that lane turns blue. Be in another lane when it reaches you. Three hits and Min's camera is ruined.</span></li></ul>`,[['wsStart','Start']]);
  let bag=false,fails=0,res;
  for(;;){res=await wsRun(bag);if(res.ok)break;fails++;
    const b=await cardShow(`<div class="eb">Camera soaked</div><h2>Thura got the camera</h2><p>Min needs it for a photo under the mango tree. Try that street again.</p>`,
      fails>=1&&!bag?[['wsRetry','Try again'],['wsBag','Wrap the camera in a plastic bag']]:[['wsRetry','Try again']]);
    if(b==='wsBag')bag=true;}
  S.flags.c3_ws_fails=fails;S.flags.c3_ws_bag=bag;
  const wet=res.wet;S.flags.c3_wet=wet<=1?'dry':wet<=4?'wet':'soaked';S.flags.c3_splashes=res.spl;
  const L={dry:['Mostly dry','Min reaches the end of the street almost dry. On Thingyan, that is a crime.'],wet:['Wet','Min reaches the end of the street wet through, just in time.'],soaked:['Soaked','Min reaches the end of the street dripping from his hair to his flip-flops.']}[S.flags.c3_wet];
  await cardShow(`<div class="eb">${L[0]} · camera ${res.lives===res.max?'bone dry':'still working'}</div><h2>He made it</h2><p>${L[1]}</p><p style="margin-top:8px;font-weight:500;color:#1d2a2c">You splashed ${res.spl} friend${res.spl===1?'':'s'}. Min got splashed ${res.got} time${res.got===1?'':'s'}.</p>`,[['wsDone','Find May']]);
  hud.style.display='none';
}
function wsRun(bag){return new Promise(async done=>{
  const f=$('#wsField'),hud=$('#wsHud'),bg=$('#wsBg');
  [...f.querySelectorAll('.spr,.burst,.pop,svg')].forEach(e=>e.remove());
  if(!bg.complete)await new Promise(r=>bg.onload=r);
  const W=f.clientWidth,H=f.clientHeight,IW=404,IH=800,sc=Math.max(W/IW,H/IH),ox=(W-IW*sc)/2,oy=(H-IH*sc)/2;
  // road geometry in image px: vanishing row VY, centre line cx(y), half width hw(y)
  const VY=337,NY=716,cx=y=>205-(y-400)*.043,hw=y=>.475*(y-VY);
  const at=(s,l)=>{const y=VY+s*(NY-VY);return{x:ox+(cx(y)+(l-1)*(2/3)*hw(y))*sc,y:oy+y*sc}};
  const LANEW=(2/3)*hw(NY)*sc,max=bag?5:3,sp=S.speed>1?2:1;
  let lives=max,lane=1,wet=0,spl=0,got=0,ents=[],over=false;
  const DUR=26000/sp;
  // lane overlay (same cover mapping as the background)
  const NS='http://www.w3.org/2000/svg',svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox',`0 0 ${IW} ${IH}`);svg.setAttribute('preserveAspectRatio','xMidYMid slice');
  const y0=392,y1=IH;svg.innerHTML='<defs><linearGradient id="wsFade" gradientUnits="userSpaceOnUse" x1="0" y1="392" x2="0" y2="470"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="1"/></linearGradient></defs>';
  [-1/3,1/3].forEach(k=>{svg.insertAdjacentHTML('beforeend',`<line x1="${cx(y0)+k*hw(y0)}" y1="${y0}" x2="${cx(y1)+k*hw(y1)}" y2="${y1}" class="div"/>`)});
  const quad=l=>{const a=(l-1)*(2/3)-1/3,b=a+2/3;return `${cx(y0)+a*hw(y0)},${y0} ${cx(y0)+b*hw(y0)},${y0} ${cx(y1)+b*hw(y1)},${y1} ${cx(y1)+a*hw(y1)},${y1}`};
  [0,1,2].forEach(l=>svg.insertAdjacentHTML('beforeend',`<polygon points="${quad(l)}" class="dz" id="wsDz${l}"/>`));
  f.appendChild(svg);
  const lv=()=>{$('#wsLives').innerHTML=Array.from({length:max},(_,i)=>`<i class="ic i-camera${i<lives?'':' off'}"></i>`).join('')+`<span style="margin-left:4px">${bag?'In a plastic bag':'Camera'}</span><span class="sc" title="Friends you splashed"><i class="ic i-smiley"></i>${spl}<i class="ic i-drop" style="margin-left:10px"></i>${got}</span>`};
  hud.style.display='block';$('#wsSongI').style.width='0';lv();
  const me=document.createElement('div');me.id='wsMin';me.className='spr anim';me.style.backgroundImage='url(img/ws-min-run.webp?v=2611161)';me.style.height=(LANEW*1.05)+'px';me.style.width=(LANEW*1.05*.42)+'px';f.appendChild(me);
  const put=()=>{const p=at(1,lane);me.style.left=p.x+'px';me.style.top=(p.y+LANEW*.18)+'px'};put();
  let lastPop=0,popN=0;const pop=(x,y,t,bad)=>{const n=performance.now();popN=n-lastPop<700?popN+1:0;lastPop=n;y-=popN*22;const p=document.createElement('div');p.className='pop'+(bad?' bad':'');p.textContent=t;p.style.left=x+'px';p.style.top=y+'px';f.appendChild(p);setTimeout(()=>p.remove(),800)};
  const cnt=$('#wsCount');cnt.style.display='flex';for(const n of ['3','2','1']){cnt.textContent=n;await rawSleep(S.speed>1?120:520)}cnt.style.display='none';
  me.classList.add('run');
  f.onpointerdown=e=>{if(over)return;e.stopPropagation();const r=f.getBoundingClientRect(),x=e.clientX-r.left;
    lane=Math.max(0,Math.min(2,lane+(x<W/2?-1:1)));put()};
  Audio_.songStart();
  const t0=performance.now();let last=t0,nextPal=t0+700,nextTruck=t0+2400/sp;
  const spawn=(k,l)=>{let el,ar;if(k==='truck'){el=document.createElement('img');el.src='img/ws-truck.webp?v=2611161';ar=254/360}else{el=document.createElement('div');const g=Math.random()<.5;el.style.backgroundImage=`url(img/ws-pal${g?1:2}-run.webp)`;el.classList.add('anim');ar=g?.38:.403}el.classList.add('spr',k);
    const o={k,l,z:6.2,el,ar};f.appendChild(el);ents.push(o);
    if(k==='pal')el.onpointerdown=e=>{e.stopPropagation();if(over||o.hit||o.z>4.2)return;o.hit=1;spl++;el.classList.add('hit');const p=at(1/o.z,o.l);pop(p.x,p.y-LANEW*1.1/o.z,'Splash!');Audio_.splash(false);lv();o.exit=performance.now();o.dir=o.l===0?-1:o.l===2?1:(Math.random()<.5?-1:1);const b=document.createElement('div');b.className='burst';b.style.left=p.x+'px';b.style.top=(p.y-LANEW*.45/o.z)+'px';b.style.transform=`scale(${Math.min(1,1.3/o.z)})`;f.appendChild(b);setTimeout(()=>b.remove(),600)};
    if(k==='truck'){$('#wsDz'+l).classList.add('on');Audio_.horn()}
    return o};
  const busy=()=>ents.some(o=>o.k==='truck');
  function frame(now){if(over)return;const dt=Math.min(50,now-last);last=now;const p=Math.min(1,(now-t0)/DUR);
    $('#wsSongI').style.width=(p*100)+'%';
    if(p<.9&&now>nextPal){const tr=ents.find(o=>o.k==='truck');let l=Math.floor(Math.random()*3);if(tr&&l===tr.l)l=(l+1)%3;spawn('pal',l);nextPal=now+(1000-p*350+Math.random()*450)/sp}
    if(p<.88&&now>nextTruck&&!busy()){const free=[0,1,2].filter(l=>!ents.some(q=>q.l===l&&q.z>2.2));if(free.length){const l=free.includes(lane)&&Math.random()<.65?lane:free[Math.floor(Math.random()*free.length)];spawn('truck',l)}nextTruck=now+(3300-p*1100)/sp}
    for(const o of ents){const ah=ents.filter(q=>q!==o&&q.l===o.l&&q.z<o.z&&!q.done&&!q.exit).reduce((m,q)=>Math.max(m,q.z),0);const v=(o.k==='truck'?.001+p*.0005:.0008+p*.0004)*dt*sp;if(!o.exit)o.z=Math.max(.55,ah?ah+.9:0,o.z-v*o.z*.55-v*.4);
      const s=1/o.z,pt=at(Math.min(s,1.6),o.l),h=Math.min(LANEW*(o.k==='truck'?1.15:1.0)*s,LANEW*s*.9/o.ar);
      let dx=0;if(o.exit){const e=(now-o.exit)/(S.speed>1?.5:1);const k=Math.max(0,Math.min(1,(e-280)/420));dx=o.dir*k*LANEW*.9*s;o.el.style.opacity=1-k;if(k>=1)o.gone=1}
      o.el.style.left=(pt.x+dx)+'px';o.el.style.top=(pt.y+LANEW*.18*s)+'px';o.el.style.height=h+'px';if(o.k!=='truck')o.el.style.width=(h*o.ar)+'px';o.el.style.zIndex=Math.round(s*100)+(o.k==='truck'?1:0);
      if(o.k==='pal'&&!o.hit)o.el.classList.toggle('far',o.z>4.2);if(o.done)o.el.style.opacity=Math.max(0,(o.z-.6)/.45);
      if(!o.done&&!o.exit&&o.z<=1.05){o.done=1;
        if(o.k==='truck'){$('#wsDz'+o.l).classList.remove('on');Audio_.splash(true);const b=document.createElement('div');b.className='burst';const q=at(1,o.l);b.style.left=q.x+'px';b.style.top=q.y+'px';f.appendChild(b);setTimeout(()=>b.remove(),600);
          if(o.l===lane){lives--;wet+=2;got++;me.classList.remove('hit');void me.offsetWidth;me.classList.add('hit');pop(q.x,q.y-LANEW*1.3,lives>0?'Camera hit!':'Camera soaked',true);navigator.vibrate&&navigator.vibrate(60);lv()}
          else pop(at(1,lane).x,at(1,lane).y-LANEW*1.3,'Missed!')}
        else if(!o.hit&&o.l===lane){wet++;got++;lv();Audio_.splash(false);pop(at(1,lane).x,at(1,lane).y-LANEW*1.3,'Splashed!',true)}}
    }
    ents=ents.filter(o=>{if(o.z<=.6||o.gone){o.el.remove();return false}return true});
    if(lives<=0){over=true;finish(false);return}
    if(p<1)requestAnimationFrame(frame);else{over=true;finish(true)}}
  async function finish(ok){Audio_.songStop(ok?1400:500);f.onpointerdown=null;me.classList.remove('run');ents.forEach(o=>o.el.remove());ents=[];f.querySelectorAll('.dz').forEach(e=>e.classList.remove('on'));
    if(ok){const may=document.createElement('img');may.src='img/ws-may.webp?v=2611161';may.className='spr may';const m=at(.42,1);may.style.left=m.x+'px';may.style.top=(m.y+LANEW*.18*.42)+'px';may.style.height=(LANEW*.95*.42)+'px';f.appendChild(may);
      lane=1;put();me.style.transition='left .3s ease, top 1.3s ease, height 1.3s ease, width 1.3s ease';me.classList.add('run');await rawSleep(80);const q=at(.47,1);me.style.top=(q.y+LANEW*.18*.47)+'px';me.style.height=(LANEW*1.05*.47)+'px';me.style.width=(LANEW*1.05*.47*.42)+'px';await rawSleep(S.speed>1?300:1400)}
    else await rawSleep(S.speed>1?200:900);
    me.style.transition='';done({ok,wet,spl,got,lives,max})}
  requestAnimationFrame(frame)})}
