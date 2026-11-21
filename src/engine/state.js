/* ============ STATE ============ */
const S={flags:{},memories:[],unsent:[],threads:{},contact:null,speed:1,rain:0,sound:true,busy:false};
const C={
  may:{name:'May Thiri',ini:'MT',img:1,bg:'#F0DACB',fg:'#8F4630'},
  mom:{name:'Mom',ini:'M',img:1,bg:'#CCDAD5',fg:'#1F4643'},
  thura:{name:'Thura',ini:'T',img:1,bg:'#CCDAD5',fg:'#1F4643'},
  hnin:{name:'Hnin',ini:'H',img:1,bg:'#CCDAD5',fg:'#1F4643'},
  min:{name:'Min Htet',ini:'MH',img:0,bg:'#D9E0E8',fg:'#2C3E50'}
};
const $=s=>document.querySelector(s);
const stage=$('#stage');
const sleep=ms=>new Promise(r=>setTimeout(r,ms/S.speed));
const rawSleep=ms=>new Promise(r=>setTimeout(r,ms));
function esc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;')}

