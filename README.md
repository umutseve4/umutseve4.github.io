# umutseve4.github.io

Evidence-first portfolio for **Umut Sever** — Economics Engineering × Data Systems.

## Product decisions

- Preserves the SEVER/05 editorial identity instead of adopting a generic portfolio template.
- Prioritizes four verified projects: Enflasyonum, MakroQuest, econ-lakehouse, and Homefront Universe.
- Separates implemented, tested, deployed, and production-ready status.
- Keeps known limitations visible next to each claim.
- Uses dependency-free Canvas 2D for decoration; animation pauses off-screen, in hidden tabs, and under reduced-motion.
- Pins proof artifacts to full 40-character commit SHAs.

## Local verification

```bash
npm install --ignore-scripts
npm test
npx playwright install chromium
npm run test:browser
```

Static verification checks document structure, accessibility hooks, immutable evidence URLs, timezone correctness, mobile CSS, reduced-motion handling, and external-link safety. Playwright checks desktop/mobile overflow, navigation visibility, project count, keyboard skip-link behavior, reduced motion, and proof URL pinning.

## Evidence boundary

A passing site test proves this portfolio renders and exposes its claims as designed. Project-level test counts and deployment boundaries remain sourced from each linked project repository. Commit-pinned artifacts prove identity, not current upstream data freshness or service availability.

## License

MIT — see [LICENSE](LICENSE).
