/* ============ RAIN CANVAS ============ */
function Rain(cv,opts){const ctx=cv.getContext('2d');let drops=[];const o=Object.assign({color:'170,195,210'},opts);
  function size(){const r=cv.getBoundingClientRect();cv.width=r.width*devicePixelRatio;cv.height=r.height*devicePixelRatio;}
  size();addEventListener('resize',size);
  function tick(){const n=[0,60,160,320][o.level()]||0;while(drops.length<n)drops.push(mk(true));if(drops.length>n)drops.length=n;
    ctx.clearRect(0,0,cv.width,cv.height);ctx.strokeStyle=`rgba(${o.color},.35)`;ctx.lineWidth=1*devicePixelRatio;ctx.beginPath();
    for(const d of drops){ctx.moveTo(d.x,d.y);ctx.lineTo(d.x-d.l*.12,d.y+d.l);d.y+=d.v;d.x-=d.v*.12;if(d.y>cv.height){Object.assign(d,mk(false))}}
    ctx.stroke();requestAnimationFrame(tick);}
  function mk(any){return{x:Math.random()*cv.width*1.1,y:any?Math.random()*cv.height:-20,l:(10+Math.random()*18)*devicePixelRatio,v:(9+Math.random()*9)*devicePixelRatio}}
  tick();}
Rain($('#bgRain'),{level:()=>S.rain});
function setRain(n){S.rain=n;Audio_.level();}

