/* Add to Home Screen tip: shown once, in Chapter 1 (step {a2hs:1}, after Hnin's first chat), on phones and tablets in any browser.
   The steps follow the device and browser: iPhone Safari / Chrome / other browsers / in-app browsers (Facebook, Messenger…), Android Chrome / Samsung Internet / in-app. ?tip shows it on load for testing. */
const A2_IC={share:'<svg viewBox="0 0 24 24"><path d="M12 3v12"/><path d="m8 7 4-4 4 4"/><path d="M8 11H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2"/></svg>',
  plus:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  dots:'<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="12" cy="19" r="1.3"/></svg>',
  copy:'<svg viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>',
  hdots:'<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/></svg>',
  lines:'<svg viewBox="0 0 24 24"><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h14"/></svg>',
  open:'<svg viewBox="0 0 24 24"><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/></svg>'};
const A2_IOS3=['check','Tap “Add” in the top corner. Done.'],A2_AND3=['check','Tap “Add” or “Install” to confirm. Done.'];
const A2_V={
  'ios-safari':['iPhone / iPad · Safari',[['share','Tap the Share button at the bottom of Safari (the square with an arrow pointing up).'],['plus','Scroll down and tap “Add to Home Screen”.'],A2_IOS3]],
  'ios-chrome':['iPhone / iPad · Chrome',[['share','Tap the Share button at the top right of Chrome, next to the address bar.'],['plus','Scroll down and tap “Add to Home Screen”.'],A2_IOS3]],
  'ios-other':['iPhone / iPad',[['share','Tap the browser\'s Share button (the square with an arrow pointing up).'],['plus','Scroll down and tap “Add to Home Screen”.'],A2_IOS3]],
  'ios-inapp':['iPhone / iPad',[['open','Tap the menu (···) and choose “Open in external browser” or “Open in Safari”.'],['share','In Safari, tap Share at the bottom, then “Add to Home Screen”.'],A2_IOS3]],
  'ios-msg':['iPhone / iPad · Messenger',[['copy','Tap “Copy link” below. Your progress is in the link.'],['open','Open Safari, paste the link in the address bar and go.'],['share','In Safari, tap Share, then “Add to Home Screen”.']]],
  'and-chrome':['Android · Chrome',[['dots','Tap the menu button (three dots) at the top right of the browser.'],['plus','Tap “Add to Home screen” or “Install app”.'],A2_AND3]],
  'and-samsung':['Android · Samsung Internet',[['lines','Tap the menu button (three lines) at the bottom right.'],['plus','Tap “Add page to”, then “Home screen”.'],['check','Tap “Add” to confirm. Done.']]],
  'and-inapp':['Android',[['open','Tap the menu (three dots) and choose “Open in browser”.'],['dots','In Chrome, tap the menu (three dots), then “Add to Home screen”.'],A2_AND3]]};
function a2hsKind(){const ua=navigator.userAgent,ios=/iPhone|iPad|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1),and=/Android/i.test(ua);
  const inapp=/FBAN|FBAV|FB_IAB|Instagram|Messenger|Line\/|MicroMessenger|Viber|TikTok|musical_ly|Snapchat|; wv\)/i.test(ua);
  /* Messenger on iPhone now reports itself as FBAN/FBIOS like Facebook; Kaung's test (17 Nov 2026): Facebook's has Safari/604.1 and IABMV, Messenger's has neither */
  const msg=/MessengerForiOS|FBAN\/Messenger|FB_IAB\/MESSENGER|Orca-Android/i.test(ua)||(/FBAN\/FBIOS/.test(ua)&&!/Safari\//.test(ua)&&!/IABMV/.test(ua));
  if(ios)return msg?'ios-msg':inapp?'ios-inapp':/CriOS/.test(ua)?'ios-chrome':/FxiOS|EdgiOS|OPiOS|GSA|YaBrowser|DuckDuckGo/.test(ua)?'ios-other':/Safari/.test(ua)?'ios-safari':'ios-inapp';
  /* Android Messenger opens the browser fine with the direct button (Kaung's test), so it gets the same sheet as Facebook */
  if(and)return inapp||msg?'and-inapp':/SamsungBrowser/.test(ua)?'and-samsung':'and-chrome';return null}
function a2hsFill(kind){const [lb,st]=A2_V[kind||'ios-safari'];$('#a2hsLb').textContent=lb;const ia=/inapp|msg/.test(kind||''),ms=/msg/.test(kind||''),ob=$('#a2hsOpen');ob.hidden=!ia;ob.textContent=ms?'Copy link':kind==='and-inapp'?'Open in your browser':'Open in Safari';ob.onclick=e=>{e.stopPropagation();ms?copyOut(ob):openOut()};
  $('#a2hsSteps').innerHTML=st.map(([ic,t],n)=>`<div class="st"><span class="ib"><b>${n+1}</b>${A2_IC[ic]}</span><span class="tx">${t}</span></div>`).join('');uiWalk($('#a2hs'))}
function a2hsShow(){return new Promise(done=>{a2hsFill(a2hsKind());const o=$('#a2hs');o.classList.add('on');try{localStorage.setItem('tib-a2hs','1')}catch(e){}
  const close=e=>{if(e){e.stopPropagation();if(e.currentTarget===o&&e.target!==o)return}o.classList.remove('on');$('#a2hsOk').onclick=null;o.onclick=null;setTimeout(done,300)};
  $('#a2hsOk').onclick=close;o.onclick=close})}
function a2hsDue(){const installed=STANDALONE;let seen=false;try{seen=localStorage.getItem('tib-a2hs')==='1'}catch(e){}
  return !!a2hsKind()&&!installed&&!seen&&!DEVJUMP}
if(/[?&#]tip\b/.test(location.search+location.hash))setTimeout(a2hsShow,1500);
/* In an app's built-in browser (Facebook, Messenger…): before the story starts, ask the player to open the game in Safari / their browser.
   Android opens the browser directly (intent link). iPhone tries Safari's x-safari link; if nothing happens in about a second, the menu steps appear.
   The progress link goes along either way. ?oib shows it for testing. */
function inApp(){return /inapp|msg/.test(a2hsKind()||'')}
/* Messenger blocks the direct jump and its "Open in external browser" opens the original link (no progress), so there the button copies the link with the progress instead */
function isMsg(){return /msg/.test(a2hsKind()||'')}
const IC_OK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
async function copyOut(btn){await carryWrite();const u=location.href;let ok=false;try{await navigator.clipboard.writeText(u);ok=true}catch(e){}
  if(!ok){try{const t=document.createElement('textarea');t.value=u;t.setAttribute('readonly','');t.style.cssText='position:fixed;opacity:0';document.body.appendChild(t);t.select();t.setSelectionRange(0,u.length);ok=document.execCommand('copy');t.remove()}catch(e){}}
  const and=/^and/.test(a2hsKind()||'');toast(S.lang==='my'?(and?'Link ကို copy ကူးပြီးပါပြီ။ Chrome ထဲမှာ paste လုပ်ပါ။':'Link ကို copy ကူးပြီးပါပြီ။ Safari ထဲမှာ paste လုပ်ပါ။'):(and?'Link copied. Paste it in Chrome.':'Link copied. Paste it in Safari.'))
  if(btn){clearTimeout(btn._t);btn.classList.add('ok');btn.innerHTML=IC_OK+' ';btn.append(S.lang==='my'?'Copy ကူးပြီးပါပြီ':'Link copied');btn._t=setTimeout(()=>{btn.classList.remove('ok');btn.textContent=S.lang==='my'?'Link ကို copy ကူးမယ်':'Copy link'},4000)}}
const OIB_STEPS={ios:[['hdots','Tap the menu (···) at the top right.'],['open','Choose “Open in external browser” or “Open in Safari”.']],
  msg:[['hdots','Tap the menu (···).'],['open','Choose “Open in external browser”.']],
  and:[['dots','Tap the menu (three dots) at the top right.'],['open','Choose “Open in browser” or “Open in Chrome”.']]};
async function openOut(){await carryWrite();const and=a2hsKind()==='and-inapp';
  if(and){location.href='intent://'+location.host+location.pathname+location.search+'#Intent;scheme=https;end'}
  else location.href='x-safari-'+location.href;
  return new Promise(r=>setTimeout(()=>r(document.visibilityState==='visible'),1300))}
function oibDue(){if(DEVJUMP||STANDALONE)return false;if(/[?&#]oib\b/.test(location.search+location.hash))return true;if(!inApp())return false;try{if(sessionStorage.getItem('tib-oib'))return false}catch(e){}return !libState().any}
function oibShow(){return new Promise(done=>{const kd=a2hsKind()||'',and=/^and/.test(kd),msg=isMsg(),o=$('#oib');
  $('#oibH').textContent=and?'Open in your browser':'Open in Safari';$('#oibGo').textContent=and?'Open in your browser':'Open in Safari';
  $('#oibP').textContent=and?'You\'re in an app\'s built-in browser. The game plays best in your browser, where you can also add it to your Home Screen.':'You\'re in an app\'s built-in browser. The game plays best in Safari, where you can also add it to your Home Screen.';
  $('#oibSteps').innerHTML=OIB_STEPS[msg?'msg':and?'and':'ios'].map(([ic,t],n)=>`<div class="st"><span class="ib"><b>${n+1}</b>${A2_IC[ic]}</span><span class="tx">${t}</span></div>`).join('');
  $('#oibHelp').hidden=!msg;$('#oibHl').textContent=msg?'How to open it':'If nothing happened';const go=$('#oibGo');go.hidden=msg&&!libState().any;if(msg)go.textContent='Copy link';uiWalk(o);o.classList.add('on');try{sessionStorage.setItem('tib-oib','1')}catch(e){}
  $('#oibGo').onclick=async e=>{e.stopPropagation();if(msg){copyOut($('#oibGo'));return}const stuck=await openOut();if(stuck){$('#oibHelp').hidden=false;$('#oibGo').textContent='Try again';uiWalk(o)}};
  $('#oibStay').onclick=e=>{e.stopPropagation();o.classList.remove('on');setTimeout(done,300)};o.onclick=e=>e.stopPropagation()})}
