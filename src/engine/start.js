/* ============ START ============ */
function startAudio(){Audio_.init();const c=Audio_.ctx;if(!c||!S.sound)return;if(c.state!=='running'){try{const p=c.resume();if(p&&p.then)p.then(sndSync,()=>{})}catch(e){}}sndSync()}
let sndWas=null;
function sndSync(){const c=Audio_.ctx,on=!!(S.sound&&c&&c.state==='running');
  $('#bSound span:last-child').textContent=on?'On':'Off';$('#bSound .ic').className='ic i-'+(on?SPK_ON:SPK_OFF);
  if(on!==sndWas){sndWas=on;Audio_.amb(Audio_.ambWant);Audio_.level()}}
/* Make the audio context and decode every music file as the game opens, so the first tap plays sound right away */
function audioPreload(){Audio_.init();if(!Audio_.ctx)return;['rain','daily','lights','thingyan'].forEach(n=>Audio_.ambLoad(n));Audio_.sfxLoad('shutter');sndSync()}
/* Sound stops when the player leaves (another app, another tab, phone locked) and comes back when they return.
   On iPhone the audio is set to play like a video so the silent switch doesn't mute it, which also lets it keep playing in the background, so the game pauses it itself. */
function audioPause(){const c=Audio_.ctx;if(c&&c.state==='running'){try{c.suspend()}catch(e){}}}
document.addEventListener('visibilitychange',()=>{if(document.hidden)audioPause();else startAudio()});
addEventListener('pagehide',audioPause);addEventListener('blur',()=>{if(document.hidden)audioPause()});
addEventListener('pageshow',()=>{if(!document.hidden)startAudio()});
[PROLOGUE,CH1,CH2,CH3,CH4,CH5,ENDING].forEach(idStatic); /* the steps get their English back, IDs remembered (see trS) */
const FLOW=[...PROLOGUE,{title:{big:'<em>Chapter 1</em>The First Rain',small:'Two and a half years earlier · June 2018',rain:0,time:'4:05 PM'}},...CH1,...CH2,...CH3,...CH4,...CH5,...ENDING];
const FLOW_LBL=(()=>{let cur='Prologue';const who={may:'May',mom:'Mom',thura:'Thura',hnin:'Hnin'};return FLOW.map(st=>{
  if(st&&typeof st==='object'){if(st.title)cur=st.title.big.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();else if(st.scene)cur='Scene: '+(st.scene.cap||st.scene.art||'');else if(st.notify)cur='Chat: '+(who[st.notify.c]||st.notify.c);else if(st.open){const c=st.open.c||st.open;cur='Chat: '+(who[c]||c)}else if(st.friend)cur='Chat: May';else if(st.gallery)cur='Photos';else if(st.lock)cur='Lock screen';}
  return cur})})();
const MAY_AV_AT=FLOW.findIndex(st=>st&&st.pphoto&&st.pphoto.c==='may');
const devT=$('#devT'),devL=$('#devL');devT.max=FLOW.length-1;
devT.oninput=()=>{devL.textContent=devT.value+' · '+FLOW_LBL[devT.value]};
devT.onchange=()=>{const v=devT.value;try{sessionStorage.setItem('bre_jump',v)}catch(e){}
  try{history.replaceState(null,'','#jump='+v)}catch(e){location.hash='jump='+v}
  location.reload()};
/* Dev: jump straight to the ending with 0, 2 or 5 drafts sent (Unsaid / Open door / Until the next rain) */
const DEV_CF=['c1_told_kept','c2_friends','c4_night','c1_wouldnt_mind','c5_station'];
document.querySelectorAll('.devE button').forEach(b=>b.onclick=e=>{e.stopPropagation();const n=+b.dataset.c,fl={};DEV_CF.slice(0,n).forEach(k=>fl[k]=true);
  const v=FLOW.indexOf(ENDING[0]);try{sessionStorage.setItem('bre_jump',v);sessionStorage.setItem('bre_flags',JSON.stringify(fl))}catch(e){}location.reload()});
