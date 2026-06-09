# Site Audit Report — 2026-05-15

Autonomous audit pass on Joey's GitHub Pages while at sister's wedding.
All work staged in working tree. Push gated on Joey running `DEPLOY_AUDIT_2026-05-15.bat` (no creds in this shell).

## 1. Pages discovery

GitHub API on `Joeybarbush` (public repos):

| Repo | Pages | Default branch | Notes |
|---|---|---|---|
| `Joeybarbush` (profile) | No Pages | main | profile README, no static site |
| `joeybarbush-hub` | Pages enabled | main | the only Pages-serving repo |

Expected repos that did NOT surface as public: `hipjoy`, `iron_bloom`, `hipx-workspace`, `joeybarbush-hub-2`. Either private (invisible to unauthed API) or do not exist. **Joey: confirm whether any of those should be public + Pages-enabled.**

GitHub Actions on `joeybarbush-hub`: most recent runs all `success` (last build 2026-05-09 22:21 UTC). No failed deploys to investigate.

## 2. Live URL audit (52 of 52 reachable, all HTTP 200)

Index URLs:

| Path | Status | Notes |
|---|---|---|
| `/` | 200 | personal hub (root) |
| `/hipjoy/` | 200 | HIPJOY systems hub |
| `/offers/` | 200 | offer tiers index |

All 50 other tracked HTML pages also returned 200 on this audit (full list in `DEPLOY_AUDIT_2026-05-15.bat`).

**`/hipjoy/` 404 regression diagnosis:** could not reproduce. Five sequential pulls returned 200. Local `hipjoy/index.html` blob (`cc7d73e`, 40958 bytes) matches live etag size. `.nojekyll` present at root and served. GitHub Actions deploy logs show the 5/9 builds completed successfully. **Conclusion: the CTO snapshot 404 was a transient CDN miss or short window during a Pages republish, not a structural issue. No fix required; the path is stable now.**

## 3. What I changed (51 files, staged but not pushed)

### Em-dash scrub (476 → 0 across the live tree)
- Titles + meta `content`: ` — ` → `: ` (clean SEO separator). Examples: `HIPJOY: Sovereign Cognitive Operating System`, `Offer Tiers: HIPJOY`, `NEURO: HIPJOY Field Entity`.
- Body text ` — `: comma when surrounding context is short, period+capitalize when the preceding clause already had a comma (avoids ugly comma piles like `clinical, precise, calibrated, equations with...` → `clinical, precise, calibrated. Equations with...`).
- Tight inline em-dashes (no surrounding spaces): hyphen.
- Result: zero em-dashes in any live page outside `_archive/`.

### Meta polish
- `<link rel="canonical" href="…">` added to every page that lacked one. Absolute URL derived from filepath.
- `<link rel="icon">` (inline SVG) added to every page that lacked one. Cream-J favicon for hub-tier pages, dark-diamond favicon for `entities/`, `hipjoy/`, `offers/`, `private/`.
- Result: all 51 modified pages now have viewport, canonical, favicon. Front-door pages (root, hipjoy, offers) also have OG/Twitter/theme-color from prior work.

### What I deliberately did NOT add
- OG/Twitter cards on the ~30 pages that lacked them. Adding those required writing `og:description` and `og:title` content. That crosses into fabrication. Joey can fill them in (one short description per page) and re-deploy.
- `theme-color` meta on pages that lacked it. Palette varies by page (moss vs. crimson vs. ash) and I didn't want to guess.

## 4. What's NOT in scope per Joey's mid-session redirect

- **Root `index.html`**: a parallel v3 rebuild (CODEBREAKER cyber + mythos aesthetic) is replacing it. My em-dash scrub on root is in the working tree but explicitly NOT staged by `DEPLOY_AUDIT_2026-05-15.bat`. The v3 task's commit will overwrite it.
- **`_archive/`**: untouched. The v3 rebuild also created `_archive/index.v2-PRIOR-de0a4de.html` (snapshot of v2 root, 31349 bytes) — leaving alone for v3 to commit.

## 5. LUMEN floor — items needing Joey's hand

### Custom domain `joeybarbush.com` is NXDOMAIN
DNS lookup returns no records. The domain is referenced from:
- `farm.html` lines 2456-2457: `mailto:joey@joeybarbush.com` and `https://joeybarbush.com`
- `log.html` line 7: meta description copy
- `profile.html` lines 1845, 2016, 2022, 2028: share-intent URLs (LinkedIn share, copy link, etc.) point to `https://joeybarbush.com/waitlist.html` and `https://joeybarbush.com/profile.html` — currently these share buttons emit broken URLs.

**Action: register/configure DNS for `joeybarbush.com` and add CNAME to `joeybarbush.github.io`, OR sweep these references over to the `joeybarbush.github.io/joeybarbush-hub/...` URLs.** Did not auto-rewrite because the domain looks intentional (you're staging it, not abandoning it).

### Broken absolute hrefs in `farm.html`
`farm.html` has 7 absolute root hrefs that 404 on the project-pages URL: `/joey.html`, `/mythos.html`, `/craftbook.html`, `/garden.html`, `/fieldmap.html`, `/protocol.html`, `/founder.html`. These would resolve correctly under the future `joeybarbush.com` custom domain, so this is the same dependency as the DNS item above. **Not auto-fixed** — would require either the custom domain or restructuring + creating those pages (would be fabrication).

### Social link verification
- `github.com/Joeybarbush` — 200 ✓
- `instagram.com/joeybarbush` — 200 ✓
- `linkedin.com/in/joey-barbush-115575403` — returns 999 (LinkedIn always blocks anonymous fetches; link is structurally valid, no further check possible without auth)
- `twitter.com/Joey_Barbush` / `x.com/Joey_Barbush` — 403 (X always blocks anonymous fetches; link is structurally valid)
- Phone `(331) 213-5614` and email `joey@joeybarbush.com` — present on hub pages. Email depends on the DNS item above resolving.

### Other Pages-enabled repos
None found public. If `iron_bloom`, `hipx-workspace`, etc. exist privately, I cannot verify them. **Joey: if you want me to audit private repos in a follow-up, share a `gh auth token` or run `gh repo list --visibility all` next session.**

## 6. To deploy

`C:\Users\joey\joeybarbush-hub\DEPLOY_AUDIT_2026-05-15.bat` — double-click to run.

The bat:
1. Stages only the 51 audited files (defensively excludes root `index.html` and `_archive/`).
2. Sanity-checks the staged diff before committing.
3. Commits with a structured message describing scope.
4. Pushes to `origin/main`.

Pages rebuild lag is the usual 30-60s.

## 7. What could not be verified

- Whether the v3 root rebuild has finished or what its final form looks like.
- Pages config on `joeybarbush-hub` itself (the API endpoint requires auth, returned 404 to anon — but live URLs all serve 200, so config is healthy in practice).
- Mobile rendering at 375px — every page has correct viewport meta, but I did not screenshot at narrow widths. Visual responsive QA needs a browser pass on Joey's end if he wants belt-and-suspenders.
- LinkedIn / X / Instagram pages — endpoints block anonymous bots; can't confirm content beyond the URL being valid.
