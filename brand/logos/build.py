#!/usr/bin/env python3
"""Builds the eight product marks to the spec in README.md. No dependencies.

Run from this folder: python3 build.py
Writes <product>.svg and before-fit/<product>.svg (the old mark fitted to the same box, for the overlay).
"""
import math, re, os, json, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import curvefit as cf

HERE = os.path.dirname(os.path.abspath(__file__))
COLOR = "#2C1709"
BOARD = 64
BOXES = {"wide": (60, 40), "square": (52, 52), "tall": (50, 58)}
KIND = {"komando": "wide", "trady": "wide", "meridian": "wide", "glamor": "tall", "toolips": "square", "cuwan": "square", "kongkow": "square", "design-tokens": "square"}
GRID = 0.5
K = 0.5522847498  # cubic circle constant


def r2(v):
    v = round(v + 0.0, 2)
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def snap(v, g=GRID):
    return round(v / g) * g


# ---------- path emit ----------
class P:
    def __init__(self):
        self.d = []

    def M(self, x, y): self.d.append(f"M{r2(x)} {r2(y)}")
    def L(self, x, y): self.d.append(f"L{r2(x)} {r2(y)}")
    def Q(self, cx, cy, x, y): self.d.append(f"Q{r2(cx)} {r2(cy)} {r2(x)} {r2(y)}")
    def C(self, a, b, c, d, e, f): self.d.append(f"C{r2(a)} {r2(b)} {r2(c)} {r2(d)} {r2(e)} {r2(f)}")
    def Z(self): self.d.append("Z")
    def s(self): return "".join(self.d)


def arc_cubics(cx, cy, r, a0, a1):
    """cubic pieces for a circular arc from angle a0 to a1 (radians, y down)."""
    out = []
    n = max(1, math.ceil(abs(a1 - a0) / (math.pi / 2) - 1e-9))
    step = (a1 - a0) / n
    k = 4 / 3 * math.tan(step / 4)
    for i in range(n):
        t0 = a0 + i * step
        t1 = t0 + step
        p0 = (cx + r * math.cos(t0), cy + r * math.sin(t0))
        p3 = (cx + r * math.cos(t1), cy + r * math.sin(t1))
        c1 = (p0[0] - k * r * math.sin(t0), p0[1] + k * r * math.cos(t0))
        c2 = (p3[0] + k * r * math.sin(t1), p3[1] - k * r * math.cos(t1))
        out.append((c1, c2, p3))
    return out


def circle(p, cx, cy, r):
    p.M(cx + r, cy)
    for c1, c2, e in arc_cubics(cx, cy, r, 0, 2 * math.pi):
        p.C(*c1, *c2, *e)
    p.Z()


def rounded_poly(p, pts, k):
    """closed polygon, every corner cut back k along both edges and rounded with a quadratic."""
    n = len(pts)
    def toward(a, b, d):
        l = math.hypot(b[0] - a[0], b[1] - a[1])
        d = min(d, l / 2)
        return (a[0] + (b[0] - a[0]) * d / l, a[1] + (b[1] - a[1]) * d / l)
    first = True
    cur = (0, 0)
    for i in range(n):
        a, v, b = pts[i - 1], pts[i], pts[(i + 1) % n]
        s = toward(v, a, k)
        e = toward(v, b, k)
        if first:
            p.M(*s); first = False
        elif math.hypot(s[0] - cur[0], s[1] - cur[1]) > 0.01:
            p.L(*s)
        p.Q(v[0], v[1], *e)
        cur = e
    p.Z()


def rrect(p, x, y, w, h, r):
    rounded_poly(p, [(x, y), (x + w, y), (x + w, y + h), (x, y + h)], r)


def skew(pts, tan, y0=0):
    return [(x - tan * (y - y0), y) for x, y in pts]


# ---------- traced marks ----------
def parse_poly(d):
    subs = []
    for m in re.finditer(r"M([^M]*)", d):
        nums = [float(v) for v in re.findall(r"-?\d+\.?\d*", m.group(1))]
        pts = list(zip(nums[0::2], nums[1::2]))
        if pts: subs.append(pts)
    return subs


def area(pts):
    return sum(pts[i][0] * pts[(i + 1) % len(pts)][1] - pts[(i + 1) % len(pts)][0] * pts[i][1] for i in range(len(pts))) / 2


def rdp(pts, eps):
    if len(pts) < 3: return pts
    a, b = pts[0], pts[-1]
    dmax, idx = 0, 0
    for i in range(1, len(pts) - 1):
        x, y = pts[i]
        l = math.hypot(b[0] - a[0], b[1] - a[1])
        d = math.hypot(x - a[0], y - a[1]) if l == 0 else abs((b[0] - a[0]) * (a[1] - y) - (a[0] - x) * (b[1] - a[1])) / l
        if d > dmax: dmax, idx = d, i
    if dmax > eps:
        return rdp(pts[:idx + 1], eps)[:-1] + rdp(pts[idx:], eps)
    return [a, b]


def simplify_closed(pts, eps):
    # split at the point farthest from the first so RDP has two anchors
    far = max(range(len(pts)), key=lambda i: math.hypot(pts[i][0] - pts[0][0], pts[i][1] - pts[0][1]))
    a = rdp(pts[:far + 1], eps)
    b = rdp(pts[far:] + [pts[0]], eps)
    return a[:-1] + b[:-1]


def dedupe(pts):
    out = []
    for p in pts:
        if not out or p != out[-1]: out.append(p)
    if len(out) > 1 and out[0] == out[-1]: out.pop()
    return out


def mirror(p, ax): return (2 * ax - p[0], p[1])


def symmetrize(subs, ax):
    """Make a set of closed polygons mirror-symmetric about x = ax. Returns (subs, left_alone)."""
    out, singles, left = [], [], []
    for pts in subs:
        cx = sum(x for x, _ in pts) / len(pts)
        crossings = []
        n = len(pts)
        for i in range(n):
            a, b = pts[i], pts[(i + 1) % n]
            if (a[0] - ax) * (b[0] - ax) < 0:
                t = (ax - a[0]) / (b[0] - a[0])
                crossings.append((i, (ax, a[1] + t * (b[1] - a[1]))))
        if len(crossings) == 2:
            (i, A), (j, B) = crossings
            chain = [A] + pts[i + 1:j + 1] + [B]  # from A to B in original order
            if sum(p[0] for p in chain[1:-1]) / max(1, len(chain) - 2) > ax:
                # chain runs on the right; take the other chain instead
                chain = [B] + (pts[j + 1:] + pts[:i + 1]) + [A]
            full = chain + [mirror(p, ax) for p in reversed(chain[1:-1])]
            out.append(full)
        elif len(crossings) == 0:
            singles.append((cx, pts))
        else:
            out.append(pts); left.append("crosses axis %d times" % len(crossings))
    used = set()
    for i, (cx, pts) in enumerate(singles):
        if i in used: continue
        # find twin: closest mirrored centroid on the other side
        best, bd = None, 1e9
        for j, (cj, pj) in enumerate(singles):
            if j == i or j in used: continue
            d = abs((2 * ax - cx) - cj) + abs(sum(y for _, y in pts) / len(pts) - sum(y for _, y in pj) / len(pj))
            if d < bd: best, bd = j, d
        if best is not None and bd < 6:
            used.add(i); used.add(best)
            keep = pts if cx < ax else singles[best][1]
            out.append(keep)
            out.append(list(reversed([mirror(p, ax) for p in keep])))
        else:
            out.append(pts); left.append("no twin for a part")
    return out, left


def fit_box(kind_w, kind_h):
    r = kind_w / kind_h
    kind = "wide" if r >= 1.3 else ("tall" if r <= 0.9 else "square")
    bw, bh = BOXES[kind]
    return kind, min(bw / kind_w, bh / kind_h)


def path_pts(path):
    start, segs = path
    pts = [start]
    for sg in segs: pts.append(sg[-1])
    return pts

def emit(p, path):
    start, segs = path
    p.M(*start)
    for sg in segs:
        if sg[0] == 'L': p.L(*sg[1])
        else: p.C(*sg[1], *sg[2], *sg[3])
    p.Z()

def snap_straights(path):
    """snap horizontal and vertical straight edges (both ends) to the half-unit grid, moving a joined curve's handle with its end."""
    start, segs = path
    pts = [start] + [sg[-1] for sg in segs]
    n = len(segs)
    pts[-1] = pts[0] if n and dist2(pts[-1], pts[0]) < 1e-6 else pts[-1]
    shift = {}
    for k, sg in enumerate(segs):
        if sg[0] != 'L': continue
        a, b = pts[k], pts[k + 1]
        if abs(a[1] - b[1]) < 0.15:
            y = snap((a[1] + b[1]) / 2)
            shift[k] = ('y', y); 
        elif abs(a[0] - b[0]) < 0.15:
            x = snap((a[0] + b[0]) / 2)
            shift[k] = ('x', x)
    new = [list(p) for p in pts]
    mv = {}
    for k, (ax, v) in shift.items():
        for idx in (k, k + 1):
            i = idx % (n) if idx == n else idx
            if idx == n: i = 0
            d = v - new[i][0 if ax == 'x' else 1]
            mv[(i, ax)] = d
    for (i, ax), d in mv.items():
        new[i][0 if ax == 'x' else 1] += d
    out = []
    for k, sg in enumerate(segs):
        if sg[0] == 'L': out.append(('L', tuple(new[k + 1 if k + 1 < n else 0])))
        else:
            c1 = list(sg[1]); c2 = list(sg[2])
            for ax, ix in (('x', 0), ('y', 1)):
                if (k, ax) in mv: c1[ix] += mv[(k, ax)]
                i2 = k + 1 if k + 1 < n else 0
                if (i2, ax) in mv: c2[ix] += mv[(i2, ax)]
            out.append(('C', tuple(c1), tuple(c2), tuple(new[k + 1 if k + 1 < n else 0])))
    return tuple(new[0]), out

def merge_short(path, minlen=0.5):
    """drop segments shorter than minlen by moving the previous segment's end (and handle) onto this segment's end."""
    start, segs = path
    segs = list(segs)
    changed = True
    while changed and len(segs) > 3:
        changed = False
        pts = [start] + [sg[-1] for sg in segs]
        for k, sg in enumerate(segs):
            if math.hypot(pts[k + 1][0] - pts[k][0], pts[k + 1][1] - pts[k][1]) < minlen:
                end = sg[-1]; dx, dy = end[0] - pts[k + 1][0] + (pts[k + 1][0] - pts[k][0]), 0
                shift = (end[0] - pts[k][0], end[1] - pts[k][1])
                if k == 0:
                    last = segs[-1]
                    segs[-1] = ('L', end) if last[0] == 'L' else ('C', last[1], (last[2][0] + shift[0], last[2][1] + shift[1]), end)
                    start = end
                else:
                    pv = segs[k - 1]
                    segs[k - 1] = ('L', end) if pv[0] == 'L' else ('C', pv[1], (pv[2][0] + shift[0], pv[2][1] + shift[1]), end)
                del segs[k]
                changed = True
                break
    return start, segs

def dist2(a, b): return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2

def circle_path(cx, cy, r):
    segs = []
    start = (cx + r, cy)
    for c1, c2, e in arc_cubics(cx, cy, r, 0, 2 * math.pi): segs.append(('C', c1, c2, e))
    return start, segs

def poly_path(pts, err=0.12, tol=0.035):
    c = cf.circle_of(pts, tol)
    if c:
        cx, cy, r = c
        return circle_path(snap(cx), snap(cy), max(0.25, round(r * 4) / 4)), "circle"
    return snap_straights(merge_short(cf.fit_closed(pts, err))), "curve"

def thin(pts):
    a = abs(area(pts)); per = sum(math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]) for i in range(len(pts)))
    return 4 * math.pi * a / (per * per)

def stroke_outline(center_pts, w):
    """round-capped stroke along a centre line, as one closed outline (cubic curves)."""
    st, segs = cf.fit_open(center_pts, err=0.15, deg=70)
    flat = [st]; cur = st
    for sg in segs:
        if sg[0] == 'L': flat.append(sg[1]); cur = sg[1]
        else:
            b = (cur, sg[1], sg[2], sg[3])
            for k in range(1, 13): flat.append(cf.bez(b, k / 12))
            cur = sg[3]
    flat = cf.clean(flat, 0.05)
    L, R, N = [], [], []
    for i, p in enumerate(flat):
        a = flat[max(0, i - 1)]; b = flat[min(len(flat) - 1, i + 1)]
        t = cf.unit((b[0] - a[0], b[1] - a[1])); nrm = (-t[1], t[0]); N.append(nrm)
        L.append((p[0] + nrm[0] * w / 2, p[1] + nrm[1] * w / 2)); R.append((p[0] - nrm[0] * w / 2, p[1] - nrm[1] * w / 2))
    t0 = cf.unit((flat[1][0] - flat[0][0], flat[1][1] - flat[0][1])); t1 = cf.unit((flat[-1][0] - flat[-2][0], flat[-1][1] - flat[-2][1]))
    lst, lsegs = cf.fit_open(L, cf.unit((L[1][0] - L[0][0], L[1][1] - L[0][1])), cf.unit((L[-2][0] - L[-1][0], L[-2][1] - L[-1][1])), err=0.1, deg=70)
    Rr = list(reversed(R))
    rst, rsegs = cf.fit_open(Rr, cf.unit((Rr[1][0] - Rr[0][0], Rr[1][1] - Rr[0][1])), cf.unit((Rr[-2][0] - Rr[-1][0], Rr[-2][1] - Rr[-1][1])), err=0.1, deg=70)
    out = list(lsegs)
    a0 = math.atan2(N[-1][1], N[-1][0])
    for c1, c2, e in arc_cubics(flat[-1][0], flat[-1][1], w / 2, a0, a0 - math.pi): out.append(('C', c1, c2, e))
    out += rsegs
    a1 = math.atan2(-N[0][1], -N[0][0])
    for c1, c2, e in arc_cubics(flat[0][0], flat[0][1], w / 2, a1, a1 - math.pi): out.append(('C', c1, c2, e))
    return lst, out


def path_area(path):
    start, segs = path
    pts = [start]; cur = start
    for sg in segs:
        if sg[0] == 'L': pts.append(sg[1])
        else:
            for k in range(1, 9): pts.append(cf.bez((cur, sg[1], sg[2], sg[3]), k / 8))
        cur = sg[-1]
    return area(pts)

def path_bbox(paths):
    xs, ys = [], []
    for start, segs in paths:
        cur = start; xs.append(start[0]); ys.append(start[1])
        for sg in segs:
            if sg[0] == 'L': xs.append(sg[1][0]); ys.append(sg[1][1])
            else:
                for k in range(1, 11):
                    q = cf.bez((cur, sg[1], sg[2], sg[3]), k / 10); xs.append(q[0]); ys.append(q[1])
            cur = sg[-1]
    return min(xs), max(xs), min(ys), max(ys)

def reverse_path(path):
    start, segs = path
    pts = [start] + [sg[-1] for sg in segs]
    out = []
    for k in range(len(segs) - 1, -1, -1):
        sg = segs[k]; frm = pts[k]
        out.append(('L', frm) if sg[0] == 'L' else ('C', sg[2], sg[1], frm))
    return pts[-1], out

def centerline(pts, samples=7):
    """centre line of a thin curved band: a parabola fitted through all its points in the band's own axes."""
    n = len(pts); mx = sum(x for x, _ in pts) / n; my = sum(y for _, y in pts) / n
    sxx = sum((x - mx) ** 2 for x, _ in pts); syy = sum((y - my) ** 2 for _, y in pts); sxy = sum((x - mx) * (y - my) for x, y in pts)
    th = 0.5 * math.atan2(2 * sxy, sxx - syy); ax = (math.cos(th), math.sin(th)); nx = (-ax[1], ax[0])
    T = [((x - mx) * ax[0] + (y - my) * ax[1], (x - mx) * nx[0] + (y - my) * nx[1]) for x, y in pts]
    # least squares s = a + b t + c t^2 (3x3 normal equations)
    S = [sum(t ** k for t, _ in T) for k in range(5)]
    R = [sum(s * t ** k for t, s in T) for k in range(3)]
    M = [[S[0], S[1], S[2]], [S[1], S[2], S[3]], [S[2], S[3], S[4]]]
    def det3(m): return (m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]))
    D = det3(M); co = []
    for c in range(3):
        mm = [row[:] for row in M]
        for r in range(3): mm[r][c] = R[r]
        co.append(det3(mm) / D)
    lo = min(t for t, _ in T); hi = max(t for t, _ in T)
    # the stroke has round caps, so the centre line stops half a stroke short of the band's tips
    out = []
    for k in range(samples):
        t = lo + (hi - lo) * k / (samples - 1); s = co[0] + co[1] * t + co[2] * t * t
        out.append((mx + t * ax[0] + s * nx[0], my + t * ax[1] + s * nx[1]))
    return out


def traced(name, sym, stroke_w=3.0):
    src = open(os.path.join(HERE, "before", ("meridian-mark" if name == "meridian" else name) + ".svg")).read()
    d = " ".join(re.findall(r'\sd="([^"]+)"', src))
    subs = parse_poly(d)
    nodes_before = sum(len(s) for s in subs)
    xs = [x for s in subs for x, _ in s]; ys = [y for s in subs for _, y in s]
    w, h = max(xs) - min(xs), max(ys) - min(ys)
    kind, sc = fit_box(w, h)
    cx, cy = (max(xs) + min(xs)) / 2, (max(ys) + min(ys)) / 2
    subs = [[(32 + (x - cx) * sc, 32 + (y - cy) * sc) for x, y in s] for s in subs]
    subs = [dedupe(s) for s in subs]
    subs = [s for s in subs if len(s) >= 3 and abs(area(s)) >= 2]
    kinds = {"circle": 0, "curve": 0, "stroke": 0, "mirrored": 0}
    paths = []
    notes = []
    thins = [s for s in subs if thin(s) < 0.4 and abs(area(s)) < 25] if name == "trady" else []
    rest = [s for s in subs if not any(s is t for t in thins)]
    if sym:
        used = set(); items = []
        for i, s in enumerate(rest):
            if i in used: continue
            c = (sum(x for x, _ in s) / len(s), sum(y for _, y in s) / len(s))
            crossings = []
            for k in range(len(s)):
                a, b = s[k], s[(k + 1) % len(s)]
                if (a[0] - 32) * (b[0] - 32) < 0:
                    t = (32 - a[0]) / (b[0] - a[0]); crossings.append((k, (32.0, a[1] + t * (b[1] - a[1]))))
            if len(crossings) == 2:
                (k1, A), (k2, B) = crossings
                chain = [A] + s[k1 + 1:k2 + 1] + [B]
                if sum(p[0] for p in chain[1:-1]) / max(1, len(chain) - 2) > 32:
                    chain = [B] + (s[k2 + 1:] + s[:k1 + 1]) + [A]
                items.append(("self", chain)); continue
            best, bd = None, 1e9
            for j, s2 in enumerate(rest):
                if j == i or j in used: continue
                c2 = (sum(x for x, _ in s2) / len(s2), sum(y for _, y in s2) / len(s2))
                dd = abs(2 * 32 - c[0] - c2[0]) + abs(c[1] - c2[1])
                if dd < bd: best, bd = j, dd
            if best is not None and bd < 8:
                used.add(i); used.add(best); items.append(("twin", s if c[0] < 32 else rest[best]))
            else:
                items.append(("plain", s)); notes.append("a part has no twin and stays as drawn")
        for kind_, data in items:
            if kind_ == "self":
                st, segs = cf.fit_open(data, (-1.0, 0.0) if data[0][0] == 32 else None, (-1.0, 0.0), err=0.12)
                st, segs = tuple((32.0 if abs(st[0] - 32) < .3 else st[0], st[1])), segs
                pts = [st] + [sg[-1] for sg in segs]
                m = lambda p: (64 - p[0], p[1])
                back = []
                for k in range(len(segs) - 1, -1, -1):
                    sg = segs[k]; frm = pts[k]
                    back.append(('L', m(frm)) if sg[0] == 'L' else ('C', m(sg[2]), m(sg[1]), m(frm)))
                full = segs + back
                # the chain's last point is on the axis; mirrored list starts there
                paths.append(snap_straights(merge_short((st, full)))); kinds["curve"] += 1; kinds["mirrored"] += 1
            elif kind_ == "twin":
                if thin(data) > 0.6:
                    xs_ = [x for x, _ in data]; ys_ = [y for _, y in data]
                    pth, how = circle_path(snap((min(xs_) + max(xs_)) / 2), snap((min(ys_) + max(ys_)) / 2), round((max(xs_) - min(xs_) + max(ys_) - min(ys_)) / 4 * 4) / 4), "circle"
                else:
                    pth, how = poly_path(data); 
                kinds[how] += 1
                paths.append(pth); paths.append(cf.mirror_path(pth, 32)); kinds["mirrored"] += 1
            else:
                pth, how = poly_path(data); kinds[how] += 1; paths.append(pth)
        # whiskers: round-capped strokes
        lefts = [s for s in thins if sum(x for x, _ in s) / len(s) < 32]
        for s in lefts:
            cl = centerline(s)
            pth = merge_short(stroke_outline(cl, stroke_w))
            if path_area(pth) > 0: pth = reverse_path(pth)
            paths.append(pth); paths.append(cf.mirror_path(pth, 32)); kinds["stroke"] += 1; kinds["mirrored"] += 1
    else:
        for s in subs:
            pth, how = poly_path(s); kinds[how] += 1; paths.append(pth)
    p = P()
    nsegs = 0
    for pth in paths:
        emit(p, pth); nsegs += len(pth[1])
    info = f"{nodes_before} polygon nodes to {nsegs} curve/line segments ({kinds['curve']} fitted, {kinds['circle']} true circles, {kinds['stroke']} stroked, {kinds['mirrored']} mirrored); scale {sc:.4f}"
    if notes: info += "; " + "; ".join(sorted(set(notes)))
    return p.s(), False, kind, info



# ---------- construction helpers (circular fillets, exact arcs) ----------
def unit2(a, b_):
    l = math.hypot(b_[0] - a[0], b_[1] - a[1]); return ((b_[0] - a[0]) / l, (b_[1] - a[1]) / l)

def fillet(prev, v, nxt, r):
    """tangent points and arc for a corner of radius r; returns (T1, [cubics], T2)."""
    if r <= 0: return v, [], v
    d1, d2 = unit2(v, prev), unit2(v, nxt)
    th = math.acos(max(-1, min(1, d1[0] * d2[0] + d1[1] * d2[1])))
    t = r / math.tan(th / 2)
    T1 = (v[0] + d1[0] * t, v[1] + d1[1] * t); T2 = (v[0] + d2[0] * t, v[1] + d2[1] * t)
    bis = (d1[0] + d2[0], d1[1] + d2[1]); bl = math.hypot(*bis)
    c = (v[0] + bis[0] / bl * r / math.sin(th / 2), v[1] + bis[1] / bl * r / math.sin(th / 2))
    a1 = math.atan2(T1[1] - c[1], T1[0] - c[0]); a2 = math.atan2(T2[1] - c[1], T2[0] - c[0])
    dl = (a2 - a1 + math.pi) % (2 * math.pi) - math.pi
    return T1, arc_cubics(c[0], c[1], r, a1, a1 + dl), T2

def poly_fillets(pts, radii):
    """closed polygon, per-vertex radius (0 = sharp corner), exact circular arcs -> path tuple (start, segs)."""
    n = len(pts); segs = []; start = None; cur = None
    for i in range(n):
        T1, arcs, T2 = fillet(pts[i - 1], pts[i], pts[(i + 1) % n], radii[i])
        if start is None: start = T1
        elif math.hypot(T1[0] - cur[0], T1[1] - cur[1]) > 0.01: segs.append(('L', T1))
        for c1, c2, e in arcs: segs.append(('C', c1, c2, e))
        cur = T2 if arcs else T1
    segs.append(('L', start)) if math.hypot(start[0] - cur[0], start[1] - cur[1]) > 0.01 else None
    return start, segs

def oriented(path, cw=True):
    a = path_area(path)
    return path if (a > 0) == cw else reverse_path(path)

def circ(cx, cy, r, cw=True): return oriented(circle_path(cx, cy, r), cw)

def finish(paths, kind, note):
    p = P()
    for pth in paths: emit(p, pth)
    return p.s(), False, kind, note

# ---------- constructed marks ----------
def komando():
    r, dx, dy = 4.5, 17, 15
    p = P()
    for i in range(3):
        x0 = 6.5 + dx * i
        P0, P1, P2 = (x0, 17), (x0 + dx, 17 + dy), (x0, 17 + 2 * dy)
        def unit(a, b):
            l = math.hypot(b[0] - a[0], b[1] - a[1]); return ((b[0] - a[0]) / l, (b[1] - a[1]) / l)
        d1, d2 = unit(P0, P1), unit(P1, P2)
        n1, n2 = (d1[1], -d1[0]), (d2[1], -d2[0])
        a1, a2 = math.atan2(n1[1], n1[0]), math.atan2(n2[1], n2[0])
        k = 1 + n1[0] * n2[0] + n1[1] * n2[1]
        I = (P1[0] - r * (n1[0] + n2[0]) / k, P1[1] - r * (n1[1] + n2[1]) / k)
        p.M(P0[0] + n1[0] * r, P0[1] + n1[1] * r)
        p.L(P1[0] + n1[0] * r, P1[1] + n1[1] * r)
        for c1, c2, e in arc_cubics(P1[0], P1[1], r, a1, a2): p.C(*c1, *c2, *e)
        p.L(P2[0] + n2[0] * r, P2[1] + n2[1] * r)
        for c1, c2, e in arc_cubics(P2[0], P2[1], r, a2, a2 + math.pi): p.C(*c1, *c2, *e)
        p.L(*I)
        p.L(P0[0] - n1[0] * r, P0[1] - n1[1] * r)
        for c1, c2, e in arc_cubics(P0[0], P0[1], r, a1 + math.pi, a1 + 2 * math.pi): p.C(*c1, *c2, *e)
        p.Z()
    return p.s(), False, "wide", "three chevrons rebuilt from centre lines on the grid: stroke 9, pitch 17, run 17, rise 15 each side (was 78/165/165/150 in a 768 box); round caps and joins kept; true symmetry top to bottom"


def meridian():
    p = P()
    h, lean, th, pitch, k = 28, 14, 11, 18, 2
    y0 = 18
    for i in range(3):
        x0 = 2 + pitch * i
        pts = [(x0 + lean, y0), (x0 + lean + th, y0), (x0 + th, y0 + h), (x0, y0 + h)]
        rounded_poly(p, pts, k)
    return p.s(), False, "wide", "three identical leaning bars: height 28, lean 14 (slope 0.5), thickness 11, pitch 18, corner cut 2; all three bars are now the same shape to the decimal"


def glamor():
    # the owner's drawing, in its own units (assets/glamor.svg on glamor main): base 24 by 22, collar 20 by 7, bullet 16 wide
    # with the slanted tip; sheared at Meridian's slope 0.5, scaled once to the tall box, vertices snapped to the half unit
    tan = 0.5
    base = [(4, 34), (28, 34), (28, 56), (4, 56)]
    collar = [(6, 24), (26, 24), (26, 31), (6, 31)]
    bullet = [(9, 20), (9, 8.2), (25, 0.1), (25, 20)]
    parts = [(base, 3), (collar, 2), (bullet, 2.8)]
    sheared = [(skew(pts, tan, 0), k) for pts, k in parts]
    allp = [pt for pts, _ in sheared for pt in pts]
    xs = [x for x, _ in allp]; ys = [y for _, y in allp]
    bw, bh = BOXES["tall"]
    s = min((bw + 1.6) / (max(xs) - min(xs)), (bh + 1.8) / (max(ys) - min(ys)))
    ox = 32 - s * (max(xs) + min(xs)) / 2; oy = 32 - s * (max(ys) + min(ys)) / 2
    p = P()
    for pts, k in sheared:
        rounded_poly(p, [(snap(s * x + ox), snap(s * y + oy)) for x, y in pts], round(k * s * 2) / 2)
    return p.s(), False, "tall", f"the owner's drawing at its own proportions (base 24 by 22, collar 20 by 7, bullet 16 wide, tip slope 0.5), sheared at slope 0.5, one scale of {s:.3f} into the 50 by 58 box, vertices snapped to half units; corner cuts 3 (base), 2 (collar), 3 (bullet)"


def design_tokens():
    p = P()
    circle(p, 18, 18, 12)
    rrect(p, 34, 6, 24, 24, 4)
    rrect(p, 34, 46, 24, 12, 6)
    h = 24; lean = 12; th = 12
    x0, y0 = 6, 34
    rounded_poly(p, [(x0 + lean, y0), (x0 + lean + th, y0), (x0 + th, y0 + h), (x0, y0 + h)], 3)
    return p.s(), False, "square", "four cells of 24 with a gap of 4 (was 24 with a gap of 2, too tight for 20 px): circle d24, square r4, pill 24 by 12, leaning bar at slope 0.5; strokes turned into one filled shape"


KONGKOW = dict(bar=(51.5, 6, 6, 48), bell_left=24, bell_right=49.5, bell_l=(21.5, 38.5), bell_r=(11, 49), grip=(6, 21, 21.5, 38.5), handle_top=41.5, handle_bottom=58, handle_w=8.5, handle_slope=0.3, handle_x=14.5)

def kongkow():
    K = KONGKOW; paths = []
    bx, by, bw_, bh = K["bar"]
    paths.append(oriented(poly_fillets([(bx, by), (bx + bw_, by), (bx + bw_, by + bh), (bx, by + bh)], [bw_ / 2] * 4)))
    paths.append(oriented(poly_fillets([(K["bell_left"], K["bell_l"][0]), (K["bell_right"], K["bell_r"][0]), (K["bell_right"], K["bell_r"][1]), (K["bell_left"], K["bell_l"][1])], [1.5, 1, 1, 1.5])))
    gx0, gx1, gy0, gy1 = K["grip"]
    paths.append(oriented(poly_fillets([(gx0, gy0), (gx1, gy0), (gx1, gy1), (gx0, gy1)], [6, 0, 0, 6])))
    hx, ht, hb, hw, hs = K["handle_x"], K["handle_top"], K["handle_bottom"], K["handle_w"], K["handle_slope"]
    sh = hs * (hb - ht)
    paths.append(oriented(poly_fillets([(hx, ht), (hx + hw, ht), (hx + hw + sh, hb), (hx + sh, hb)], [0, 0, 3.5, 3.5])))
    return finish(paths, "square", "constructed: mouth bar 6 by 48 at x 51.5 (stadium, radius 3); bell a trapezoid, left edge x 24 from y 21.5 to 38.5, right edge x 49.5 from y 11 to 49 (straight edges, radii 1.5 left and 1 right); grip x 6 to 21, y 21.5 to 38.5, left corners radius 6, right corners square; handle 8.5 wide, top y 41.5, bottom y 58, sides parallel at slope 0.3, bottom corners radius 3.5; gaps 3 (grip to bell) and 3 (grip to handle)")


def cuwan():
    paths = []
    # head, top corners 15, bottom corners 11; face plate hole x 16 to 48, y 30 to 49, all corners 8 (counter-clockwise)
    head = oriented(poly_fillets([(12, 21.5), (52, 21.5), (52, 54.5), (12, 54.5)], [15, 15, 11, 11]))
    hole = oriented(poly_fillets([(16, 30), (48, 30), (48, 49), (16, 49)], [8, 8, 8, 8]), cw=False)
    stem = oriented(poly_fillets([(30.5, 17), (33.5, 17), (33.5, 23), (30.5, 23)], [0, 0, 0, 0]))
    ball = circ(32, 14, 4.5)
    left_ear = oriented(poly_fillets([(6, 32.5), (11.5, 32.5), (11.5, 46.5), (6, 46.5)], [3.5, 1, 1, 3.5]))
    right_ear = oriented(poly_fillets([(58, 32.5), (52.5, 32.5), (52.5, 46.5), (58, 46.5)], [3.5, 1, 1, 3.5]))
    def eye(cx):
        cy, rr, w = 40.5, 3.5, 2.5; ro, ri, rc = rr + w / 2, rr - w / 2, w / 2
        segs = []
        for c1, c2, e in arc_cubics(cx, cy, ro, math.pi, 2 * math.pi): segs.append(('C', c1, c2, e))
        for c1, c2, e in arc_cubics(cx + rr, cy, rc, 0, math.pi): segs.append(('C', c1, c2, e))
        for c1, c2, e in arc_cubics(cx, cy, ri, 2 * math.pi, math.pi): segs.append(('C', c1, c2, e))
        for c1, c2, e in arc_cubics(cx - rr, cy, rc, 0, math.pi): segs.append(('C', c1, c2, e))
        return oriented((((cx - ro, cy)), segs))
    paths += [head, hole, stem, ball, left_ear, right_ear, eye(25), eye(39)]
    return finish(paths, "square", "constructed, symmetric about x 32: head x 12 to 52, y 21.5 to 54.5, top corners 15, bottom corners 11; face plate hole x 16 to 48, y 30 to 49, corners 8; antenna stem 3 wide (x 30.5 to 33.5) from y 17; ball circle centre 32, 14 radius 4.5; ears x 6 to 11.5 and 52.5 to 58, y 32.5 to 46.5, outer corners 3.5, inner 1; eyes: two identical half-circle arcs, centre x 25 and 39, y 40.5, radius 3.5, stroke 2.5, round caps. The ear gap (0.5) is below the minimum gap of 3, as in the original: at 20 px the ears join the head")


HEX = dict(cx=32, cy=32, R=26.8, r=5)
WRENCH = dict(head=(32, 31, 13), slot_half=4.5, prong_end=(32.3, 27.5), prong_r=4.9, prong_deg=17.7)

def toolips():
    R, cy = HEX['R'], HEX['cy']
    for _ in range(4):
        out = toolips_at(R, cy)
        x0, x1, y0, y1 = path_bbox(out[4])
        R += (52 - (y1 - y0)) / 2
        cy += 32 - (y0 + y1) / 2
        if R * math.sqrt(3) > 52: R = 52 / math.sqrt(3); 
    R, cy = round(R * 4) / 4, round(cy * 4) / 4
    out = toolips_at(R, cy)
    note = out[3].replace("centre 32, 32, circumradius 26.8 (flats x 8.8 to 55.2, points y 6 to 58)", f"centre 32, {cy}, circumradius {R} (flats x {32 - R * 0.866:.1f} to {32 + R * 0.866:.1f})")
    return out[0], out[1], out[2], note

def toolips_at(R, cy):
    H, Wr = HEX, WRENCH
    cx, r = H["cx"], H["r"]
    # regular hexagon, point up: vertices at angles -90, -30, 30, 90, 150, 210
    V = [(cx + R * math.cos(math.radians(a)), cy + R * math.sin(math.radians(a))) for a in (-90, -30, 30, 90, 150, 210)]
    hx, hy, hr = Wr["head"]
    sx0, sx1 = cx - Wr["slot_half"], cx + Wr["slot_half"]
    # boundary, counter-clockwise on screen: start on the lower-right edge at the slot's right wall
    def on_edge(a, b, x):
        t = (x - a[0]) / (b[0] - a[0]); return (x, a[1] + t * (b[1] - a[1]))
    segs = []
    n = 6
    fl = [fillet(V[i - 1], V[i], V[(i + 1) % n], r) for i in range(n)]
    # edge from V[2] (lower right) to V[3] (bottom): walls cross it; outline goes from the right wall up to V[2]
    start = on_edge(fl[3][2], fl[2][0], sx1) if False else None
    # lower-right edge runs from tangent point of corner 2 (T2) to tangent point of corner 3 (T1)
    e_a, e_b = fl[2][2], fl[3][0]
    start = on_edge(e_a, e_b, sx1)
    # walk: lower-right edge up to corner 2, right flat, corner 1, upper-right edge, corner 0 (top), upper-left edge, corner 5, left flat, corner 4, lower-left edge down to the left wall
    order = [2, 1, 0, 5, 4]
    segs.append(('L', e_a))
    cur = e_a
    # corner order is clockwise in the vertex list; the outline goes the other way, so use corners in reverse with reversed arcs
    path_pts = []
    seq = []
    for i in (2, 1, 0, 5, 4):
        T1, arcs, T2 = fl[i]
        # walking from vertex i+1 side toward vertex i-1 side: enter at T2, leave at T1
        seq.append((T2, arcs, T1))
    segs = []
    first = True
    for T2, arcs, T1 in seq:
        segs.append(('L', T2))
        # the arc runs T1 -> T2 in the list; reverse it
        rev = []
        pts = [T1] + [a[2] for a in arcs]
        for k in range(len(arcs) - 1, -1, -1):
            c1, c2, e = arcs[k]; rev.append(('C', c2, c1, pts[k]))
        segs += rev
    # now at T1 of corner 4 (on the lower-left edge); run to the left wall of the slot
    e_c, e_d = fl[4][0], fl[3][2]
    # lower-left edge goes from corner 4 (T1 side) toward corner 3 (T2 side)
    left_pt = on_edge(fl[4][0], fl[3][2], sx0) if False else None
    p4 = fl[4][0]; p3 = fl[3][2]
    left_pt = on_edge(p4, p3, sx0)
    segs.append(('L', left_pt))
    # slot left wall up to the head circle
    yA = hy + math.sqrt(hr * hr - (sx0 - hx) ** 2)
    A = (sx0, yA)
    segs.append(('L', A))
    angA = math.atan2(A[1] - hy, A[0] - hx)
    # prong
    ex, ey = Wr["prong_end"]; rp = Wr["prong_r"]; al = math.radians(Wr["prong_deg"])
    d = (math.sin(al), -math.cos(al))
    nl = (-math.cos(al), -math.sin(al))  # left normal
    def line_circle(origin, direction):
        # intersect origin + t*direction with the head circle, take the larger t (up the prong)
        ox, oy = origin[0] - hx, origin[1] - hy
        b_ = ox * direction[0] + oy * direction[1]; c_ = ox * ox + oy * oy - hr * hr
        disc = b_ * b_ - c_
        t = -b_ + math.sqrt(disc)
        return (origin[0] + t * direction[0], origin[1] + t * direction[1])
    Lo = (ex + nl[0] * rp, ey + nl[1] * rp); Ro = (ex - nl[0] * rp, ey - nl[1] * rp)
    Lt = line_circle(Lo, d); Rt = line_circle(Ro, d)
    angL = math.atan2(Lt[1] - hy, Lt[0] - hx)
    if angL < angA: angL += 2 * math.pi
    for c1, c2, e in arc_cubics(hx, hy, hr, angA, angL): segs.append(('C', c1, c2, e))
    segs.append(('L', Lo))
    aL = math.atan2(nl[1], nl[0]); aR = math.atan2(-nl[1], -nl[0])
    if aL < aR: aL += 2 * math.pi
    # end cap: from the left normal around the bottom to the right normal (decreasing angle through +90 degrees)
    if aL > math.pi * 1.5: aL -= 2 * math.pi
    for c1, c2, e in arc_cubics(ex, ey, rp, math.atan2(nl[1], nl[0]) % (2 * math.pi), math.atan2(-nl[1], -nl[0]) % (2 * math.pi) if False else math.atan2(-nl[1], -nl[0])): segs.append(('C', c1, c2, e))
    segs.append(('L', Rt))
    angR = math.atan2(Rt[1] - hy, Rt[0] - hx)
    yB = hy + math.sqrt(hr * hr - (sx1 - hx) ** 2)
    B = (sx1, yB)
    angB = math.atan2(B[1] - hy, B[0] - hx)
    while angR < 0: angR += 2 * math.pi
    while angB < angR: angB += 2 * math.pi
    for c1, c2, e in arc_cubics(hx, hy, hr, angR, angB): segs.append(('C', c1, c2, e))
    segs.append(('L', start))
    path = (start, segs)
    pp = [oriented(path, cw=False)]
    return (*finish(pp, "square", "constructed: regular hexagon, point up, centre 32, 32, circumradius 26.8 (flats x 8.8 to 55.2, points y 6 to 58), all six corners radius 5; wrench head circle centre 32, 31 radius 13; handle slot 9 wide (x 27.5 to 36.5), straight parallel walls to the bottom edge; jaw = one capsule of radius 4.9 ending at 32.3, 27.5, leaning 17.7 degrees, two parallel straight cuts to the head circle. The traced original had the slot 2.2 left of centre and a wider, non-regular hexagon (48.4 by 52)"), pp)


MARKS = [
    ("komando", komando), ("trady", lambda: traced("trady", True)), ("toolips", toolips),
    ("cuwan", cuwan), ("kongkow", kongkow),
    ("meridian", meridian), ("glamor", glamor), ("design-tokens", design_tokens),
]
TITLES = {"design-tokens": "Design Tokens"}


def main():
    notes = {}
    for name, fn in MARKS:
        d, evenodd, kind, note = fn()
        title = TITLES.get(name, name.capitalize())
        fr = ' fill-rule="evenodd"' if evenodd else ""
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BOARD} {BOARD}">\n'
               f'  <title>{title}</title>\n  <path fill="{COLOR}"{fr} d="{d}"/>\n</svg>\n')
        open(os.path.join(HERE, name + ".svg"), "w").write(svg)
        notes[name] = {"kind": kind, "note": note}
        print(f"{name:14s} {kind:7s} {note}")
    # before, fitted to the same box (for the overlay)
    os.makedirs(os.path.join(HERE, "before-fit"), exist_ok=True)
    for name, _ in MARKS:
        f = "meridian-mark" if name == "meridian" else name
        src = open(os.path.join(HERE, "before", f + ".svg")).read()
        vb = [float(v) for v in re.search(r'viewBox="([^"]+)"', src).group(1).split()]
        inner = re.sub(r"^.*?<svg[^>]*>", "", src, flags=re.S).rsplit("</svg>", 1)[0]
        inner = re.sub(r"<title[^>]*>.*?</title>", "", inner, flags=re.S)
        kind, sc = fit_box(vb[2], vb[3])
        cx, cy = vb[0] + vb[2] / 2, vb[1] + vb[3] / 2
        out = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BOARD} {BOARD}"><g transform="translate({32 - sc * cx:.3f} {32 - sc * cy:.3f}) scale({sc:.5f})">{inner}</g></svg>\n')
        open(os.path.join(HERE, "before-fit", name + ".svg"), "w").write(out)
    json.dump(notes, open(os.path.join(HERE, "notes.json"), "w"), indent=1)


if __name__ == "__main__":
    main()
