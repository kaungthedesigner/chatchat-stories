/* ============ TIME JUMP ============ */
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
function ymFrom(t){t=String(t||'').replace(/<[^>]*>/g,' ');const m=t.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\b/);const y=t.match(/\b(19|20)\d\d\b/);if(!m||!y)return null;return +y[0]*12+['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].indexOf(m[1])}
function tjPage(top,inner){const d=document.createElement('div');d.className='pg';d.innerHTML=`<div class="top">${top}</div>${inner}`;return d}
async function timeJump(t){
  let label=null,pages=[];const ym=ymFrom(t);
  if(ym!=null){const prev=S.ym;S.ym=ym;const d=prev!=null?ym-prev:null;if(d===0)return;
    if(d!=null&&d>0)label=d===1?'A month later':d===12?'A year later':d%12===0?`${d/12} years later`:`${d} months later`;
    const from=(d!=null&&d>0)?Math.max(prev,ym-6):ym;for(let k=from;k<=ym;k++)pages.push(tjPage(MONTHS[k%12],`<div class="big">${Math.floor(k/12)}</div>`))}
  else if(/^next morning/i.test(t)){label='Next morning';pages=[tjPage('Night','<div class="ico"><span class="ic i-moon-stars"></span></div>'),tjPage('Morning','<div class="ico"><span class="ic i-sun-horizon"></span></div>')]}
  else if(/^next night/i.test(t)){label='Next night';pages=[tjPage('Day','<div class="ico"><span class="ic i-sun"></span></div>'),tjPage('Night','<div class="ico"><span class="ic i-moon-stars"></span></div>')]}
  else if(/later$/i.test(t)){label=t;pages=[tjPage(t,'<div class="ico"><span class="ic i-hourglass"></span></div>')]}
  else return;
  const sp=S.speed||1,W=ms=>rawSleep(ms/sp);
  const o=$('#tj');o.innerHTML=`<div class="lab">${label||''}</div><div class="cal"><div class="rings"><i></i><i></i></div></div><div class="skip">Time passes</div>`;
  const cal=o.querySelector('.cal'),lab=o.querySelector('.lab'),skip=o.querySelector('.skip');let top=pages[0];cal.appendChild(top);
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let skipped=false;const sk=()=>{skipped=true};o.addEventListener('click',sk);
  const anim=(el,kf,opt)=>{if(reduce||skipped)return Promise.resolve();try{return el.animate(kf,Object.assign({fill:'both'},opt,{duration:opt.duration/sp})).finished.catch(()=>{})}catch(e){return Promise.resolve()}};
  o.classList.add('on');
  anim(cal,[{transform:'translateY(18px) scale(.94)',opacity:0},{transform:'none',opacity:1}],{duration:650,easing:'cubic-bezier(.2,.8,.2,1)'});
  anim(skip,[{opacity:0},{opacity:0,offset:.6},{opacity:1}],{duration:1200,easing:'ease-out'});
  if(lab)lab.style.opacity='0';
  await W(900);
  for(let i=1;i<pages.length&&!skipped;i++){const nx=pages[i],last=i===pages.length-1;cal.insertBefore(nx,top);
    const shade=document.createElement('div');shade.className='shade';nx.appendChild(shade);
    const dur=last?1100:Math.max(420,1500/pages.length);
    anim(shade,[{opacity:.35},{opacity:0}],{duration:dur,easing:'ease-out'});
    await anim(top,[{transform:'rotateX(0deg)',opacity:1,filter:'brightness(1)'},{transform:'rotateX(35deg)',opacity:.85,filter:'brightness(1.03)',offset:.3},{transform:'rotateX(70deg)',opacity:.45,filter:'brightness(1)',offset:.6},{transform:'rotateX(95deg)',opacity:.12,filter:'brightness(.95)',offset:.85},{transform:'rotateX(120deg)',opacity:0,filter:'brightness(.9)'}],{duration:dur,easing:'cubic-bezier(.45,.05,.55,.95)'});
    top.remove();shade.remove();top=nx;if(!last)await W(140)}
  if(skipped){cal.querySelectorAll('.pg').forEach(p=>p!==pages[pages.length-1]&&p.remove());if(!pages[pages.length-1].isConnected)cal.appendChild(pages[pages.length-1])}
  if(lab){lab.style.opacity='';await anim(lab,[{transform:'translateY(6px)',opacity:0},{transform:'none',opacity:1}],{duration:600,easing:'cubic-bezier(.2,.8,.2,1)'})}
  const t0=Date.now();while(!skipped&&Date.now()-t0<2200/sp)await rawSleep(50);
  o.removeEventListener('click',sk);skipped=false;
  await anim(cal,[{transform:'none',opacity:1},{transform:'translateY(-10px) scale(.97)',opacity:0}],{duration:450,easing:'ease-in'});
  o.classList.remove('on');await rawSleep(380);o.innerHTML='';}

