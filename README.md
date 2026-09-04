# umutseve4.github.io

A cinematic, evidence-first portfolio for **Umut Sever** across two connected tracks: **Data & Reliability Systems** and **Graphics & Simulation Systems**.

## Design and engineering direction

- A single Awwwards-inspired signature moment: a pointer-responsive Canvas field, editorial scale, grain, reveal motion, and restrained card depth.
- No production runtime dependencies, external font CDN, analytics, trackers, or animation framework.
- One owned `requestAnimationFrame` loop; it stops when the hero is off-screen, the tab is hidden, or reduced motion is requested.
- Device-pixel ratio is capped at `1.5`; card tilt is bounded to approximately ±2 degrees.
- Core content remains available without JavaScript. Keyboard navigation, visible focus, skip-link behavior, and reduced-motion fallback are first-class.
- Claims expose ownership, decisions, and status boundaries. Project repositories remain the source of truth.

## Local verification

```bash
npm install --ignore-scripts
npm test
npx playwright install chromium
npm run test:browser
```

Static checks cover semantics, anchor integrity, exact contact targets, four selected systems, two-track positioning, external-link safety, motion observability, evidence pins, and boundary language.

Playwright covers desktop, tablet, and mobile layouts; JavaScript-disabled fallback; keyboard skip navigation; contact targets; reduced motion; RAF pause/resume; bounded tilt; tablet containment; and immutable proof URLs.

## Evidence boundary

A passing portfolio test verifies this site’s rendering and declared behavior. It does not independently prove every linked project’s upstream freshness, service availability, GPU/browser compatibility, deployment health, or production readiness. Commit-pinned artifacts establish identity; each project repository defines current scope.

## License

MIT — see [LICENSE](LICENSE).
