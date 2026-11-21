(()=>{if(!DEV_ON)return;let j=null;try{j=sessionStorage.getItem('bre_jump');sessionStorage.removeItem('bre_jump')}catch(e){}
  const m=/jump=(\d+)/.exec(location.hash);if(m){j=m[1];try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}}
  if(j!==null){try{const f=JSON.parse(sessionStorage.getItem('bre_flags')||'null');sessionStorage.removeItem('bre_flags');if(f)Object.assign(S.flags,f)}catch(e){}DEVJUMP=true;document.body.classList.add('playing');$('#start').classList.remove('on');setTimeout(()=>runFlow(+j),300)}})();
audioPreload();
// While there is only one story, opening the game goes straight into it; the Stories home is still one tap away (back arrow)
(()=>{if(DEVJUMP||STORIES.length>1||window.__CARRY)return;let home=false;try{home=sessionStorage.getItem('bre_home')==='1';sessionStorage.removeItem('bre_home')}catch(e){}
  if(home)return;const {nextK,replayK}=libState();const startK=replayK!==null?replayK:nextK;if(startK===null)return;
  $('#start').classList.remove('on');document.body.classList.add('playing');
  // Phones only allow audio after a tap ends (touchend/click), not on touch start, so listen to those and keep listening until audio is really running
  const EVS=['pointerup','touchend','click','keydown'];
  const wake=e=>{if(e&&e.target&&e.target.closest&&e.target.closest('#bSound'))return;if(!S.sound){EVS.forEach(n=>removeEventListener(n,wake,true));return}startAudio();setTimeout(()=>{if(Audio_.ctx&&Audio_.ctx.state==='running')EVS.forEach(n=>removeEventListener(n,wake,true))},60)};
  EVS.forEach(n=>addEventListener(n,wake,true));
  if(oibDue())setTimeout(oibShow,1200);playFrom(startK,true);})();
