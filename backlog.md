# Ramen App Store — MVP Backlog (Prioritized)

Conventions
- IDs: RAS-<area>-<sequence>
- DoD: must satisfy relevant items in Contract of Done v1.0

Epic A: Authentication & Profiles
- RAS-A-01: Email/Apple/Google signup + login
  DoD: CoD Auth items lines 5–12 pass QA; sessions secure; rate limiting in place
- RAS-A-02: Email verification + password reset
  DoD: Verification gate before order; reset tokens expire; audit logs
- RAS-A-03: Profile + dietary tags + notification prefs
  DoD: CRUD works with optimistic UI; prefs persisted
- RAS-A-04: Addresses CRUD + serviceability check
  DoD: Zone validation errors surfaced; geocoded coords stored
- RAS-A-05: Payment methods (Stripe) attach/detach
  DoD: Tokenization only; default method selection
- RAS-A-06: Session management + revoke-all
  DoD: Remote logout within 1 minute
- RAS-A-07: Data export & delete
  DoD: Export ≤24h; delete ≤30 days; exceptions logged

Epic B: Discovery & Search
- RAS-B-01: Keyword search with typo tolerance
  DoD: Zero-result suggestions; perf <300ms P95
- RAS-B-02: Filters + sorts + persistence
  DoD: All filters functional; sorts deterministic; accessible
- RAS-B-03: Restaurant profile view + map view
  DoD: Fee/time indicators; delivery eligibility on map
- RAS-B-04: Reliability score display + tooltip
  DoD: Value, sampleSize, windowDays visible; methodology tooltip
- RAS-B-05: Favorites
  DoD: Add/remove; list sync across devices

Epic C: Menu & Customization
- RAS-C-01: Menu API + categories/items/variants
  DoD: Items load <300ms P95; cache bust on 86
- RAS-C-02: Bowl configurator (firmness/spice/oil/toppings)
  DoD: Validations enforced; price deltas accurate
- RAS-C-03: Split packaging default + surcharge
  DoD: Delivery-only surcharge $0.75; waived for pickup; +3 min prep indicator
- RAS-C-04: Allergen labels + conflict warnings
  DoD: Block vs warn configurable per item
- RAS-C-05: Notes limit + guidance; cross-sell module
  DoD: 200 char limit; prep-time aggregation
- RAS-C-06: Tsukemen handling rules
  DoD: Cold noodles, extra-hot broth; labeling
- RAS-C-07: Saved bowl presets
  DoD: CRUD; appear in reorder

Epic D: Orders & Tracking
- RAS-D-01: Cart pricing + idempotent order creation
  DoD: Idempotency-Key required; conflict handled (409)
- RAS-D-02: Checkout (delivery/pickup, schedule, promos, tips)
  DoD: Itemized fees; invalid promos error reason
- RAS-D-03: Status lifecycle + timeline
  DoD: placed→delivered with timestamps; user messages
- RAS-D-04: Map tracking + ETA model + delay reasons
  DoD: Updates ≤10s; p90 ETA error ≤6 min in staging
- RAS-D-05: Cancel/modify window + refunds trail
  DoD: Allowed until cooking; audit trail
- RAS-D-06: Substitution flow for out-of-stock
  DoD: Accept substitute or auto-refund cancel
- RAS-D-07: Contact (masked) + in-app chat
  DoD: Logs with PII redaction

Epic E: Reviews & Reliability
- RAS-E-01: Post-delivery prompt + one-review-per-order
  DoD: Trigger ≤1h post delivery; uniqueness constraint
- RAS-E-02: Facet ratings + photos + moderation
  DoD: Histograms; NSFW/PII filters; manual queue
- RAS-E-03: Owner replies + resolution tags
  DoD: 7-day window; public reply; immutable customer text
- RAS-E-04: Reliability calculation + nightly snapshot
  DoD: Method per reliability-math.md; snapshot table populated; display value + sampleSize

Epic F: Payments
- RAS-F-01: Stripe cards + Apple/Google Pay + 3DS
  DoD: Tokenization only; 3DS step-up
- RAS-F-02: Capture timing config + refunds/credits
  DoD: On accept vs delivery; refund reason codes; store credits
- RAS-F-03: Packaging surcharge + small order fees
  DoD: Delivery-only surcharge; minimums enforced
- RAS-F-04: Tip edit ≤1h
  DoD: Audit trail; edge cases handled

Epic G: Restaurant Portal
- RAS-G-01: Onboarding wizard + test order
  DoD: Cannot go live without test order
- RAS-G-02: Menu/variant CRUD + CSV import + 86
  DoD: 86 propagation ≤1 min; image validation
- RAS-G-03: Packaging SOP defaults + printed checklist + seal codes
  DoD: Seal code printed on labels; PDF checklist
- RAS-G-04: Orders queue + ticket/label printing + handoff seal code
  DoD: State sync with customer app; scan works
- RAS-G-05: Analytics + CSV export
  DoD: Sales/AOV/volume/reliability/complaints; export works
- RAS-G-06: Roles & audit logs
  DoD: Owner/admin/staff enforced; viewable logs
- RAS-G-07: Packaging inventory alerts
  DoD: Thresholds + notifications

Epic H: Dispatch & Logistics
- RAS-H-01: DoorDash integration; Uber fallback
  DoD: Job create; webhooks; provider routing
- RAS-H-02: Webhook processing with retries/backoff + reconciliation job
  DoD: Idempotent; DLQ monitored; reconciliation corrects gaps
- RAS-H-03: Pickup scan (QR) + sealed bag photo
  DoD: Chain-of-custody recorded
- RAS-H-04: Proof-of-delivery photo + location
  DoD: Stored in S3; linked to order
- RAS-H-05: Thermal-bag confirmation gate + spill-check prompt
  DoD: Gate enforced; prompt presented at pickup

Epic I: Observability, Security, Compliance
- RAS-I-01: Metrics/traces/logs + dashboards
  DoD: ETA accuracy, delivery success, facet satisfaction SLOs
- RAS-I-02: Alerting for ETA drift, defect spikes, webhook failures
  DoD: On-call notified; runbooks linked
- RAS-I-03: OWASP ASVS L2 checklist; WCAG AA audits
  DoD: Findings triaged and fixed for MVP
- RAS-I-04: GDPR/CCPA flows (export/delete); retention policy
  DoD: SLAs met; data minimization checks

Dependencies
- Payments before Orders capture
- Portal menu before Discovery/menu
- Dispatch integration before Tracking
- Reliability after Reviews

Out of scope (post-MVP)
- Loyalty/points; subscriptions; marketplace ads/boosting; deep POS integrations

