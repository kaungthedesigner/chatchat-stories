/* ============ STATE ============ */
const S={flags:{},memories:[],unsent:[],threads:{},contact:null,speed:1,rain:0,sound:true,busy:false};
const $=s=>document.querySelector(s);
const stage=$('#stage');
const sleep=ms=>new Promise(r=>setTimeout(r,ms/S.speed));
const rawSleep=ms=>new Promise(r=>setTimeout(r,ms));
function esc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;')}

