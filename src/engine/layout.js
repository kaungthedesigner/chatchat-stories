/* ============ LAYOUT ============ */
// the visible height: in-app browsers (Messenger, Facebook) and Safari's toolbars cover part of innerHeight, so take the smallest
const STANDALONE=(/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1))?navigator.standalone===true:!!(window.matchMedia&&(matchMedia('(display-mode: standalone)').matches||matchMedia('(display-mode: fullscreen)').matches));
/* In a browser, take the smallest height so toolbars never cover the game. Opened from the Home Screen there are no toolbars,
   and iOS reports some heights without the status bar, which left a dark strip at the bottom: use the largest. */
function viewH(){const v=window.visualViewport,hs=[innerHeight,v?v.height:innerHeight,document.documentElement.clientHeight||innerHeight];
  return Math.round(STANDALONE?Math.max(...hs,screen.height&&Math.abs(screen.width-innerWidth)<2?screen.height:0):Math.min(...hs))}
function viewW(){const v=window.visualViewport;return Math.round(Math.min(innerWidth,v?v.width:innerWidth,document.documentElement.clientWidth||innerWidth))}
function fit(){const sc=$('#scaler'),W=viewW(),H=viewH(),m=W<520;document.body.classList.toggle('m',m);document.documentElement.style.setProperty('--app-h',H+'px');
  const top=$('.wrap').getBoundingClientRect().top;
  if(m){sc.style.transform='none';sc.style.width=W+'px';sc.style.height=(H-top)+'px';stage.style.width=W+'px';stage.style.height=(H-top)+'px';stage.classList.add('full');return}
  stage.style.width='';stage.style.height='';
  const s=Math.min((H-top-12)/852,W/393,1.2);
  sc.style.transform=`scale(${s})`;sc.style.width=393+'px';sc.style.height=852*s+'px';stage.classList.remove('full');
  S.scale=s;}

/* The page itself must never scroll: on iPhone, scrolling the home list past its end could move the whole page, and the story then opened shifted with its bottom cut off */
function pinPage(){if(window.scrollY||window.scrollX)window.scrollTo(0,0);const se=document.scrollingElement;if(se&&se.scrollTop)se.scrollTop=0;if(document.body.scrollTop)document.body.scrollTop=0}
addEventListener('scroll',pinPage,{passive:true});if(window.visualViewport)visualViewport.addEventListener('scroll',pinPage);
addEventListener('resize',fit);addEventListener('orientationchange',()=>setTimeout(fit,250));
if(window.visualViewport)visualViewport.addEventListener('resize',fit);
fit();addEventListener('load',fit);[300,1000,2500].forEach(t=>setTimeout(fit,t));
addEventListener('keydown',e=>{if(e.metaKey||e.ctrlKey||e.altKey||/input|textarea/i.test((e.target.tagName||'')))return;
  if(e.key==='Escape'&&document.body.classList.contains('playing')){e.preventDefault();if($('#leave').classList.contains('on'))$('#leave').classList.remove('on');else $('#bExit').click();return}
  if($('#leave').classList.contains('on')){if(e.key==='Enter'){e.preventDefault();$('#leaveStay').click()}return}
  const vis=el=>el&&el.offsetParent!==null&&getComputedStyle(el).visibility!=='hidden';
  if(e.key>='1'&&e.key<='9'){const os=[...document.querySelectorAll('#stage .opt,#stage .dbtns button')].filter(vis);const b=os[+e.key-1];if(b){e.preventDefault();b.click()}return}
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){const f=$('#wsField');if(f&&$('#wstreet').classList.contains('on')&&f.onpointerdown){e.preventDefault();const r=f.getBoundingClientRect();f.onpointerdown({stopPropagation(){},clientX:e.key==='ArrowLeft'?r.left+5:r.right-5,clientY:r.top+r.height/2})}return}
  if(e.key===' '||e.key==='Enter'){if(vis($('#go'))&&$('#start').classList.contains('on')){e.preventDefault();$('#go').click();return}
    const btn=[...document.querySelectorAll('#stage .ov.on button,#stage .view.on button.cta,#wsCard button,#pdPick button')].filter(vis)[0];if(btn&&e.key==='Enter'){e.preventDefault();btn.click();return}
    e.preventDefault();stage.dispatchEvent(new MouseEvent('click',{bubbles:true}))}});
$('#bDev').onclick=e=>{e.stopPropagation();document.body.classList.toggle('dev');fit()};

