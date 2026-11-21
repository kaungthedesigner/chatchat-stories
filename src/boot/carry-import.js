/* Progress carried in the link (?p=…; older links used #p=). iPhone keeps separate storage for an app's built-in browser (Facebook, Messenger…), Safari and the Home Screen app,
   so the game keeps the player's progress in the page link and picks it up after a move. A browser takes it only if it has no progress of its own and the
   link is a hand-off written in an app's built-in browser (h:1) and fresh (5 minutes); a new Home Screen app takes it at any age.
   Links written in Safari/Chrome (h:0) are only for the Home Screen app, so a Home Screen icon shared with a friend never starts them halfway. */
(function(){var h=location.hash,q=location.search,m=/[#&]p=([A-Za-z0-9_-]+)/.exec(h)||/[?&]p=([A-Za-z0-9_-]+)/.exec(q);if(!m)return;
  var clean=location.pathname+q.replace(/[?&]p=[^&]*/,'').replace(/^&/,'?');
  /* Home Screen app: on iPhone only navigator.standalone counts, since some in-app browsers (Messenger…) also match display-mode: standalone */
  var ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  var sa=ios?navigator.standalone===true:!!(window.matchMedia&&(matchMedia('(display-mode: standalone)').matches||matchMedia('(display-mode: fullscreen)').matches));
  function load(){try{return JSON.parse(localStorage.getItem('chatchat.saves.v1')||'{}')||{}}catch(e){return {}}}
  var v=load().bre,own=!!(v&&(v.started||(v.done&&v.done.length)||v.cur>0));
  if(own){try{history.replaceState(null,'',clean)}catch(e){}return}
  window.__CARRY=1;document.documentElement.style.visibility='hidden';
  function b64(c){c=c.replace(/-/g,'+').replace(/_/g,'/');while(c.length%4)c+='=';var b=atob(c),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u}
  function dec(c){var t=c.charAt(0),u=b64(c.slice(1));if(t==='z'&&window.DecompressionStream)return new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();if(t==='j')return Promise.resolve(new TextDecoder().decode(u));return Promise.reject(0)}
  function go(){try{location.replace(clean)}catch(e){location.href=clean}}
  try{dec(m[1]).then(function(t){var p=JSON.parse(t);if(!p||!p.s||!p.t)throw 0;if(!sa&&(!p.h||Date.now()-p.t>3e5))throw 0;
    var all=load();for(var k in p.s){var e=(all[k]&&all[k].ends)||[],n=p.s[k];n.ends=(n.ends||[]).concat(e.filter(function(x){return (n.ends||[]).indexOf(x)<0}));all[k]=n}
    localStorage.setItem('chatchat.saves.v1',JSON.stringify(all));if(p.l)localStorage.setItem('tib-lang',p.l);if(p.a)localStorage.setItem('tib-a2hs','1');go()}).catch(go)}catch(e){go()}})();
