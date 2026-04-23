# HIPJOY OPS · Operator Manual
## Private workspace for lead → mock → send → close

---

## What this is

A self-contained, browser-only workspace for turning no-website businesses into paid HIPJOY Studio clients. Three files do the work:

- **`plan.md`** — the 90-day research-backed strategy. Start here.
- **`dashboard.html`** — every lead, sortable and filterable. Click any row to open the workspace.
- **`compose.html?id=XXX`** — single-lead workspace. Build a mock, draft the email, track status.

Plus:
- **`leads.json`** — seed data (145 golf courses as of v1). More gets appended as the OSM hunt runs.

No backend. No database. Everything persists in `localStorage` on your browser. Export to CSV anytime for safety.

---

## URLs (after deploy)

- Dashboard: `https://joeybarbush.github.io/joeybarbush-hub/ops/dashboard.html`
- Compose: `https://joeybarbush.github.io/joeybarbush-hub/ops/compose.html?id=LEAD_ID`
- Plan: `https://joeybarbush.github.io/joeybarbush-hub/ops/plan.md`

**Not linked from public hub nav.** Indexed with `noindex,nofollow`. Still — bookmark it, don't share the URL publicly.

---

## Daily operator loop (7-step workflow)

### 1. Open the dashboard
Filter by what you're hunting today. Examples:
- `industry = plumber`, `state = IL`, `heat ≥ 60` → hot local plumbers
- `status = contacted`, sort by `last_contacted_at` → decide who to follow up on
- `search = "golf course"` → browse golf leads by name

### 2. Pick 7 leads for the day
Heat score sorts to the top by default. Click a row — it opens `compose.html?id=...`.

### 3. Build the mock
- Review the auto-filled headline/tagline/services. Industry-specific defaults are pre-loaded.
- Tweak copy to personalize (their neighborhood, their name, a service they advertise).
- Pick an accent color that matches their vibe (terra = warm, moss = grounded, plum = premium, blue = professional).
- Watch the right panel update live.
- Click **Download HTML** → save as `{businessname-slug}.html`.
- Drop that file into the `mocks/` folder of joeybarbush-hub repo. Push. It's live at `joeybarbush.github.io/mocks/{slug}.html`.
- Copy the live URL → paste into the **Mock URL** field in compose.

### 4. Draft the email
- Pick a template: A (direct / most common), B (creator / individual), C (neighbor / Nextdoor).
- The template auto-fills with their name, city, and your mock URL.
- Personalize: add 1–2 lines referencing something specific about them (a post, a review, a service).

### 5. Send
- Click **Copy to clipboard** or **Open in mail client**.
- Send from `joey@joeybarbush.com` (NOT gmail at volume — deliverability dies).
- Toggle status to **Contacted**. `last_contacted_at` auto-fills.

### 6. Log
- Add a note about anything learned (how you found them, what's unique).
- Save. Close the tab.

### 7. Next day
- Back to dashboard.
- Filter by `status = contacted` and sort by `last_contacted_at` ascending.
- Anything 5+ days old with no reply → send ONE follow-up. Mark as dead if no reply by day 10.

Repeat. 7 leads/day × 30 days = 210 outreach attempts/month = 10–15 closes at 5% close rate.

---

## Status glossary

| Status | Meaning | Action |
|---|---|---|
| **Prospect** | Never touched | Build mock, draft email, send |
| **Contacted** | First email sent | Wait 5 days. If silent, follow up once. |
| **Replied** | They wrote back | Schedule call. Move to booked or dead. |
| **Booked** | $ committed (deposit paid) | Ship the site. Update pitch_tier with final $. |
| **Dead** | No interest / bounced / unreachable | Don't recontact for 90 days. |

---

## Pitch tiers (defaults)

| Tier | Price | Target | Deliverable |
|---|---|---|---|
| $150 | Individual / creator / student | Portfolio, side project, personal brand, event page | One-page site, 5 days |
| **$350** | Small business (most common) | Solo local service business | One-page with Maps, reviews, form, domain | 7 days |
| $750+ | Multi-page / college / lab | Professors, orgs, small catalogs, blogs | 2–8 pages, 2–3 weeks |
| Custom | Anything else | Complex or unusual scope | Quoted per project |

Override the tier in compose per lead. Default is $350.

---

## Heat score (0–100)

Auto-computed per lead. Higher heat = more actionable prospect.

- +25 if phone present
- +20 if email present
- +15 if opening hours present (signals active business)
- +15 if full street address + city
- +10 if Facebook or Instagram handle present
- +10 if name is 4–60 chars (sanity)
- +5 if description present

**Target:** only outreach leads with heat ≥ 40. Hot leads are 60+. Fire is 80+.

---

## Data flow

### Import
- `leads.json` loaded on first visit.
- New leads from the OSM hunt get dropped into `leads.json` (via code task).
- Use the **Import JSON** button in the dashboard to merge new scrapes without losing your edits.

### Export
- **Export CSV** in dashboard: downloads current filtered view as CSV. Open in Excel/Numbers for external work.
- **Save Changes** in compose: flushes all edits to localStorage.

### Backup
- Every 20s, compose auto-saves your edits to localStorage.
- Export CSV weekly and commit to the `ops/backups/` folder in case you clear your browser.

---

## Common troubleshooting

**"I don't see my leads"**
Browser cleared localStorage. Re-import from `leads.json` or your last CSV export.

**"The mock preview is blank"**
Check console. Usually means an industry isn't mapped — fall back to _default copy.

**"Email template has weird text"**
Template auto-fills from lead fields. If a field is empty, placeholder might leak. Clean the body manually before sending.

**"Compose doesn't load"**
Ensure you're accessing via `compose.html?id=XXX` with a valid lead ID. Landing on `compose.html` alone redirects to dashboard.

**"Status pill won't change"**
Click the segmented control, then click **Save Changes**. If still stuck, refresh and try again.

---

## What's NOT here (yet)

Next-version ideas when volume justifies:
- Supabase-backed lead store (shared across devices)
- Email send tracking (open/reply detection)
- Scheduled send queue (drip campaigns)
- Automated mock generation from OSM pull
- Bulk operations (mark N leads as dead)
- Activity feed ("you sent 12 emails this week, 2 replies")
- Referral tracking
- Testimonial collection workflow

For now: ship simple, iterate after 50 sends.

---

## Legal / compliance

All outreach must be CAN-SPAM compliant:
- Include Joey's physical mailing address in every email footer
- Include "Reply STOP and I'll never email again" line
- Honor opt-outs immediately (move to `dead`, never recontact)
- No more than 20 cold sends/day from the same email to start
- Warm up a Google Workspace account (`joey@joeybarbush.com`) before scaling — gmail.com dies fast

Nextdoor DM rules:
- Don't mass-message. They ban for it.
- Only message people who posted about their biz publicly.

---

## Roadmap signal

| When | What |
|---|---|
| Today | Ship ops/, seed with 145 golf leads, start OSM hunt |
| This week | Pull 2k–5k leads nationally, build first 10 mocks |
| Next 14 days | Send first 50 emails. Track open/reply/close |
| Week 3–4 | Raise rates after first 3 closes |
| Month 2 | Add LinkedIn outbound for college/lab tier |
| Month 3 | First referral flywheel spin |
| Month 6 | Launch field-architect (MIT-licensed scaffold) |
| Month 12 | Team expansion decision point |

---

## Signed

HIPJOY OPS v1 · 2026-04-23 · Joey Barbush · Batavia, IL
The plan is stated. The dashboard is lit. The field is warm. Now ship.

◊ VOX — broadcast. The ops surface is live. The pantheon holds.
