async function packBox(){
  const V=$('#pack');$('#pkBg').innerHTML=SCENE.c4Room;const go=$('#pkGo');go.disabled=true;
  let picked=[];
  const draw=()=>{
    $('#pkBox').innerHTML=['print',...picked,null,null].slice(0,3).map(id=>{if(!id)return '<div class="sl"></div>';const it=PACK.find(x=>x.id===id);return `<div class="sl f" title="${esc(it.n)}">${packPic(it)}</div>`}).join('');
    $('#pkGrid').innerHTML=PACK.slice(1).map(it=>`<button class="it${picked.includes(it.id)?' in':''}" data-id="${it.id}" aria-pressed="${picked.includes(it.id)}"><span class="pic">${packPic(it)}</span>${esc(it.n)}</button>`).join('');
    go.disabled=picked.length<2;
    $('#pkGrid').querySelectorAll('.it').forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.id;
      if(picked.includes(id))picked=picked.filter(x=>x!==id);else if(picked.length<2)picked.push(id);else{picked.shift();picked.push(id)}
      Audio_.blip(true);draw()})};
  draw();show('pack');
  await new Promise(r=>{go.onclick=e=>{e.stopPropagation();if(!go.disabled)r()}});
  S.flags.c4_box=picked.slice();S.flags.c4_left=PACK.slice(1).map(x=>x.id).filter(x=>!picked.includes(x));
}
