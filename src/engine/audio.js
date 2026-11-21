/* ============ AUDIO ============ */
const Audio_={ctx:null,gain:null,
  init(){ if(this.ctx) return; try{
    try{if(navigator.audioSession)navigator.audioSession.type='playback'}catch(e){} /* iPhone: play even with the silent switch on, like a video */
    const ctx=new (window.AudioContext||window.webkitAudioContext)(); this.ctx=ctx;
    ctx.onstatechange=()=>sndSync();
    const len=ctx.sampleRate*4, buf=ctx.createBuffer(2,len,ctx.sampleRate);
    for(let ch=0;ch<2;ch++){const d=buf.getChannelData(ch);let b0=0,b1=0,b2=0;for(let i=0;i<len;i++){const w=Math.random()*2-1;b0=.99765*b0+w*.099;b1=.963*b1+w*.2965;b2=.57*b2+w*1.0526;d[i]=(b0+b1+b2+w*.1848)*.11;}}
    const src=ctx.createBufferSource();src.buffer=buf;src.loop=true;
    const hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=400;
    const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=5200;
    this.gain=ctx.createGain();this.gain.gain.value=0;
    src.connect(hp).connect(lp).connect(this.gain).connect(ctx.destination);src.start();
  }catch(e){this.ctx=null}},
  // call sounds, all made here (no files): ringtone, ringback, connect, fast-forward whirr, hang-up
  tone(f,t0,d,v,type){const c=this.ctx,o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.value=f;g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(v,t0+.015);g.gain.setValueAtTime(v,t0+Math.max(.02,d-.06));g.gain.exponentialRampToValueAtTime(.0001,t0+d);o.connect(g).connect(c.destination);o.start(t0);o.stop(t0+d+.05);return o},
  ring(){if(!this.ctx||!S.sound)return;const t=this.ctx.currentTime;[784,988,1175,988,784,988,1175,1568].forEach((f,i)=>this.tone(f,t+i*.13,.22,.05,'triangle'))},
  ringback(){if(!this.ctx||!S.sound)return;const t=this.ctx.currentTime;this.tone(425,t,1.0,.035);this.tone(450,t,1.0,.02)},
  connect(){if(!this.ctx||!S.sound)return;const t=this.ctx.currentTime;this.tone(880,t,.09,.05);this.tone(1320,t+.11,.12,.05)},
  hangup(){if(!this.ctx||!S.sound)return;const t=this.ctx.currentTime;[620,520,420].forEach((f,i)=>this.tone(f,t+i*.2,.16,.05))},
  whirr(sec){if(!this.ctx||!S.sound)return;try{const c=this.ctx,t=c.currentTime,n=c.sampleRate*sec,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);
    for(let i=0;i<n;i++)d[i]=Math.random()*2-1;const src=c.createBufferSource();src.buffer=b;
    const bp=c.createBiquadFilter();bp.type='bandpass';bp.Q.value=6;bp.frequency.setValueAtTime(500,t);bp.frequency.exponentialRampToValueAtTime(2600,t+sec*.35);bp.frequency.setValueAtTime(2600,t+sec*.8);bp.frequency.exponentialRampToValueAtTime(700,t+sec);
    const g=c.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.16,t+.25);g.gain.setValueAtTime(.16,t+sec-.35);g.gain.linearRampToValueAtTime(0,t+sec);
    const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=14;lg.gain.value=220;lfo.connect(lg).connect(bp.frequency);
    const sq=c.createOscillator(),sg=c.createGain();sq.type='sawtooth';sq.frequency.setValueAtTime(180,t);sq.frequency.exponentialRampToValueAtTime(1400,t+sec*.4);sq.frequency.exponentialRampToValueAtTime(300,t+sec);
    const sl=c.createBiquadFilter();sl.type='lowpass';sl.frequency.value=1800;sg.gain.setValueAtTime(0,t);sg.gain.linearRampToValueAtTime(.025,t+.3);sg.gain.linearRampToValueAtTime(0,t+sec);
    src.connect(bp).connect(g).connect(c.destination);sq.connect(sl).connect(sg).connect(c.destination);
    src.start(t);lfo.start(t);sq.start(t);src.stop(t+sec+.05);lfo.stop(t+sec+.05);sq.stop(t+sec+.05)}catch(e){}},
  // water street: song (decoded into the same AudioContext, so iPhones play it), splash, truck horn
  song:null,songBuf:null,songNode:null,songGain:null,
  songLoad(){if(this.songBuf||this._sl)return;this._sl=1;try{fetch('img/ws-song.mp3').then(r=>r.arrayBuffer()).then(ab=>{this.init();if(!this.ctx)return;return new Promise((res,rej)=>this.ctx.decodeAudioData(ab,res,rej))}).then(b=>{if(b)this.songBuf=b}).catch(()=>{this._sl=0})}catch(e){this._sl=0}},
  songStart(){if(!S.sound)return;this.init();const c=this.ctx;if(!c)return;if(c.state==='suspended')c.resume();this.songStop(0);
    const go=()=>{if(!this.songBuf)return false;const src=c.createBufferSource(),g=c.createGain();src.buffer=this.songBuf;g.gain.value=.25;src.connect(g).connect(c.destination);src.start();this.songNode=src;this.songGain=g;return true};
    if(!go()){this.songLoad();let n=0;const t=setInterval(()=>{if(go()||++n>40)clearInterval(t)},100)}},
  songStop(ms){const c=this.ctx,g=this.songGain,n=this.songNode;if(!c||!g||!n)return;this.songNode=null;this.songGain=null;const t=c.currentTime,d=(ms||0)/1000;
    try{g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(0,t+Math.max(.02,d));n.stop(t+Math.max(.03,d)+.05)}catch(e){}},
  // water splash: no sound for now (Kaung removed it; add one back here)
  splash(big){},
  // scene music (soft loops; Magnific music in snd/, Thingyan reuses the water-street song), crossfaded; one at a time, under the rain
  ambBufs:{},ambName:null,ambWant:null,ambNode:null,ambGain:null,
  ambLoad(n){if(this.ambBufs[n])return Promise.resolve(this.ambBufs[n]);this.init();if(!this.ctx)return Promise.resolve(null);
    return fetch(MUS_FILE[n]||('snd/mus-'+n+'.mp3')).then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).then(ab=>new Promise((res,rej)=>this.ctx.decodeAudioData(ab,res,rej))).then(b=>{this.ambBufs[n]=b;return b}).catch(()=>null)},
  amb(n){this.ambWant=n||null;const target=S.sound?this.ambWant:null;if(target===this.ambName)return;
    const c=this.ctx;if(c&&this.ambNode){const g=this.ambGain,nd=this.ambNode,t=c.currentTime;try{g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(0,t+1.2);nd.stop(t+1.3)}catch(e){}}
    this.ambNode=null;this.ambGain=null;this.ambName=target;if(!target)return;
    this.ambLoad(target).then(b=>{if(!b||this.ambName!==target||this.ambNode)return;const c=this.ctx;if(c.state==='suspended')c.resume();
      const src=c.createBufferSource(),g=c.createGain();src.buffer=b;src.loop=true;src.loopStart=.06;src.loopEnd=Math.max(1,b.duration-.06);g.gain.value=0;src.connect(g).connect(c.destination);const t=c.currentTime;
      src.start(t,Math.random()*Math.max(0,b.duration-2));g.gain.linearRampToValueAtTime(AMB_VOL[target]||.4,t+1.6);this.ambNode=src;this.ambGain=g})},
  // one-shot SFX files (Magnific, approved): snd/shutter.mp3, snd/splash.mp3
  sfxBufs:{},
  sfxLoad(n){if(this.sfxBufs[n]!==undefined)return;this.sfxBufs[n]=null;this.init();if(!this.ctx)return;
    fetch('snd/'+n+'.mp3').then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).then(ab=>new Promise((res,rej)=>this.ctx.decodeAudioData(ab,res,rej))).then(b=>{this.sfxBufs[n]=b}).catch(()=>{delete this.sfxBufs[n]})},
  sfx(n,vol,rate,max){const b=this.sfxBufs[n];if(!b||!this.ctx||!S.sound)return false;try{const c=this.ctx;if(c.state==='suspended')c.resume();const src=c.createBufferSource(),g=c.createGain(),t=c.currentTime,v=vol||1;src.buffer=b;src.playbackRate.value=rate||1;g.gain.setValueAtTime(v,t);src.connect(g).connect(c.destination);src.start(t);if(max){g.gain.setValueAtTime(v,t+max-.15);g.gain.linearRampToValueAtTime(0,t+max);src.stop(t+max+.02)}return true}catch(e){return false}},
  // camera shutter: two short mechanical clicks (curtain open, curtain close) over a tiny low thunk
  shutter(){if(!S.sound)return;this.init();const c=this.ctx;if(!c)return;if(c.state==='suspended')c.resume();if(this.sfx('shutter',.9))return;try{const t=c.currentTime,sr=c.sampleRate;
    const click=(at,vol,fq)=>{const n=Math.floor(sr*.028),b=c.createBuffer(1,n,sr),x=b.getChannelData(0);for(let i=0;i<n;i++)x[i]=(Math.random()*2-1)*Math.pow(1-i/n,6);
      const src=c.createBufferSource();src.buffer=b;const f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=fq;f.Q.value=1.4;const g=c.createGain();g.gain.value=vol;src.connect(f).connect(g).connect(c.destination);src.start(at)};
    click(t,.9,3200);click(t+.075,.7,2300);
    const o=c.createOscillator(),og=c.createGain();o.type='sine';o.frequency.setValueAtTime(240,t);o.frequency.exponentialRampToValueAtTime(90,t+.07);og.gain.setValueAtTime(.12,t);og.gain.exponentialRampToValueAtTime(.001,t+.09);o.connect(og).connect(c.destination);o.start(t);o.stop(t+.1)}catch(e){}},
  horn(){if(!this.ctx||!S.sound)return;const t=this.ctx.currentTime;[0,.42].forEach(d=>{this.tone(392,t+d,.3,.045,'square');this.tone(494,t+d,.3,.035,'square')})},
  level(){ if(!this.ctx||!this.gain) return; const v=S.sound?[0,.012,.0264,.048][S.rain]||0:0; /* 40% quieter (Kaung, 10 Nov), then 60% quieter again (17 Nov) */ this.gain.gain.setTargetAtTime(v,this.ctx.currentTime,.25); },
  blip(hi){ if(!this.ctx||!S.sound) return; try{const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type='sine';o.frequency.value=hi?880:660;g.gain.value=0;o.connect(g).connect(this.ctx.destination);const t=this.ctx.currentTime;g.gain.linearRampToValueAtTime(.06,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+.18);o.start(t);o.stop(t+.2);}catch(e){} }
};

