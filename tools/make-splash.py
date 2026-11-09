import numpy as np, wave, sys
sr=48000; rng=np.random.default_rng(int(sys.argv[2]) if len(sys.argv)>2 else 7)
D=0.95; n=int(sr*D); t=np.arange(n)/sr; out=np.zeros(n)
def onepole_lp(x,fc):
    # time-varying one-pole lowpass; fc array
    a=np.exp(-2*np.pi*np.asarray(fc)/sr); y=np.zeros_like(x); s=0.0
    a=np.broadcast_to(a,x.shape)
    for i in range(len(x)): s=a[i]*s+(1-a[i])*x[i]; y[i]=s
    return y
def hp(x,fc):
    return x-onepole_lp(x,np.full(len(x),fc))
def bp(x,lo,hi): return hp(onepole_lp(x,np.full(len(x),hi)),lo)
w=rng.standard_normal(n)
# 1. water leaving the bucket: short rising airy swish (0-0.07s)
sw=np.zeros(n); m=t<0.09
env=np.where(m,np.sin(np.pi*np.clip(t/0.09,0,1))**2,0)
sw=bp(w,900,4000)*env*0.18
# 2. the slap: broadband hit at 0.07s, bright then darkening
t0=0.07; k=t>=t0; tt=np.clip(t-t0,0,None)
slap_env=np.where(k,(1-np.exp(-tt/0.003))*np.exp(-tt/0.11),0)
fc=np.where(k,900+5500*np.exp(-tt/0.06),5000)
slap=onepole_lp(w,fc); slap=hp(slap,250)*slap_env*1.6
# body thud
body=np.where(k,np.sin(2*np.pi*(95*tt+40*np.exp(-tt/0.05)*0.05))*np.exp(-tt/0.06),0)*0.35
# 3. sheet of water hitting ground: noisy wash tail
wash_env=np.where(k,(1-np.exp(-tt/0.02))*np.exp(-tt/0.28),0)
rough=onepole_lp(np.abs(rng.standard_normal(n)),np.full(n,45.0)); rough=rough/rough.max()
wash=bp(rng.standard_normal(n),350,2800)*wash_env*(0.4+1.6*rough)*0.5
# 4. droplets: many tiny resonant plips scattered after the slap
drops=np.zeros(n)
for _ in range(70):
    at=t0+0.02+rng.exponential(0.18)
    if at>D-0.05: continue
    i0=int(at*sr); L=int(sr*0.03); tl=np.arange(L)/sr
    f0=rng.uniform(1500,4200); f1=f0*rng.uniform(1.3,1.9)
    ph=2*np.pi*(f0*tl+(f1-f0)*tl**2/(2*0.03))
    g=np.exp(-tl/rng.uniform(0.004,0.009))*rng.uniform(0.04,0.14)*np.exp(-(at-t0)/0.35)
    seg=np.sin(ph)*g; e=min(n,i0+L); drops[i0:e]+=seg[:e-i0]
# fine spray crackle
spray=bp(rng.standard_normal(n),3500,7000)*(rng.random(n)<0.03)*np.where(k,np.exp(-tt/0.2),0)*0.5
x=sw+slap+body+wash+drops+spray
x=onepole_lp(onepole_lp(x,np.full(n,7500.0)),np.full(n,7500.0))
x[-int(sr*0.12):]*=np.linspace(1,0,int(sr*0.12))
x=x/np.max(np.abs(x))*0.89
with wave.open(sys.argv[1],'wb') as f:
    f.setnchannels(1);f.setsampwidth(2);f.setframerate(sr);f.writeframes((x*32767).astype('<i2').tobytes())
