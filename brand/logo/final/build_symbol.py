import math, sys
T60=math.tan(math.radians(60)); T15=math.tan(math.radians(15))
def f(v): s=f"{v:.2f}".rstrip('0').rstrip('.'); return s
def hex_pts(R,cx=128,cy=128):  # flat-top
    return [(cx+R*math.cos(math.radians(a)), cy+R*math.sin(math.radians(a))) for a in (180,240,300,0,60,120)]
def rounded_hex_path(R,r):
    P=hex_pts(R); n=len(P); t=r*math.tan(math.radians(30)); d=""
    for i in range(n):
        p0,p1,p2=P[i-1],P[i],P[(i+1)%n]
        def toward(a,b,dist):
            L=math.dist(a,b); return (a[0]+(b[0]-a[0])*dist/L, a[1]+(b[1]-a[1])*dist/L)
        s=toward(p1,p0,t); e=toward(p1,p2,t)
        d+=(f"M{f(s[0])} {f(s[1])}" if i==0 else f" L{f(s[0])} {f(s[1])}")+f" A{r} {r} 0 0 1 {f(e[0])} {f(e[1])}"
    return d+" Z"
def clip(subject, clipper):  # Sutherland-Hodgman, clipper convex & clockwise (screen)
    def inside(p,a,b): return (b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])>=0
    def inter(p,q,a,b):
        x1,y1,x2,y2=*p,*q; x3,y3,x4,y4=*a,*b
        den=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4); t=((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/den
        return (x1+t*(x2-x1), y1+t*(y2-y1))
    out=subject
    for i in range(len(clipper)):
        a,b=clipper[i],clipper[(i+1)%len(clipper)]; inp=out; out=[]
        for j in range(len(inp)):
            p,q=inp[j-1],inp[j]
            if inside(q,a,b):
                if not inside(p,a,b): out.append(inter(p,q,a,b))
                out.append(q)
            elif inside(p,a,b): out.append(inter(p,q,a,b))
    # drop near-duplicates
    res=[]
    for p in out:
        if not res or math.dist(p,res[-1])>0.05: res.append(p)
    return res
def w_poly(T,B,w):
    H=B-T; dx=H*T15; W=4*dx+w; a=128-W/2
    def ix(xa,xb):  # notch depth
        return None
    t=(2*dx-w)/(2*dx); ny=H*t
    return [(a,T),(a+w,T),(a+w+dx*t,T+ny),(a+2*dx,T),(a+2*dx+w,T),(a+3*dx+w-dx*(1-t)+0,T+ny) if False else (a+2*dx+w+dx*t,T+ny),
            (a+4*dx,T),(a+4*dx+w,T),(a+3*dx+w,B),(a+3*dx,B),(128,B-ny),(a+dx+w,B),(a+dx,B)]
def build(R=112, r=14, wall=24, T=66, B=184, w=26):
    inner=hex_pts(R-wall/math.cos(math.radians(30)))
    W=clip(w_poly(T,B,w), inner)
    wd="M"+" L".join(f"{f(x)} {f(y)}" for x,y in W)+" Z"
    return rounded_hex_path(R,r), wd, W
if __name__=="__main__":
    name=sys.argv[1]; kw=dict(a.split("=") for a in sys.argv[2:]); kw={k:float(v) for k,v in kw.items()}
    hexd,wd,W=build(**kw)
    open(name,"w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img"><title>WheelPro Systems symbol</title>\n<path fill="#0A0A0B" fill-rule="evenodd" d="{hexd} {wd}"/>\n</svg>\n')
    print(name, len(W),"pts", [ (round(x,1),round(y,1)) for x,y in W])
