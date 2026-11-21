/* ===== Which ending: sent drafts (courage) first, then whether he read Htoo's comment ===== */
const COURAGE=['c1_told_kept','c1_wouldnt_mind','c2_friends','c4_night','c5_station'];
const courage=f=>COURAGE.filter(k=>f[k]===true).length;
const endOf=f=>{const c=courage(f);return c>=4?'next':c>=2?'open':'unsaid'};
const byEnd=map=>()=>map[endOf(S.flags)]||[];
const END3=['unsaid','open','next'];
const END_NAME={unsaid:'Unsaid',open:'Open door',next:'Until the next rain',said:'Said too late',let:'Let go'};
const END_LEAD={unsaid:'He typed it one more time and let it go unsent. Some things stay in the drafts.',open:'He said it. She saw it. What happened next is yours to decide.',next:'Not together yet. But the umbrellas are going home, and so, one day, is she.',said:'He said it, three years late. She answered.',let:'He stopped waiting.'};
function finalCard(){const e=S.flags.ending||endOf(S.flags);const v=sv();v.ends=v.ends||[];if(!v.ends.includes(e))v.ends.push(e);v.ending=e;markDone(STORY.chapters.length-1);v.replay=false;persist();
  const el=$('#end');el.innerHTML=`<div class="k">Ending · ${END_NAME[e]}</div><h2>Before the Rain Ends</h2><p class="lead">${END_LEAD[e]}</p><p class="mhs">${v.ends.filter(x=>END3.includes(x)).length} of 3 endings found.${v.ends.filter(x=>END3.includes(x)).length<3?' What Min sends changes how it ends.':''}</p>
  <h3 class="mh">Kept <span>${S.memories.length}</span></h3><div class="mgrid">${memCards(true,'kept')||'<p class="e">None this time.</p>'}</div>${unsentHTML()}
  <div class="btns"><button class="b1" id="again">Back to Stories</button></div>`;
  el.classList.add('on');$('#again').onclick=()=>{try{sessionStorage.setItem('bre_home','1')}catch(_){ }try{history.replaceState(null,'',location.pathname+location.search)}catch(_){ }location.reload()}}
