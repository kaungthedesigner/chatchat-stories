/* ============ BANNER ============ */
function banner(c,title,text,accept){const b=$('#banner');b.innerHTML=`${av(c,true)}<div class="t"><small>ChatChat · now</small><b>${esc(title)}</b><span>${esc(text)}</span></div>${accept?'<div class="acc">Accept</div>':''}`;b.classList.add('on');Audio_.blip(false);
  return new Promise(r=>{const h=e=>{e.stopPropagation();b.removeEventListener('click',h);b.classList.remove('on');r()};b.addEventListener('click',h)});}

/* ============ CHAT LIST ============ */
function liveRows(rows,skip){return (rows||[]).map(r=>{if(r.c===skip)return r;const t=(S.threads[r.c]||[]).filter(m=>m.k!=='div'&&m.k!=='sys');const m=t[t.length-1];if(!m)return r.text?r:Object.assign({},r,{text:'…'});
  const text=m.k==='text'?m.text:m.k==='sticker'?'Sticker':m.k==='photo'?'Photo':m.k==='link'?'Link':m.k==='voice'?'Voice message':m.k==='loc'?'📍 '+(m.place||'Location'):(m.text||r.text);return Object.assign({},r,{text,you:m.dir==='out',unread:0,seen:false})})}
function renderList(rows,only){const R=$('#rows');R.innerHTML=rows.map(r=>`<button class="crow${only&&r.c!==only?' dim':''}${only===r.c?' pulse':''}" data-c="${r.c}">${av(r.c,false,r.on)}<div class="meta"><div class="nm">${C[r.c].name}<span>${r.time||''}</span></div><div class="pv"><span>${r.you?'<b>You:</b> ':''}${esc(r.text)}</span><i>${r.unread?`<span class="badge">${r.unread}</span>`:(r.seen?'<span style="font-size:11px">Seen</span>':'')}</i></div></div></button>`).join('');}
function waitRow(only){return new Promise(r=>{$('#rows').querySelectorAll('.crow').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();if(b.dataset.c===only){r()}else{b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake')}}))})}

