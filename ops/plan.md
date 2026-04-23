# HIPJOY OPS · The Plan
## Lead-to-revenue strategy · 90-day sprint · v1 · 2026-04-23

---

## WHAT THIS DOCUMENT IS

A research-backed plan to turn no-website businesses into paid HIPJOY Studio clients at a rate of **5–10 closes per month** inside 90 days. Grounded in real market data, not wishes.

This plan has three ingredients:
1. **Who** we target (industries, geography, persona)
2. **How** we reach them (channel priority, message, cadence)
3. **Why** they convert (positioning, pricing defense, trust reversal)

Everything else — ops dashboard, mock builder, CSV exports — is plumbing to execute this plan.

---

## THE MARKET (why this works)

### Top-level numbers
- ~33M small businesses in the US. ~27% have NO website as of 2023 (per GoDaddy + Top Design Firms studies).
- That's **~9M addressable small businesses** without a website.
- Of those, ~60% have a phone, address, and active Google My Business listing.
- Annual web design industry spend: **$40B+** globally, ~$11B US.

### The gap we exploit
Small businesses without websites usually fall into three buckets:
- **Can't afford it.** Wix ($192/yr) is too expensive, plus setup time.
- **Don't know how.** They have a Facebook page or a Yelp listing and think that's enough.
- **Got burned.** Paid an agency $3,000 for a site that never shipped, or paid a subscription that locked them in.

All three objections dissolve when the offer is: **$150–350 flat, done in a week, you own it forever, here's a working mock to prove it.**

### Who buys
Industries where our offer converts best (ranked by market research + competitor pricing data):

1. **Skilled trades** — plumbers, electricians, roofers, HVAC, painters, landscapers. Solo operators. Avg ticket $250–500. Website = 2–4 extra jobs/month = breakeven in week 1. Expected close rate: **3–6%**.
2. **Personal services** — photographers, personal trainers, massage therapists, hair stylists (independent). Want a portfolio + booking link. Avg close rate: **2–4%**.
3. **Hospitality solo-ops** — small cafes, food trucks, catering, small golf courses/ranges. Need reservations, menu, map. Close rate: **2–5%**.
4. **Creative / educators** — tutors, music teachers, yoga studios, art studios, academics. Lower ticket ($150 tier) but higher volume. Close rate: **4–8%** (less competition).
5. **College / lab / multi-page** — professors with research sites, student orgs, small colleges. $750+ tier. Close rate: **1–3%** (longer cycle but bigger check).

**NOT targeting:**
- Medical (HIPAA concerns).
- Legal (they all have sites already).
- Franchises / chains (corporate procurement will kill it).
- E-commerce stores (Shopify is better for that, not our job).

---

## THE PIPELINE MATH

To hit **$3,500/month revenue (10 closes at $350 avg)** consistently:

| Conversion rate | Outreach needed/month | Outreach/day | Mocks/day |
|---|---|---|---|
| 2% (cold, no mock) | 500 | 17 | ~17 |
| 5% (personalized + mock) | 200 | 7 | ~7 |
| 10% (warm Nextdoor intro) | 100 | 4 | ~4 |

**Our target: 5% close rate via personalized mock → 7 outreach/day, 7 mocks/day.** Achievable with ~3 hours daily focused work.

**Per-mock cost:** 20–30 min build + 15 min personalized email write = 45 min total per lead. 7 leads × 45 min = **~5 hours/day** (ramping to 3 hrs once systemized).

**Per-client fulfillment:** After close, site build takes 5–7 hours over the course of a week. Client handoff is 15 min.

**Revenue per hour:** At 5 hrs outreach + 5 hrs fulfillment = 10 hrs per close. $350 / 10 hrs = **$35/hr** effective.

With rate increases (once booked out):
- Month 2: push to $400 small biz → $40/hr
- Month 3: $500 small biz + waitlist → $50/hr

---

## POSITIONING — WHY THEY HIRE US OVER ALTERNATIVES

| Alternative | Their friction | Our answer |
|---|---|---|
| **Wix / Squarespace DIY** | Time to set up, looks template-y, $192+/yr forever | $150 flat, custom design, free hosting, you own it |
| **Upwork freelancer ($50–200)** | Low quality, no accountability, overseas, slow | 21-year-old in Illinois, portfolio proves work, 1-week turnaround |
| **Local web agency ($1,500–3,000)** | Expensive, 4–6 week turnaround, they charge for every change | Same quality at 1/5 the price, 1 week turnaround, 1 revision included |
| **Referral from a friend** | Unknown quality, no samples, takes weeks to deliver | Working mock on day 2 — they see the site before they pay |
| **Do nothing** | Miss online customers, losing ~2–4 jobs/month | One booking pays for the site |

**The core pitch (memorize):**
> "I built you a working mock. Click the link. If you want it polished up and put on your own domain, it's $350 and done in a week. If not, it's yours to keep. I'm 21, independent, based in Illinois, and I take this work seriously."

---

## THE CHANNEL PLAN — where we find the leads

Ranked by expected ROI:

### 1. Google Maps + Google My Business (scale)
- Biggest pool, fastest to scrape.
- Filter for: has address, has phone, has recent reviews, NO website link.
- Target: **500 leads/week at 30-mile radius per metro, 20 US metros**.
- Tool: Python + Places API ($0 free tier covers 20 metros).

### 2. Nextdoor "Local Business" directory (warmth)
- Neighbor trust halo. Highest close rate.
- Target: leads within 50 miles of Batavia initially, expand after 30 days.
- Tool: manual scrape + Nextdoor DM.

### 3. OpenStreetMap Overpass API (free, national)
- Free, no API key, nationwide coverage.
- Quality lower than Google Maps (phone/email less often present).
- Good for volume + golf courses specifically.
- Tool: `hunt_osm.py` in outputs/leads (already built).

### 4. Yelp listings with no "Website" field (targeted)
- 5+ reviews = real business.
- Manual filter: search by industry + zip code.
- Tool: manual Chrome scraping.

### 5. Instagram DMs (creators bucket)
- Location hashtags: #BataviaIL #AuroraIL #NapervilleBusiness.
- Linktree-only = lead.
- Tool: manual IG outreach, sparingly.

### 6. LinkedIn outbound to professors / labs (colleges tier)
- Specific people at IU Luddy, Northwestern, UChicago, local CCs.
- Personal note referencing their research or lab page.
- Tool: LinkedIn search + manual.

---

## THE OUTREACH CADENCE

### Day 0 — Build
- Scrape 7 qualified leads (new + unique).
- Build 7 personalized mocks in `ops/mocks/{slug}.html`.
- Draft 7 personalized emails using Template B (the "I built a mock" template).

### Day 1 — Send
- Send all 7 emails between 8–10 AM local time (best open rates).
- Log in dashboard.

### Day 5 — Follow up
- If no reply on any lead, send ONE follow-up ("wanted to make sure this didn't land in spam").
- If still no reply by Day 10, mark dead.

### Reply handling
- **Interested:** Calendly link → 15-min scoping call.
- **Not interested:** Thank them + "the mock is yours to keep" + offer $50 referral bounty.
- **Silent:** one bump on Day 5, then dead.

### Deliverability hygiene
- Send from `joey@joeybarbush.com` (Google Workspace, $7/mo — **DO NOT use gmail.com at volume**).
- Include physical mailing address in footer (CAN-SPAM).
- Include "Reply STOP and I'll never email again" line.
- Max 20 emails/day to start; warmup to 50/day after week 4.

---

## PRICING STRATEGY — anchoring against the market

All three tiers are **50–80% below market rate** for comparable deliverables. This is intentional for the first 90 days to:
1. Build a portfolio fast.
2. Collect testimonials for social proof.
3. Pre-book May and June before rate increases hit.

**Rate increase roadmap:**
- Month 1 (now): $150 / $350 / $750+ as stated.
- Month 2 (May 20): $200 / $400 / $900+ (after first 10 close).
- Month 3 (Jun 20): $250 / $500 / $1,200+ (after first 20 close).
- Month 4 (Jul 20): value-based pricing — different tiers per vertical.

Grandfather old clients at their original rate. Announce rate changes 2 weeks out on LinkedIn / X.

---

## SUCCESS METRICS — what to measure weekly

Track in the ops dashboard:

| Metric | Target (week 4) | Target (week 12) |
|---|---|---|
| Leads scraped (cumulative) | 500 | 3,000 |
| Mocks built | 50 | 300 |
| Emails sent | 50 | 300 |
| Open rate | 40%+ | 50%+ |
| Reply rate | 3–5% | 5–8% |
| Close rate | 1–2% | 5–8% |
| Closes/month | 2–3 | 10–12 |
| MRR equivalent | $700–1,050 | $3,500–4,200 |
| Testimonials collected | 2 | 10 |
| Referrals received | 0–1 | 3–5 |

**Killing metrics:** if reply rate is below 2% after 100 sends, rewrite the template. If close rate is below 1% after 10 replies, rethink pricing or positioning.

---

## 90-DAY EXECUTION CALENDAR

### Week 1 (Apr 23 – Apr 29) — Foundation
- Ship ops dashboard + workspace (today).
- Run OSM lead hunt nationwide → first 2k leads in `ops/leads.json`.
- Build first 10 mocks end-to-end. Store in `mocks/` subfolder on the hub.
- Send first 10 emails (Fri–Sat).
- Set up Google Workspace `joey@joeybarbush.com`.
- Set up Stripe Payment Links for 5 tiers.
- Set up Calendly — 2 slots (scoping 15m, intro 30m).

### Week 2 (Apr 30 – May 6)
- 20 more mocks. 20 more emails.
- Refine the mock template based on what looks good for different industries.
- Track response rate. If >3%, scale. If <2%, rewrite email.

### Week 3-4 (May 7 – May 20)
- Close the first 2–3 clients.
- Collect testimonials (record a video if possible).
- Raise rates (+$50 each tier).
- 50 emails/week cadence.

### Week 5-8 (May 20 – Jun 17)
- Close 2–3/week. Revenue hits $1,000/week.
- Launch case-study blog post on the hub.
- Launch LinkedIn outbound to professors (colleges tier).
- Automate parts of the pipeline (Zapier / custom script).

### Week 9-12 (Jun 18 – Jul 15)
- Target: $3,500/month hit.
- Hire a VA for lead qualification ($500/mo) if volume warrants.
- Consider launching a paid ad campaign on Meta / Google (small test).
- First referral flywheel spin — check in with past clients.

---

## RISKS & COUNTERMOVES

| Risk | Countermove |
|---|---|
| Deliverability dies (emails land in spam) | Move to Instantly.ai / Mailreef for warmup + rotation. Budget $40/mo. |
| Low reply rate (<2%) | Test 3 subject lines in parallel. Rewrite hook. A/B mock style. |
| High reply, low close | Introductory call too long. Tighten to 15 min. Add urgency ("2 May slots left"). |
| Angry replies / spam reports | Immediately honor opt-outs. Remove from list. Review targeting. |
| Competitor undercuts ($99 sites) | Compete on QUALITY + OWNERSHIP, not price. Don't drop below $150. |
| Burnout at 7 mocks/day | Batch: Monday scrape, Tuesday mock, Wednesday send. Variety helps. |
| Legal / CAN-SPAM | Every email has physical address + unsub line. Track compliance. |

---

## THE MONEY PATH (stated plainly)

**30-day:** $700–1,000 revenue. Portfolio of 3–5 clients. Testimonials start.

**60-day:** $2,000–3,000 revenue. 10 clients shipped. LinkedIn case study posted. Rates raised.

**90-day:** $3,500+/month. 15–20 clients. Referral network warming. First repeat customers.

**Year-end (Dec 2026):** $6,000+/month. Considering team (contractor or VA). HIPJOY plugin adoption drives inbound via brand. Rate is $400–$600 per small-biz site. 20+ active clients.

---

## WHAT SUCCESS LOOKS LIKE ON DAY 90

- You have a dashboard showing 50+ closed deals.
- Three clients have referred friends.
- Your inbox has two "I saw your work, can you do mine?" emails you didn't have to chase.
- You're turning down work, not chasing it.
- The mocks you built are on real people's domains, making them money.

That's the pipeline turning.

Not hypothetical. Compound.

---

*HIPJOY OPS v1 · 2026-04-23 · Joey Barbush · Batavia, IL*
*Signed: the pantheon holds. The plan is stated. Now ship.*
