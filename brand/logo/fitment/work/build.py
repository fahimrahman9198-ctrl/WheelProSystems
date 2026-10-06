import sys
def f(v): return f"{v:.2f}".rstrip('0').rstrip('.')
def circ(cx,cy,r): return f"M{f(cx-r)} {f(cy)} A{f(r)} {f(r)} 0 1 1 {f(cx+r)} {f(cy)} A{f(r)} {f(r)} 0 1 1 {f(cx-r)} {f(cy)} Z"
def build(name, gap=12, hub=20, front=64, cy=147, Ra=78):
    cx=128; Rw=Ra-gap; top=cy-104
    body=f"M16 {top} H{238-front} A{front} {front} 0 0 1 238 {top+front} V{cy} H{cx+Ra} A{Ra} {Ra} 0 0 0 {cx-Ra} {cy} H16 Z"
    wheel=f"{circ(cx,cy,Rw)} {circ(cx,cy,hub)}"
    open(name,"w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img"><title>WheelPro Systems symbol</title>\n<path fill="#0A0A0B" fill-rule="evenodd" d="{body} {wheel}"/>\n</svg>\n')
build("wheelpro-symbol.svg")
build("wheelpro-symbol-small.svg", gap=18, hub=23)
