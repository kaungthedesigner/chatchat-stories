/* ============ SCENE ============ */
let dlgTyping=false,dlgSkip=false;
async function dialog(name,text,cls){const d=$('#dlg');d.innerHTML=`${name?`<div class="nm">${esc(name)}</div>`:''}<div class="tx ${cls||''}"></div><div class="more" style="display:none">Tap to continue</div>`;
  const tx=d.querySelector('.tx');dlgTyping=true;dlgSkip=false;
  const skipH=()=>{dlgSkip=true};stage.addEventListener('click',skipH,{once:true});
  for(let i=1;i<=text.length;i++){if(S.langSwitched){storyMaps();const t2=swapT(text);if(t2!==text){text=t2;i=Math.min(i,text.length)}}if(dlgSkip){tx.textContent=text;break}tx.textContent=text.slice(0,i);await rawSleep(Math.max(6,22/S.speed))}
  stage.removeEventListener('click',skipH);dlgTyping=false;d.querySelector('.more').style.display='block';await waitStage(150);}


