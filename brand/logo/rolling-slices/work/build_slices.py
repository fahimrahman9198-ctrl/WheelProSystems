import math, sys
def f(v): return f"{v:.2f}".rstrip('0').rstrip('.')
def build(R=96, n=5, gap=12, hub=36, shifts=None, cx=128, cy=128):
    h=(2*R-gap*(n-1))/n
    shifts=shifts or ([16,8,0,-8,-16] if n==5 else [14,0,-14] if n==3 else [12,4,-4,-12])
    Xo=lambda y: math.sqrt(max(R*R-(y-cy)**2,0)); Xh=lambda y: math.sqrt(max(hub*hub-(y-cy)**2,0))
    paths=[]
    for i in range(n):
        y1=cy-R+i*(h+gap); y2=y1+h; a,b=Xo(y1),Xo(y2); top,bot=cy-hub,cy+hub
        L=lambda x:f(cx-x); Rr=lambda x:f(cx+x)
        if hub<=0 or y2<=top or y1>=bot:
            d=f"M{L(a)} {f(y1)} H{Rr(a)} A{R} {R} 0 0 1 {Rr(b)} {f(y2)} H{L(b)} A{R} {R} 0 0 1 {L(a)} {f(y1)} Z"
        elif y1>=top and y2<=bot:  # split into two pieces around the hub
            ha,hb=Xh(y1),Xh(y2)
            d=(f"M{L(a)} {f(y1)} H{L(ha)} A{hub} {hub} 0 0 0 {L(hb)} {f(y2)} H{L(b)} A{R} {R} 0 0 1 {L(a)} {f(y1)} Z "
               f"M{Rr(ha)} {f(y1)} H{Rr(a)} A{R} {R} 0 0 1 {Rr(b)} {f(y2)} H{Rr(hb)} A{hub} {hub} 0 0 0 {Rr(ha)} {f(y1)} Z")
        elif y1<top<y2:  # bite from the bottom edge
            hb=Xh(y2)
            d=f"M{L(a)} {f(y1)} H{Rr(a)} A{R} {R} 0 0 1 {Rr(b)} {f(y2)} H{Rr(hb)} A{hub} {hub} 0 0 0 {L(hb)} {f(y2)} H{L(b)} A{R} {R} 0 0 1 {L(a)} {f(y1)} Z"
        else:  # bite from the top edge
            ha=Xh(y1)
            d=f"M{L(a)} {f(y1)} H{L(ha)} A{hub} {hub} 0 0 0 {Rr(ha)} {f(y1)} H{Rr(a)} A{R} {R} 0 0 1 {Rr(b)} {f(y2)} H{L(b)} A{R} {R} 0 0 1 {L(a)} {f(y1)} Z"
        # bake the shift into coordinates (no transforms in masters)
        s=shifts[i]; out=[]; tok=d.replace('M','M ').replace('H','H ').replace('A','A ').replace('Z',' Z').split()
        j=0
        while j<len(tok):
            t=tok[j]
            if t=='M': out+=['M',f(float(tok[j+1])+s),tok[j+2]]; j+=3
            elif t=='H': out+=['H',f(float(tok[j+1])+s)]; j+=2
            elif t=='A': out+=['A',*tok[j+1:j+6],f(float(tok[j+6])+s),tok[j+7]]; j+=8
            else: out.append(t); j+=1
        paths.append(" ".join(out))
    return paths
if __name__=="__main__":
    name=sys.argv[1]; kw={k:float(v) for k,v in (a.split("=") for a in sys.argv[2:])}
    if 'n' in kw: kw['n']=int(kw['n'])
    p=build(**kw)
    open(name,"w").write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img"><title>WheelPro Systems symbol</title>\n<path fill="#0A0A0B" d="'+" ".join(p)+'"/>\n</svg>\n')
    print("wrote",name)
