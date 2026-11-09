import numpy as np, wave, sys
sr=48000; rng=np.random.default_rng(11)
D=0.95; n=int(sr*D); t=np.arange(n)/sr
def lp(x,fc):
    a=np.broadcast_to(np.exp(-2*np.pi*np.asarray(fc,dtype=float)/sr),x.shape); y=np.zeros_like(x); s=0.0
    for i in range(len(x)): s=a[i]*s+(1-a[i])*x[i]; y[i]=s
    return y
def bp(x,lo,hi): y=lp(x,np.full(len(x),hi)); return y-lp(y,np.full(len(x),lo))
t0=0.04; tt=np.clip(t-t0,0,None); on=t>=t0
# soft whoosh in (no sharp transient): 40 ms swell
sw=bp(rng.standard_normal(n),600,2500)*np.clip(t/t0,0,1)**2*np.exp(-np.clip(t-t0,0,None)/0.05)*0.35
# main body of water: slow-ish rise (25 ms), muffled, heavily "gurgled"
gurg=lp(np.abs(rng.standard_normal(n)),np.full(n,30.0)); gurg/=gurg.max()
env=np.where(on,(1-np.exp(-tt/0.025))*np.exp(-tt/0.22),0)
body=bp(rng.standard_normal(n),250,np.where(on,1200+1800*np.exp(-tt/0.15),3000))*env*(0.3+1.7*gurg)*1.2
# bubbles / plips: the "watery" part — upward chirps, many, mid range
drops=np.zeros(n)
for _ in range(110):
    at=t0+rng.exponential(0.16)
    if at>D-0.06: continue
    i0=int(at*sr); L=int(sr*0.045); tl=np.arange(L)/sr
    f0=rng.uniform(500,1800); rise=rng.uniform(1.6,2.6)
    f=f0*(1+(rise-1)*tl/0.045); ph=2*np.pi*np.cumsum(f)/sr
    g=np.sin(np.pi*np.clip(tl/0.004,0,.5))*np.exp(-tl/rng.uniform(0.008,0.02))*rng.uniform(0.05,0.18)*np.exp(-(at-t0)/0.4)
    e=min(n,i0+L); drops[i0:e]+=(np.sin(ph)*g)[:e-i0]
x=sw+body+drops
x=lp(x,np.full(n,6000.0))
x[-int(sr*0.15):]*=np.linspace(1,0,int(sr*0.15))
x=x/np.max(np.abs(x))*0.85
with wave.open(sys.argv[1],'wb') as f:
    f.setnchannels(1);f.setsampwidth(2);f.setframerate(sr);f.writeframes((x*32767).astype('<i2').tobytes())
