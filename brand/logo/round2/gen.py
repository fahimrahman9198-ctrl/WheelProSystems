import math
INK="#0A0A0B"
def f(v): return f"{v:.2f}".rstrip('0').rstrip('.')
def circ(cx,cy,r,ccw=False):  # full circle as path; ccw for holes under nonzero
    s=0 if ccw else 1
    return f"M{f(cx-r)} {f(cy)} A{f(r)} {f(r)} 0 1 {s} {f(cx+r)} {f(cy)} A{f(r)} {f(r)} 0 1 {s} {f(cx-r)} {f(cy)} Z"
def svg(name,body,title):
    open(name,"w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img"><title>WheelPro Systems — {title}</title>\n{body}\n</svg>\n')
# E — Dot Matrix: 7x7 grid inside a disc, W pattern in big dots
W=["X...X","X...X","X.X.X","X.X.X",".X.X."]
sp=28; big=12.5; small=3.2; d=[]
for r in range(7):
    for c in range(7):
        x=128+(c-3)*sp; y=128+(r-3)*sp
        if math.hypot(x-128,y-128)>98: continue
        on = 1<=r<=5 and 1<=c<=5 and W[r-1][c-1]=="X"
        d.append(circ(x,y,big if on else small))
svg("e-dot-matrix.svg",f'<path fill="{INK}" d="{" ".join(d)}"/>',"Dot Matrix")
# F — Stencil Plate: rounded plate with 4 corner bolt holes; W cut out as 4 bridged slots
T15=math.tan(math.radians(15))
def wpoly(T,B,w):
    H=B-T; dx=H*T15; a=128-(4*dx+w)/2; t=(2*dx-w)/(2*dx); ny=H*t
    return [(a,T),(a+w,T),(a+w+dx*t,T+ny),(a+2*dx,T),(a+2*dx+w,T),(a+2*dx+w+dx*t,T+ny),(a+4*dx,T),(a+4*dx+w,T),(a+3*dx+w,B),(a+3*dx,B),(128,B-ny),(a+dx+w,B),(a+dx,B)], a,dx
def clip(subject, x0, x1):
    def cl(poly, keep):
        out=[]
        for j in range(len(poly)):
            p,q=poly[j-1],poly[j]; ip,iq=keep(p),keep(q)
            def inter(p,q,X): t=(X-p[0])/(q[0]-p[0]); return (X,p[1]+t*(q[1]-p[1]))
            if iq:
                if not ip: out.append(inter(p,q,X0 if keep is k0 else X1))
                out.append(q)
            elif ip: out.append(inter(p,q,X0 if keep is k0 else X1))
        return out
    global X0,X1
    X0,X1=x0,x1
    k0=lambda p:p[0]>=X0; k1=lambda p:p[0]<=X1
    globals()['k0']=k0
    r=subject
    r=[] if not r else r
    out=[]
    poly=subject
    # left half-plane
    tmp=[]
    for j in range(len(poly)):
        p,q=poly[j-1],poly[j]
        if q[0]>=x0:
            if p[0]<x0: t=(x0-p[0])/(q[0]-p[0]); tmp.append((x0,p[1]+t*(q[1]-p[1])))
            tmp.append(q)
        elif p[0]>=x0: t=(x0-p[0])/(q[0]-p[0]); tmp.append((x0,p[1]+t*(q[1]-p[1])))
    poly=tmp; tmp=[]
    for j in range(len(poly)):
        p,q=poly[j-1],poly[j]
        if q[0]<=x1:
            if p[0]>x1: t=(x1-p[0])/(q[0]-p[0]); tmp.append((x1,p[1]+t*(q[1]-p[1])))
            tmp.append(q)
        elif p[0]<=x1: t=(x1-p[0])/(q[0]-p[0]); tmp.append((x1,p[1]+t*(q[1]-p[1])))
    return tmp
P,a,dx=wpoly(64,192,30); w=30; g=9
cuts=[a+dx+w/2, a+2*dx+w/2, a+3*dx+w/2]
edges=[-1e9]+[c for c in cuts for _ in (0,1)]+[1e9]
slabs=[(-1e9,cuts[0]-g/2),(cuts[0]+g/2,cuts[1]-g/2),(cuts[1]+g/2,cuts[2]-g/2),(cuts[2]+g/2,1e9)]
holes=[]
for x0,x1 in slabs:
    pc=clip(P,x0,x1); pc=[p for k,p in enumerate(pc) if k==0 or math.dist(p,pc[k-1])>0.05]
    holes.append("M"+" L".join(f"{f(x)} {f(y)}" for x,y in pc)+" Z")
def rrect(x0,y0,x1,y1,r): return f"M{x0+r} {y0} H{x1-r} A{r} {r} 0 0 1 {x1} {y0+r} V{y1-r} A{r} {r} 0 0 1 {x1-r} {y1} H{x0+r} A{r} {r} 0 0 1 {x0} {y1-r} V{y0+r} A{r} {r} 0 0 1 {x0+r} {y0} Z"
bolts=[circ(x,y,7) for x in (44,212) for y in (44,212)]
svg("f-stencil-plate.svg",f'<path fill="{INK}" fill-rule="evenodd" d="{rrect(20,20,236,236,30)} {" ".join(holes)} {" ".join(bolts)}"/>',"Stencil Plate")
# G — Garage Seal (exploration: live textPath, flagged) — ring, text band, five-lug centre
lugs=[circ(128+33*math.sin(math.radians(a)),128-33*math.cos(math.radians(a)),6) for a in range(0,360,72)]
body=(f'<path fill="{INK}" fill-rule="evenodd" d="{circ(128,128,120)} {circ(128,128,108)}"/>\n'
      f'<path fill="{INK}" fill-rule="evenodd" d="{circ(128,128,68)} {" ".join(lugs)} {circ(128,128,18)}"/>\n'
      f'<defs><path id="ring" d="M128 128 m-88 0 a88 88 0 1 1 176 0 a88 88 0 1 1 -176 0"/></defs>\n'
      f'<text font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="900" font-size="25" letter-spacing="3.2" fill="{INK}"><textPath href="#ring" startOffset="0">WHEELPRO ★ SYSTEMS ★ WHEELPRO ★ SYSTEMS ★</textPath></text>')
svg("g-garage-seal.svg",body,"Garage Seal")
# H — Fitment: fender block with arch, wheel with a tight gap, hub bore
cx,cy=128,156; R_arch=78; R_w=66
ax=math.sqrt(R_arch**2-(cy-cy)**2)
fender=f"M16 52 H176 C214 52 236 80 238 118 V{cy} H{f(cx+R_arch)} A{R_arch} {R_arch} 0 0 0 {f(cx-R_arch)} {cy} H16 Z"
wheel=f"{circ(cx,cy,R_w)} {circ(cx,cy,20,True)}"
svg("h-fitment.svg",f'<path fill="{INK}" d="{fender}"/>\n<path fill="{INK}" fill-rule="evenodd" d="{circ(cx,cy,R_w)} {circ(cx,cy,20)}"/>',"Fitment")
print("ok")
