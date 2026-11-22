/* ============ UI HELPERS ============ */
const AMB_ART={c5Lamp:'lights',c5Closing:'rain',c5HninSits:'rain',c5Counter:'rain',c5Bench:'rain',c5BusGone:'rain',e2Door:'rain',e3Tea:'rain',e3Sit:'rain',epTown:'daily',c4Station:'rain',c4Room:'rain',c4Shutter:'rain',teashop1:'rain',roomEmpty:'rain',bedroom:'rain',classroom1:'daily',walkShare:'daily',pagoda:'lights',lampWall:'lights',pagoda19:'lights',lamp2:'lights',wstreet:'thingyan',mayEnd:'thingyan'};
const AMB_VIEW={pwalk:'daily',padauk:'daily'};
const AMB_VOL={rain:.084,daily:.072,lights:.084,thingyan:.048}; // 30% of the first levels (Kaung, 9 Nov)
const MUS_FILE={thingyan:'img/ws-song.mp3'};
function show(id){{const dk=document.getElementById('postDark');if(dk)dk.classList.remove('on')}document.querySelectorAll('.view').forEach(v=>v.classList.toggle('on',v.id===id));
  Audio_.amb(id==='scene'?S.amb:AMB_VIEW[id]);
  $('#status').classList.toggle('light',id==='lock'||id==='scene'||id==='callv');
  $('#status').classList.toggle('onlock',id==='lock');
  $('#status').style.opacity=id==='scene'?0:1;}
function setTime(t){$('#clock').textContent=t.replace(/ ?[AP]M/,'');const m=t.match(/(\d+):(\d+)\s*([AP]M)/i);if(!m)return;let h=+m[1]%12;if(/p/i.test(m[3]))h+=12;const n=h*60+ +m[2];
  if(S.now!=null&&n<S.now-30)S.day=(S.day||0)+1;S.now=n;S.tlabel=t;}
// auto date/time stamps: a divider before a message when the gap since the last one is a new day or an hour or more
function stampDiv(c){if(S.tlabel==null)return null;const th=S.threads[c]||[];const last=th[th.length-1];if(!last||last.k==='div'||last.k==='sys')return null;
  const lm=[...th].reverse().find(x=>x.dir);if(!lm)return null;const d=S.day||0;
  if(!lm.st||lm.st.d!==d)return 'Today '+S.tlabel;if(S.now-lm.st.n>=60)return S.tlabel;return null}
/* May's avatar becomes her new profile picture from the December 2020 photo on */
function avSrc(c){return c==='may'&&typeof MAY_AV_AT!=='undefined'&&MAY_AV_AT>=0&&S.at>=MAY_AV_AT?'img/av-may-2020.webp?v=2611161':`img/av-${c}.webp`}
function av(c,sm,online){const x=C[c];return `<div class="av${sm?' sm':''}" style="background:${x.bg};color:${x.fg}">${x.img?`<img src="${avSrc(c)}" alt="" draggable="false">`:x.ini}${online?'<i class="on"></i>':''}</div>`}
let toastT;
function toast(html){const t=$('#toast');t.innerHTML=IC.star+html;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),2800);}
function waitClick(el){return new Promise(r=>{const h=e=>{e.stopPropagation();el.removeEventListener('click',h);r(e)};el.addEventListener('click',h)})}
function waitStage(delay=120){return new Promise(r=>{setTimeout(()=>{const h=e=>{if(e.target.closest('.opt,.dbtns,#banner'))return;stage.removeEventListener('click',h);r()};stage.addEventListener('click',h)},delay)})}

/* splits text into lines of at most n characters (placeholder art labels) */
function wrap(t,n){const o=[];let l='';t.split(' ').forEach(x=>{if((l+' '+x).trim().length>n){o.push(l);l=x}else l=(l+' '+x).trim()});if(l)o.push(l);return o}
