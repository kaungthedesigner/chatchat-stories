/* ===== Chapter 5 side quest · One ticket: buy it at the counter, then wait on the bench for boarding ===== */
const TK_PRICE=18000,TK_TAKEN=new Set(['1A','1B','1C','2C','3A','3B','4B','5C','6A','6B','8C']);
const ks=n=>n.toLocaleString('en-US')+' Ks';
async function ticketStep(mode){
  await holdChat();const tb=$('#tkBody'),go=$('#tkGo'),H=$('#tkH'),sub=$('#tkSub');go.className='';
  const wait=()=>new Promise(r=>{go.onclick=e=>{e.stopPropagation();if(!go.disabled)r()}});
  if(mode==='buy'){
    $('#tkBg').innerHTML=SCENE.c5Counter;H.textContent='Night bus to the city';
    sub.textContent='Tonight, 8 PM. Pick a seat.';go.textContent='Next';go.disabled=true;let seat=null;
    const draw=()=>{tb.innerHTML=`<div class="tkBus"><small>Front of the bus</small><div class="tkSeats">${[1,2,3,4,5,6,7,8].map(r=>['A','B',null,'C'].map(c=>{if(!c)return '<i class="aisle"></i>';const id=r+c,t=TK_TAKEN.has(id);return `<button data-s="${id}"${t?` disabled aria-label="${id} taken"`:''} class="${seat===id?'on':''}">${id}</button>`}).join('')).join('')}</div></div>`;
      tb.querySelectorAll('button[data-s]').forEach(b=>b.onclick=e=>{e.stopPropagation();seat=b.dataset.s;Audio_.blip(true);go.disabled=false;draw()})};
    draw();show('ticket');await wait();S.flags.c5_seat=seat;
    let paid=0;const ask=()=>sub.textContent=`Seat ${seat}. Count out the fare.`;ask();go.textContent='Pay';go.disabled=true;
    const drawP=()=>{tb.innerHTML=`<div class="tkPay"><div class="tkTot">${ks(paid)}<small>of ${ks(TK_PRICE)}</small></div><div class="tkNotes">${[10000,5000,1000].map(v=>`<button data-v="${v}">${v.toLocaleString('en-US')}</button>`).join('')}</div>${paid?'<button class="tkClr">Count again</button>':''}</div>`;
      tb.querySelectorAll('.tkNotes button').forEach(b=>b.onclick=e=>{e.stopPropagation();if(paid>=TK_PRICE)return;paid+=+b.dataset.v;Audio_.blip(true);go.disabled=paid<TK_PRICE;
        if(paid>TK_PRICE)sub.textContent=`Seat ${seat}. Change: ${ks(paid-TK_PRICE)}.`;drawP()});
      const c=tb.querySelector('.tkClr');if(c)c.onclick=e=>{e.stopPropagation();paid=0;go.disabled=true;ask();drawP()}};
    drawP();await wait();
    sub.textContent='The clerk tears it out of the book and slides it across.';tb.innerHTML=ART.ticket(true);go.textContent='Take the ticket';go.disabled=false;await wait();
  }else{
    $('#tkBg').innerHTML=SCENE.c5Wait;H.textContent='Boarding';sub.textContent=`Night bus to the city · seat ${S.flags.c5_seat||'7A'}`;
    tb.innerHTML='<div class="tkBoard"><div class="lbl"><span>Boarding closes</span><b id="tkClock">8:00 PM</b></div><div class="tkBar"><i></i></div><p id="tkLine">Min waits on the bench.</p></div>';
    go.textContent='Board';go.disabled=true;show('ticket');
    const bar=tb.querySelector('.tkBar i'),line=$('#tkLine'),clk=$('#tkClock'),sp=S.speed>1?2:1;let pressed=false,steps=null;
    const say=t=>{line.style.opacity=0;setTimeout(()=>{line.textContent=t;line.style.opacity=.9},180)};
    await rawSleep(2200/sp);$('#tkBg').innerHTML=SCENE.c5Bench;say('Boarding is called.');go.disabled=false;go.classList.add('lit');
    go.onclick=e=>{e.stopPropagation();if(pressed)return;pressed=true;go.classList.remove('lit');go.disabled=true;Audio_.blip(true);
      steps=(async()=>{$('#tkBg').innerHTML=SCENE.c5Walk;say('Min stands up.');await rawSleep(1900/sp);
        $('#tkBg').innerHTML=SCENE.c5Step;say('He gets as far as the bottom step.');await rawSleep(2600/sp);
        say('“Coming or not?”');await rawSleep(1900/sp);say('He steps back down.');})()};
    const DUR=12000/sp,t0=performance.now();
    await new Promise(r=>{(function tick(){const p=Math.min(1,(performance.now()-t0)/DUR);bar.style.transform=`scaleX(${1-p})`;
      const m=Math.ceil(5*(1-p));clk.textContent=m>0?(S.lang==='my'?`${m} မိနစ်`:`${m} min`):'8:00 PM';
      if(p>=1&&(!pressed||steps))return r();requestAnimationFrame(tick)})()});
    if(steps)await steps,await rawSleep(1600/sp);
    S.flags.c5_board=pressed;S.flags.c5_board_tried=pressed;go.classList.remove('lit','held');go.disabled=true;
    if(pressed)$('#tkBg').innerHTML=SCENE.c5Bench;
    say(pressed?'The doors close. He is still holding the ticket.':"Min doesn't get up. The doors close.");await rawSleep(2200/sp);
    $('#tkBg').innerHTML=SCENE.c5BusGone;H.textContent='The bus leaves';sub.textContent='';line.textContent='Without him.';
    go.textContent=S.lang==='my'?'ဆက်မယ်':'Continue';go.disabled=false;await wait();
  }
}
