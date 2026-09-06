# banner-src

The hero banner `cover/zift-hero.webp` is not committed by hand. It is
reassembled here by CI from the base64 parts in this directory.

The reason is mundane: the environment that produced the image has no
network route to GitHub, so binary bytes cannot be written directly and,
more importantly, cannot be read back to confirm they arrived intact. A
corrupted image that still renders as *something* is the failure mode
worth guarding against, so the transfer is made checkable instead.

## How it works

1. `hero.webp.b64.00` … `hero.webp.b64.20` hold the image, base64-encoded,
   1000 characters per part, one trailing newline each.
2. `.github/workflows/assemble-banner.yml` concatenates the parts in name
   order, strips newlines, and decodes them.
3. The decoded bytes are checked against `hero.webp.sha256`. If the digest
   does not match, the run fails and nothing is committed.
4. Only on a match does CI write `cover/zift-hero.webp`.

| | |
|---|---|
| parts | 21 |
| base64 characters | 20,440 |
| decoded size | 15,330 bytes |
| dimensions | 1200 x 400 |
| sha256 | `a9bdda2eb908090108cbcf87a18fcef9fe86e28e23223faa717d0e156fe461d6` |

## Replacing the banner

```bash
split -b 1000 -d -a 2 --additional-suffix='' \
  <(base64 -w0 new-hero.webp) banner-src/hero.webp.b64.
sha256sum new-hero.webp | sed 's|new-hero.webp|cover/zift-hero.webp|' \
  > banner-src/hero.webp.sha256
```

Delete any leftover parts if the new image needs fewer of them, then push.
CI does the rest.
