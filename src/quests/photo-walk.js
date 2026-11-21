async function photoWalk(){Audio_.sfxLoad('shutter');
  S.walk=[];const sp=$('#pwSpots'),rolls=$('#pwRolls').children,vf=$('#vf'),win=$('#vfWin'),pan=$('#vfPan'),fr=$('#vfFr');
  [...rolls].forEach(r=>{r.className='';r.style.backgroundImage='';r.innerHTML=''});$('#pwDone').classList.remove('on');
  sp.innerHTML=SPOTS.map((x,i)=>`<button class="spot" data-i="${i}"><img src="${x.src}" alt=""><span>${pwT(x.name)}</span></button>`).join('');
  show('pwalk');
  await new Promise(done=>{
    let cur=null,ox=0,oy=0,W=0,drag=null,fb=null;
    const place=()=>{pan.style.transform=`translate(${ox}px,${oy}px)`};
    const cx=v=>Math.max(win.clientWidth-W,Math.min(0,v)),cy=v=>Math.max(win.clientHeight-W,Math.min(0,v));
    const openSpot=i=>{cur=SPOTS[i];pan.innerHTML=`<img src="${cur.src}" alt="">`;$('#vfName').textContent=pwT(cur.name);$('#vfCount').textContent=`${S.walk.length+1} of 3`;
      $('#vfRes').classList.remove('on');$('#vfHint').style.display='';vf.classList.add('on');
      requestAnimationFrame(()=>{W=Math.max(win.clientWidth,win.clientHeight)*1.45;pan.style.width=W+'px';pan.style.height=W+'px';
        const r=win.getBoundingClientRect(),f=fr.getBoundingClientRect(),k=(r.width/win.clientWidth)||1;fb={l:(f.left-r.left)/k,t:(f.top-r.top)/k,w:f.width/k,h:f.height/k};
        // start with the subject pushed out of the frame, so the player has to find it
        ox=cx(win.clientWidth/2-cur.sx*W+(cur.sx>.5?-1:1)*win.clientWidth*.6);oy=cy(win.clientHeight/2-cur.sy*W+(cur.sy>.5?-1:1)*win.clientHeight*.35);place();});};
    sp.querySelectorAll('.spot').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();openSpot(+b.dataset.i)}));
    win.onpointerdown=e=>{drag={x:e.clientX,y:e.clientY,ox,oy};win.setPointerCapture(e.pointerId);$('#vfHint').style.display='none'};
    win.onpointermove=e=>{if(!drag)return;ox=cx(drag.ox+e.clientX-drag.x);oy=cy(drag.oy+e.clientY-drag.y);place()};
    win.onpointerup=win.onpointercancel=()=>{drag=null};
    $('#vfBack').onclick=e=>{e.stopPropagation();vf.classList.remove('on')};
    $('#vfShut').onclick=async e=>{e.stopPropagation();if(!cur||$('#vfRes').classList.contains('on'))return;
      const fl=$('#vfFlash');fl.classList.add('on');Audio_.shutter();setTimeout(()=>fl.classList.remove('on'),60);
      const sx=cur.sx*W+ox,sy=cur.sy*W+oy,inF=sx>fb.l&&sx<fb.l+fb.w&&sy>fb.t&&sy<fb.t+fb.h;
      const px=Math.round((-ox)/Math.max(1,W-win.clientWidth)*100),py=Math.round((-oy)/Math.max(1,W-win.clientHeight)*100);
      const cr={x:+((fb.l-ox)/W).toFixed(4),y:+((fb.t-oy)/W).toFixed(4),w:+(fb.w/W).toFixed(4),h:+(fb.h/W).toFixed(4)};
      const wk={id:cur.id,px,py,ok:inF,c:cr};S.walk.push(wk);const r=rolls[S.walk.length-1];r.className='f';r.style.backgroundImage='';r.style.position='relative';r.style.overflow='hidden';r.innerHTML=shotHTML(wk,'fill');
      sp.querySelector(`[data-i="${SPOTS.indexOf(cur)}"]`).classList.add('done');
      const res=$('#vfRes');res.innerHTML=`<small>${inF?'In the frame':'Mostly out of the frame'}</small>${pwT(inF?cur.line:'Not quite what he meant. He keeps it anyway. Some of his favourites started like this.')}`;res.classList.add('on');
      await rawSleep(2300);vf.classList.remove('on');cur=null;
      if(S.walk.length>=3){sp.querySelectorAll('.spot').forEach(b=>b.classList.add('done'));$('#pwDone').classList.add('on')}};
    $('#pwDone').onclick=e=>{e.stopPropagation();done()};
  });
  S.flags.c2_walk_framed=S.walk.filter(w=>w.ok).length;
}
