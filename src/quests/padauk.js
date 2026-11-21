async function padaukPick(){
  const V=$('#padauk'),bg=$('#pdBg');[...V.querySelectorAll('.spot,.pop')].forEach(e=>e.remove());$('#pdPick').style.display='none';$('#pdT').style.transform='scaleX(1)';
  show('padauk');if(!bg.complete)await new Promise(r=>bg.onload=r);
  const W=V.clientWidth,H=V.clientHeight,IW=450,IH=800,sc=Math.max(W/IW,H/IH),ox=(W-IW*sc)/2,oy=(H-IH*sc)/2,sp=S.speed>1?3:1;
  const P={full:[.355,.375,'The fullest one, up high','Min climbs the wall for it. Daw Khin next door holds the wall steady and tells him he\'ll break his neck.'],
           buds:[.735,.505,'A young one, still in bud','Not open yet. By the afternoon it will be.'],
           fallen:[.445,.765,'The one that fell on the wall','The aunties got the rest. This one was waiting on the bricks.']};
  const xy=k=>({x:ox+P[k][0]*IW*sc,y:oy+P[k][1]*IH*sc});
  const el={};for(const k in P){const d=document.createElement('div');d.className='spot';const q=xy(k);d.style.left=q.x+'px';d.style.top=q.y+'px';V.appendChild(d);el[k]=d}
  const pop=(k,t)=>{const p=document.createElement('div');p.className='pop';const q=xy(k);p.textContent=t;p.style.left=q.x+'px';p.style.top=(q.y-70)+'px';V.appendChild(p);setTimeout(()=>p.remove(),1600)};
  const DUR=10000/sp,t0=performance.now();let pick=null,timers=[];
  const take=(k,at)=>timers.push(setTimeout(()=>{if(pick)return;el[k].classList.add('gone');el[k].dataset.gone=1;pop(k,'An aunty\'s hook got it')},at/sp));
  take('full',5000);take('buds',8000);
  pick=await new Promise(res=>{
    for(const k in el)el[k].onpointerdown=e=>{e.stopPropagation();if(el[k].dataset.gone)return;res(k)};
    (function tick(){const p=Math.min(1,(performance.now()-t0)/DUR);$('#pdT').style.transform=`scaleX(${1-p})`;if(p>=1)return res('fallen');if(!V.classList.contains('on'))return;requestAnimationFrame(tick)})();
  });
  timers.forEach(clearTimeout);for(const k in el)el[k].onpointerdown=null;
  S.flags.c3_padauk=pick;Audio_.blip(true);
  const z=$('#pdZoom'),q=xy(pick),Z=3.2;z.style.backgroundImage='url(img/c3-padauk.webp?v=2611161)';
  z.style.backgroundSize=`${IW*sc*Z}px ${IH*sc*Z}px`;z.style.backgroundPosition=`${104-(q.x-ox)*Z}px ${104-(q.y-oy)*Z}px`;
  $('#pdName').textContent=P[pick][2];$('#pdLine').textContent=P[pick][3];$('#pdPick').style.display='flex';
  await new Promise(r=>{$('#pdGo').onclick=e=>{e.stopPropagation();r()}});
}
