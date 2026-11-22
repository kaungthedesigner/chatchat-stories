/* The other stories on the home page (from STORIES, built from each story's story.json): a card each, opening that story's own page */
(()=>{const others=STORIES.filter(s=>s.id!==STORY.id),h=$('#lib h3.sh');if(!others.length||!h)return;
  others.forEach(s=>{const d=document.createElement('div');d.className='hero alt';d.setAttribute('role','button');d.tabIndex=0;d.dataset.story=s.id;
    d.innerHTML=`<img src="${s.cover}" alt="" draggable="false"><div class="hs"></div><div class="hx"><div class="tag">${esc(s.tag||'')}</div><h2>${esc(s.title)}</h2><p>${esc(s.tagline||'')}</p></div>`;
    const go=()=>{location.href=s.page};d.onclick=e=>{e.stopPropagation();go()};d.onkeydown=e=>{if(e.key==='Enter')go()};h.before(d)})})();
