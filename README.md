# umutseve4.github.io

Recruiter-focused, evidence-first portfolio for **Umut Sever** — Data Engineering × Economics.

## Product decisions

- Preserves the SEVER/05 editorial identity and premium motion instead of adopting a generic portfolio template.
- States target role and opportunity status in the first viewport.
- Frames every project through ownership, engineering decision, measured result, evidence, and known boundary.
- Separates implemented, tested, verified, deployed, and production-ready status.
- Keeps free-host cold starts and operational limitations visible before outbound demo links.
- Uses dependency-free Canvas 2D; animation pauses off-screen, in hidden tabs, and under reduced-motion.
- Does not publish a résumé link until a current, versioned résumé file exists.

## Local verification

```bash
npm install --ignore-scripts
npm test
npx playwright install chromium
npm run test:browser
```

Static verification checks document structure, recruiter positioning, project ownership, engineering decisions, immutable evidence URLs, timezone correctness, mobile CSS, reduced-motion handling, and external-link safety. Playwright checks desktop/mobile overflow, recruiter content, project count, contact safety, keyboard fallback, reduced motion, motion lifecycle, and proof URL pinning.

## Evidence boundary

A passing site test proves this portfolio renders and exposes its claims as designed. Project-level test counts and deployment boundaries remain sourced from each linked project repository. Commit-pinned artifacts prove identity, not current upstream data freshness or service availability.

## License

MIT — see [LICENSE](LICENSE).
