/* Saved positions survive story edits: next to the step number the save keeps a fingerprint of the step and which save point of its chapter it was.
   After an update the game finds the same step again (nearest match in the same chapter), else the same save point by order, else the chapter start. */
function stepSig(i){const st=FLOW[i];let t;try{t=JSON.stringify(st)}catch(e){t=String(i)}let h=5381;for(let c=0;c<t.length;c++)h=((h<<5)+h+t.charCodeAt(c))|0;return (h>>>0).toString(36)}
function chRange(k){const a=CH_START[k],b=k+1<CH_START.length?CH_START[k+1]:FLOW.length;return [a,b]}
function isSafe(i){const st=FLOW[i];const kk=st&&typeof st==='object'?Object.keys(st)[0]:null;return !!(kk&&SAFE.includes(kk))}
function posMark(i){const k=chOf(i),[a]=chRange(k);let n=0;for(let j=a;j<i;j++)if(isSafe(j))n++;return {sig:stepSig(i),n}}
function posAt(p){if(!p)return null;const k=p.k,[a,b]=chRange(k);
  if(p.sig===undefined)return p.i>=a&&p.i<b?p.i:a;   /* old saves without a fingerprint */
  if(p.i>=a&&p.i<b&&stepSig(p.i)===p.sig)return p.i;
  let best=-1;for(let j=a;j<b;j++)if(isSafe(j)&&stepSig(j)===p.sig&&(best<0||Math.abs(j-p.i)<Math.abs(best-p.i)))best=j;if(best>=0)return best;
  let n=0,last=a;for(let j=a;j<b;j++)if(isSafe(j)){if(n===p.n)return j;last=j;n++}
  return a}
async function runFlow(i){for(;i<FLOW.length;i++){S.ch=chOf(i);if(S.ch!==PRE_CH){PRE_CH=S.ch;preCh(S.ch)}S.at=i;devT.value=i;devL.textContent=i+' · '+FLOW_LBL[i];
  if(!DEVJUMP){if(!sv().started&&i>FIRST_SAFE){sv().started=true;persist()}const st=FLOW[i];const kk=st&&typeof st==='object'?Object.keys(st)[0]:null;if(kk&&SAFE.includes(kk)){const v=sv();v.pos={i,k:chOf(i),s:snap(),...posMark(i)};persist()}
    const k=CH_START.indexOf(i);if(k>=0){const v=sv();v.cps[k]=snap();v.cur=k;if(k>0)markDone(k-1);persist()}
    if(CH_END[i]!==undefined){markDone(CH_END[i]);const v=sv();v.cps[CH_END[i]+1]=snap();v.cur=CH_END[i]+1;if(CH_END[i]>=CH_START.length-1)v.replay=false;persist()}
    if(FLOW[i]&&FLOW[i].end!==undefined)markDone(FLOW[i].end)}
  await exec(FLOW[i])}}
FIRST_SAFE=FIRST_SAFE_OF();
function libState(){const v=sv();const played=CH_START.length;
  const nextK=(()=>{for(let k=0;k<played;k++)if(!v.done.includes(k))return k;return null})();
  /* Opening the game starts the Prologue by itself, which saves a position at the first lock screen. That alone is not progress: the story counts as started only once the player gets past it. */
  const any=!!v.started||v.done.length>0||(v.cur!==null&&v.cur>0)||!!(v.pos&&v.pos.i>FIRST_SAFE);const frac=v.done.filter(k=>k<played).length/played;
  const replayK=v.replay&&v.pos?v.pos.k:null;
  return {v,nextK,any,frac,replayK,started:any}}
const ST_IC={'Coming soon':'hourglass','Played':'check-circle','In progress':'circle-half','Up next':'play-circle','Locked':'lock'};
function renderLib(){const {v,nextK,any,frac,replayK,started}=libState();const C_=STORY.chapters;
  $('#go').textContent=!any?'Begin':nextK===null&&replayK===null?'Play again':'Continue';
  $('#libPr').classList.toggle('on',!!any);$('#libBar').style.width=Math.round(frac*100)+'%';
  const wk=replayK!==null?replayK:nextK;const rp=replayK!==null&&v.done.includes(replayK);$('#libWhere').textContent=wk===null?'All chapters so far finished':(wk===0?'Prologue':C_[wk].n==='E'?'Ending':'Chapter '+wk+' · '+C_[wk].t)+(rp?' · replaying':'');
  $('#chList').innerHTML=C_.map((c,k)=>{const done=v.done.includes(k),open=!c.soon&&(k===0||done||v.done.includes(k-1)||v.cps[k]);const cls=c.soon?'lock':done?'done':open?'next':'lock';
    const rep=done&&replayK===k;const st=c.soon?'Coming soon':rep?'In progress':done?'Played':open?(started&&((v.pos&&v.pos.k===k)||(v.cps[k]&&v.cur===k))?'In progress':'Up next'):'Locked';
    const tag=open?'button':'div';
    return `<${tag} class="cr ${cls}" data-k="${k}"><div class="n">${c.n}</div><div class="t"><b>${k===0?'Prologue':c.n==='E'?'Ending'+(v.ending?' · '+END_NAME[v.ending]:' · '+c.t):'Chapter '+c.n+' · '+c.t}</b><span>${c.n==='E'&&(v.ends||[]).length?(v.ends.length+' of 3 endings found'):c.d}</span></div><div class="st" title="${st}"><span class="ic i-${ST_IC[st]}" aria-hidden="true"></span><span class="sr">${st}</span></div></${tag}>`}).join('');
  $('#chList').querySelectorAll('button.cr').forEach(b=>b.onclick=e=>{e.stopPropagation();const k=+b.dataset.k;playFrom(k,!v.done.includes(k)||replayK===k)});
  $('#chOver').classList.remove('sure');$('#chOver').textContent='Start over';$('#chOver').style.display=any?'':'none';}
// Replaying never locks chapters already played: v.done is kept, and v.replay marks a replay in progress so Continue resumes it
async function playFrom(k,resume){S.pendTime=null;pinPage();startAudio();const v=sv();let at;
  if(v.done.includes(k)&&!(resume&&v.replay&&v.pos&&v.pos.k===k)){v.replay=true;v.pos=null;persist()}else if(!v.done.includes(k))v.replay=false;
  if(resume&&v.pos&&v.pos.k===k){at=posAt(v.pos);restore(at===CH_START[k]&&v.pos.i!==at&&v.cps[k]?v.cps[k]:v.pos.s)}
  else{if(k>0&&!v.cps[k])k=0;restore(k>0?v.cps[k]:{});at=CH_START[k]}
  document.body.classList.add('playing');
  $('#start').classList.remove('on');await rawSleep(600);$('#start').classList.remove('chap');
  await runFlow(at);}
$('#go').onclick=e=>{e.stopPropagation();if(oibDue())setTimeout(oibShow,1200);const {nextK,replayK}=libState();if(replayK!==null)playFrom(replayK,true);else if(nextK!==null)playFrom(nextK,true);else playFrom(0,false)};
$('#bExit').onclick=e=>{e.stopPropagation();const v=sv();const p=v.pos;
  $('#leaveP').textContent=DEVJUMP?'Dev jump: progress from here is not saved.':'Your progress is saved. Next time you\'ll pick up from the start of this chat or scene.';$('#leave').classList.add('on')};
$('#leave').onclick=e=>{e.stopPropagation();if(e.target.id==='leave')$('#leave').classList.remove('on')};
$('#leaveStay').onclick=e=>{e.stopPropagation();$('#leave').classList.remove('on')};
$('#leaveGo').onclick=e=>{e.stopPropagation();try{sessionStorage.setItem('bre_home','1')}catch(_){ }try{history.replaceState(null,'',location.pathname+location.search)}catch(_){ }location.reload()};
$('#hero').onclick=e=>{e.stopPropagation();$('#go').click()};
$('#libCh').onclick=e=>{e.stopPropagation();renderLib();$('#start').classList.add('chap')};
$('#chBack').onclick=e=>{e.stopPropagation();$('#start').classList.remove('chap')};
$('#chOver').onclick=e=>{e.stopPropagation();const b=$('#chOver');if(!b.classList.contains('sure')){b.classList.add('sure');b.textContent='Tap again to start from the Prologue';return}
  /* Start over is a full reset: chapters lock again, choices, memories and saves are cleared; only the endings found carry over */const ends=sv().ends;SAVES[STORY.id]={cps:{},done:[],cur:null};if(ends&&ends.length)sv().ends=ends;persist();playFrom(0,false)};
renderLib();
