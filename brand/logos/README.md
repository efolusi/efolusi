# Logo system

The spec and the eight product marks (komando, trady, toolips, cuwan, kongkow, meridian, glamor, design-tokens). The SVG files in this folder are the source of truth. `public/<product>.svg` is a byte-for-byte copy of each one; `test/product-logos.test.js` checks that, and that every file passes `check.mjs`.

Run `node check.mjs` here to check the eight files against this spec. `build.py` and `curvefit.py` rebuild the files from the construction numbers below; the trady mark is fitted from its traced original, which is kept in the brainOS notes, not in this repo, so `build.py` runs only where that original is. Colour is `#2C1709` in the files; the site paints every mark through a mask (`ProductLogo`), so the colour never shows.

## Artboard and grid

| Item | Value |
|---|---|
| Artboard | 64 by 64, `viewBox="0 0 64 64"`, every mark centred on 32, 32 |
| Live area | 2 to 62 (a 2 unit margin) |
| Optical boxes | each box has its own target, so the marks read the same size, and the class of each mark is fixed in the table below (`KIND` in `build.py` and `check.mjs`): wide 60 by 40, the full live width. Square 52 by 52. Tall 50 by 58, the full live height. Round 56 across |
| Fit rule | scale the old drawing to fill its box on the limiting side; the mark's own bounding box is centred, not its parts |
| Grid | construction points (corners, centres, edges) are whole or half units. Points derived from a circle (arc ends) are rounded to two decimals |
| Corner radius scale | 1, 2, 3, 4, 6 (a pill is half its height) |
| Minimum gap | 3 units (0.9 px at 20 px) |
| Minimum feature | 4 units for a solid part (1.2 px at 20 px). A round-capped line detail (the otter's whiskers) is at least 3 units (0.9 px at 20 px); below about 16 px it blurs into the face, and a wider whisker would merge with the muzzle |
| Curves | a round part is a true circle or a fitted cubic curve, never a polygon; straight parts are lines. No segment is shorter than 0.5 |
| Node ceiling | per mark, in `check.mjs` (komando 38, trady 115, toolips 42, cuwan 63, kongkow 32, meridian 27, glamor 27, design-tokens 30), about 25% over what each mark needs |
| Lean | one slope for the whole family: 0.5 (Meridian's bars); used by Glamor and Design Tokens |

Every file is the same square, so the site sizes every mark the same way (`size` by `size`); there is no per-mark ratio or trim.

## File format

- Root: exactly `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">`, then `<title>`, then one `<path>`.
- Path attributes in this order: `fill="#2C1709"`, optional `fill-rule="evenodd"`, `d`.
- One fill colour (the site paints it through a mask, so the colour never shows).
- No transforms, ids, styles, classes, strokes, groups, defs, masks, comments or editor metadata.
- Absolute commands only: M L H V Q C Z. Numbers have at most two decimals. No segment shorter than 0.5, and no more segments than the mark's ceiling.
- Name: `<product>.svg` for all eight, lowercase, hyphens.

## The eight marks

| Mark | Box | What changed | What was left on purpose |
|---|---|---|---|
| komando | wide | Rebuilt from centre lines on the grid: stroke 9, pitch 17, run 17, rise 15 each side (was 78, 165, 165, 150 in a 768 box); stroke turned into one filled path; truly symmetric top to bottom | three round-capped chevrons, their slope and weight |
| trady | wide | The only fitted mark: the head, muzzle and whiskers are fitted curves (error 0.12); the eyes, their highlights and the ear holes are true circles; built as a left half and mirrored about x = 32; the four whiskers are round-capped strokes of width 3 | the otter, whisker count and curve |
| toolips | square | Constructed, not fitted (see Construction below): a regular hexagon from six computed points, one corner radius, a wrench from a circle, a straight parallel-walled slot and one capsule-shaped jaw | the hexagon with the wrench cut-out and the leaning jaw |
| cuwan | square | Constructed, not fitted: rounded rectangles for head, face plate and ears, a straight stem and a true circle for the antenna, two identical half-circle eyes; mirrored about x = 32 | robot head, antenna, ears, smiling eyes |
| kongkow | square | Constructed, not fitted: a trapezoid bell with straight edges, a stadium for the mouth bar, a grip and a parallel-sided handle | megaphone and its bar; not symmetric by design |
| meridian | wide | Three bars now identical (height 28, lean 14, thickness 11, pitch 18, corner cut 2); the old path had its own rounding per corner | the leaning bars, slope 0.5 |
| glamor | tall | Restored to the picked drawing's own proportions (base 24 by 22, collar 20 by 7, bullet 16 wide, tip slope 0.5), sheared at slope 0.5, one scale into the tall box | the owner's drawing |
| design-tokens | square | Four cells of 24 with a gap of 4 (was a gap of 2, too tight at 20 px); circle d24, square r4, pill 24 by 12, bar at slope 0.5; stroke turned into fill | circle, square, pill and leaning bar |

## Construction (numbers)

`build.py` produces every file from these numbers. Coordinates are in the 64 artboard, y down. Straight edges are exact lines; every round part is a true circular arc.

| Mark | Construction |
|---|---|
| komando | three chevrons; centre line P0 = (6.5 + 17 i, 17), P1 = (23.5 + 17 i, 32), P2 = P0 + (0, 30); stroke 9, round caps and joins (outline built exactly) |
| meridian | three identical bars i = 0, 1, 2 at x0 = 2 + 18 i: parallelogram (x0 + 14, 18), (x0 + 25, 18), (x0 + 11, 46), (x0, 46); corner cut 2 |
| design-tokens | circle centre (18, 18) radius 12; square (34, 6) 24 by 24, radius 4; pill (34, 46) 24 by 12, radius 6; bar parallelogram (18, 34), (30, 34), (18, 58), (6, 58), corner cut 3 |
| toolips | regular hexagon, point up, centre (32, cy), circumradius R, corners radius 5, values printed in the file note (R and cy are solved so the mark fills 52 high and centres); head circle centre (32, 31) radius 13; slot x 27.5 to 36.5, walls vertical to the bottom edge; jaw: capsule radius 4.9, end centre (32.3, 27.5), axis leaning 17.7 degrees from vertical, its two straight edges run to the head circle |
| cuwan | head rectangle x 12 to 52, y 21.5 to 54.5, top corners radius 15, bottom corners radius 11; face plate hole x 16 to 48, y 30 to 49, corners radius 8; stem x 30.5 to 33.5, y 17 to 23; ball centre (32, 14) radius 4.5; ears x 6 to 11.5 and 52.5 to 58, y 32.5 to 46.5, outer corners radius 3.5, inner 1; eyes: half-circle arcs radius 3.5, stroke 2.5, centre (25, 40.5) and (39, 40.5), round caps |
| kongkow | mouth bar x 51.5 to 57.5, y 6 to 54, radius 3; bell: left edge x 24, y 21.5 to 38.5, right edge x 49.5, y 11 to 49, corner radii 1.5 left and 1 right; grip x 6 to 21, y 21.5 to 38.5, left corners radius 6, right corners square; handle top y 41.5, bottom y 58, 8.5 wide at the top from x 14.5, sides parallel at slope 0.3, bottom corners radius 3.5 |
| glamor | parts in their own units: base (4, 34) to (28, 56), collar (6, 24) to (26, 31), bullet (9, 20), (9, 8.2), (25, 0.1), (25, 20); corner cuts 3, 2, 2.8; shear x' = x - 0.5 y; one uniform scale into the 50 by 58 box; vertices snapped to half units |
| trady | the only fitted mark: scaled 0.0759, centred, fitted, mirrored; the ear holes and eyes are circles whose centres and radii are snapped to the half and quarter unit (values are in `trady.svg`); whiskers: centre line = a parabola fitted through each band, stroke 3 |

Two gaps are below the minimum of 3 on purpose, as in the originals: cuwan's ears to head (0.5) and none other; at 20 px the ears join the head.

## Optical weight

Ink coverage printed by `check.mjs`: komando 34.1%, trady 30.4%, toolips 35.4%, cuwan 21.8%, kongkow 33.0%, meridian 22.4%, glamor 24.8%, design-tokens 38.1%. Equal boxes give equal reach, not equal ink: thin marks (the bars, the lipstick, the robot) always carry less. In the row of eight at 20 px they read as the same height; meridian, the lipstick and cuwan still look a little lighter than toolips, kongkow and design-tokens, and a person would call the set "nearly the same size". Making the light ones heavier would change their drawings, which is the owner's call.

## Honest limits

- At 20 px the otter loses its whiskers and eye detail and reads as a dark face with ears; the robot's smile is a speck. That is the size of the mark, not the drawing.
- The new boxes make wide marks about 7% larger than the first draft and the lipstick about 16% larger; against the site today komando, trady and meridian are still a little smaller.
- The 20 px check is by eye in the preview; the script checks format, fit, segment length and node count.
