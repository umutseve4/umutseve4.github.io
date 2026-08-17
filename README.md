# SEVER/05 — Umut Sever Portfolio

**Live:** https://umutseve4.github.io

Personal portfolio of **Umut Sever** — Economics Engineering student at Uludağ University, headed for **data engineering**. An experimental 5-chapter interactive landing page: WebGL fluid background, kinetic typography, interactive 3D object, and a proof-over-claims project grid.

## Chapters

| # | Section | What it does |
|---|---------|--------------|
| CH.01 | Kinetic Hero | Char-split GSAP intro, scroll-velocity skew, infinite skill marquee |
| CH.02 | Interactive Object | three.js icosahedron — wireframe + points, pointer tilt, breathing vertex distortion |
| CH.03 | Selected Work | Bento grid: local-market-scanner (127 tests), UludagFormula (UE 5.8), asset pipeline |
| CH.04 | Field Log | Draggable evidence carousel — test counts, CI results, acceptance gates |
| CH.05 | Contact | Immersive footer, live Bursa clock, social links |

## Tech

- Single-file `index.html` — no build step, deploys straight to GitHub Pages
- **WebGL 1** fluid background: domain-warped FBM noise shader, mouse-reactive
- **three.js 0.160** for the CH.02 object, **GSAP 3.12 + ScrollTrigger** for all motion
- Custom magnetic cursor (`data-magnetic`), film grain + vignette overlays
- Fonts: Archivo + Space Grotesk (Google Fonts), accent color `#D40027`
- Respects `prefers-reduced-motion`; touch devices get native cursor

## Run locally

```
git clone https://github.com/umutseve4/umutseve4.github.io.git
cd umutseve4.github.io
# open index.html in a browser — that's it
```

## Links

- GitHub: https://github.com/umutseve4
- LinkedIn: https://www.linkedin.com/in/umut-sever-7851b73a6/
- X / Twitter: https://x.com/umutseve4
- Reddit: https://www.reddit.com/user/Umutseve4/
- Featured project: https://github.com/umutseve4/local-market-scanner

© 2026 Umut Sever. All rights reserved.
