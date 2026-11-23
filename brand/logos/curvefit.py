"""Schneider's curve fitting (Graphics Gems I), plus corner detection and circle detection. No dependencies."""
import math

def sub(a, b): return (a[0] - b[0], a[1] - b[1])
def add(a, b): return (a[0] + b[0], a[1] + b[1])
def mul(a, s): return (a[0] * s, a[1] * s)
def dot(a, b): return a[0] * b[0] + a[1] * b[1]
def norm(a): return math.hypot(a[0], a[1])
def unit(a):
    l = norm(a)
    return (a[0] / l, a[1] / l) if l > 1e-12 else (0.0, 0.0)
def dist(a, b): return norm(sub(a, b))


def bez(c, t):
    u = 1 - t
    return (u**3 * c[0][0] + 3 * u * u * t * c[1][0] + 3 * u * t * t * c[2][0] + t**3 * c[3][0],
            u**3 * c[0][1] + 3 * u * u * t * c[1][1] + 3 * u * t * t * c[2][1] + t**3 * c[3][1])

def bez1(c, t):
    u = 1 - t
    return tuple(3 * (u * u * (c[1][i] - c[0][i]) + 2 * u * t * (c[2][i] - c[1][i]) + t * t * (c[3][i] - c[2][i])) for i in (0, 1))

def bez2(c, t):
    u = 1 - t
    return tuple(6 * (u * (c[2][i] - 2 * c[1][i] + c[0][i]) + t * (c[3][i] - 2 * c[2][i] + c[1][i])) for i in (0, 1))


def chord_param(pts):
    u = [0.0]
    for i in range(1, len(pts)): u.append(u[-1] + dist(pts[i], pts[i - 1]))
    L = u[-1] or 1
    return [v / L for v in u]


def generate(pts, u, t1, t2):
    p0, p3 = pts[0], pts[-1]
    A = [(mul(t1, 3 * (1 - x)**2 * x), mul(t2, 3 * (1 - x) * x * x)) for x in u]
    C = [[0, 0], [0, 0]]; X = [0, 0]
    for i, x in enumerate(u):
        a1, a2 = A[i]
        C[0][0] += dot(a1, a1); C[0][1] += dot(a1, a2); C[1][1] += dot(a2, a2)
        b0 = (1 - x)**3 + 3 * (1 - x)**2 * x; b1 = 3 * (1 - x) * x * x + x**3
        tmp = sub(pts[i], add(mul(p0, b0), mul(p3, b1)))
        X[0] += dot(a1, tmp); X[1] += dot(a2, tmp)
    C[1][0] = C[0][1]
    det = C[0][0] * C[1][1] - C[1][0] * C[0][1]
    seg = dist(p0, p3)
    if abs(det) > 1e-12:
        al, ar = (X[0] * C[1][1] - X[1] * C[0][1]) / det, (C[0][0] * X[1] - C[1][0] * X[0]) / det
    else:
        al = ar = 0
    eps = 1e-6 * seg
    if al < eps or ar < eps or al > seg * 1.5 or ar > seg * 1.5: al = ar = seg / 3
    return [p0, add(p0, mul(t1, al)), add(p3, mul(t2, ar)), p3]


def max_err(pts, b, u):
    m, idx = 0, len(pts) // 2
    for i in range(1, len(pts) - 1):
        d = dist(bez(b, u[i]), pts[i])
        if d > m: m, idx = d, i
    return m, idx


def reparam(pts, b, u):
    out = []
    for p, t in zip(pts, u):
        q = bez(b, t); q1 = bez1(b, t); q2 = bez2(b, t)
        d = sub(q, p)
        num = dot(d, q1); den = dot(q1, q1) + dot(d, q2)
        out.append(t if abs(den) < 1e-12 else min(1, max(0, t - num / den)))
    return out


def fit(pts, t1, t2, err):
    n = len(pts)
    if n == 2:
        d = dist(pts[0], pts[1]) / 3
        return [[pts[0], add(pts[0], mul(t1, d)), add(pts[1], mul(t2, d)), pts[1]]]
    u = chord_param(pts)
    b = generate(pts, u, t1, t2)
    m, idx = max_err(pts, b, u)
    if m < err: return [b]
    if m < err * 4:
        for _ in range(6):
            u = reparam(pts, b, u)
            b = generate(pts, u, t1, t2)
            m, idx = max_err(pts, b, u)
            if m < err: return [b]
    idx = min(max(idx, 1), n - 2)
    tc = unit(sub(pts[idx - 1], pts[idx + 1]))
    return fit(pts[:idx + 1], t1, tc, err) + fit(pts[idx:], mul(tc, -1), t2, err)


def straight(pts, tol):
    a, b = pts[0], pts[-1]
    l = dist(a, b)
    if l < 1e-9: return False
    return all(abs((b[0] - a[0]) * (a[1] - p[1]) - (a[0] - p[0]) * (b[1] - a[1])) / l < tol for p in pts)


def tangent_at(pts, i, direction, span=0.9):
    """unit tangent at pts[i] pointing along `direction` (+1 forward, -1 backward) over ~span units."""
    n = len(pts); acc = 0; j = i
    while 0 <= j + direction < n and acc < span:
        acc += dist(pts[j], pts[j + direction]); j += direction
    return unit(sub(pts[j], pts[i]))


def clean(pts, mind=0.04):
    out = []
    for p in pts:
        if not out or dist(p, out[-1]) >= mind: out.append(p)
    return out


def corners(pts, closed, deg=38, win=0.8):
    n = len(pts); res = []
    def at(i, d):
        acc = 0; j = i
        while acc < win:
            k = j + d
            if closed: k %= n
            elif not 0 <= k < n: return None
            acc += dist(pts[j], pts[k]); j = k
            if closed and j == i: break
        return pts[j]
    ang = [0.0] * n
    for i in range(n):
        a, b = at(i, -1), at(i, 1)
        if a is None or b is None: continue
        v1, v2 = unit(sub(pts[i], a)), unit(sub(b, pts[i]))
        ang[i] = math.degrees(math.acos(max(-1, min(1, dot(v1, v2)))))
    for i in range(n):
        if ang[i] > deg:
            # keep only the local maximum within the window
            w = [(i + k) % n if closed else i + k for k in range(-3, 4) if closed or 0 <= i + k < n]
            if ang[i] >= max(ang[j] for j in w) and (not res or True): res.append(i)
    # merge corners that are adjacent
    merged = []
    for i in res:
        if merged and (i - merged[-1]) <= 3 and not (closed and False): continue
        merged.append(i)
    return merged


def fit_closed(pts, err=0.12, deg=38):
    """closed polygon -> (start, [segments]); segment = ('L', p) or ('C', c1, c2, p)."""
    pts = clean(pts)
    if dist(pts[0], pts[-1]) < 0.04: pts = pts[:-1]
    n = len(pts)
    cs = corners(pts, True, deg)
    segs = []
    if not cs:
        t = unit(sub(pts[1 % n], pts[-1]))
        ring = pts + [pts[0]]
        start = pts[0]
        for b in fit(ring, t, mul(t, -1), err): segs.append(('C', b[1], b[2], b[3]))
        return start, segs
    # rotate so that the first corner is index 0
    k = cs[0]
    pts = pts[k:] + pts[:k]
    cs = sorted((c - k) % n for c in cs)
    ring = pts + [pts[0]]
    cs.append(n)
    start = ring[0]
    for a, b in zip(cs, cs[1:]):
        run = ring[a:b + 1]
        if len(run) < 2: continue
        if len(run) == 2 or straight(run, 0.1):
            segs.append(('L', run[-1])); continue
        t1 = tangent_at(run, 0, 1); t2 = tangent_at(run, len(run) - 1, -1)
        for bz in fit(run, t1, t2, err): segs.append(('C', bz[1], bz[2], bz[3]))
    return start, segs


def fit_open(pts, t1=None, t2=None, err=0.12, deg=38):
    """open chain -> (start, segments)."""
    pts = clean(pts)
    cs = [0] + [c for c in corners(pts, False, deg) if 0 < c < len(pts) - 1] + [len(pts) - 1]
    segs = []
    for a, b in zip(cs, cs[1:]):
        run = pts[a:b + 1]
        if len(run) == 2 or straight(run, 0.1): segs.append(('L', run[-1])); continue
        a1 = t1 if (a == 0 and t1) else tangent_at(run, 0, 1)
        a2 = t2 if (b == len(pts) - 1 and t2) else tangent_at(run, len(run) - 1, -1)
        for bz in fit(run, a1, a2, err): segs.append(('C', bz[1], bz[2], bz[3]))
    return pts[0], segs


def circle_of(pts, tol=0.035):
    n = len(pts)
    cx = sum(p[0] for p in pts) / n; cy = sum(p[1] for p in pts) / n
    # refine: area-weighted centre is better for uneven sampling; use bbox centre
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
    rs = [dist(p, (cx, cy)) for p in pts]
    r = sum(rs) / n
    if r > 0 and max(abs(v - r) for v in rs) / r < tol: return (cx, cy, r)
    return None


def mirror_path(path, ax):
    """mirror about x = ax and reverse, keeping the winding of the original."""
    start, segs = path
    m = lambda p: (2 * ax - p[0], p[1])
    pts = [start]
    for s in segs: pts.append(s[-1])
    out = []
    for k in range(len(segs) - 1, -1, -1):
        s = segs[k]; frm = pts[k]
        if s[0] == 'L': out.append(('L', m(frm)))
        else: out.append(('C', m(s[2]), m(s[1]), m(frm)))
    return m(start), out
