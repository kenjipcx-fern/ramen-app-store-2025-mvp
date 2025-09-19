# Ramen App Store — QA Test Plan (MVP)

Scope
- Validate Contract of Done v0.3 across customer app, restaurant portal, and backend APIs.
- Focus on critical user journeys and ramen-specific quality controls.

Test suites
1) Authentication & Profiles
- T-A1: Email signup/login with verification; invalid password policy; lockout after 5 attempts
- T-A2: Apple/Google SSO; token validation; link/unlink providers
- T-A3: Profile CRUD (name, avatar, dietary tags, notification prefs) with optimistic UI
- T-A4: Addresses CRUD; geocoding; zone validation error states
- T-A5: Session list and revoke-all behavior within 1 minute
- T-A6: Data export/delete SLAs (export ≤24h, delete ≤30d)

2) Discovery & Search
- T-D1: Keyword search with typo tolerance; zero results suggestions
- T-D2: Filters (style, price, distance, rating, open-now) persistence and accessibility
- T-D3: Sorting determinism (rating, reliability, distance, prep time); stable secondary sort
- T-D4: Reliability score visibility and tooltip (window, sample size)
- T-D5: Map view pins + delivery eligibility; address change updates
- T-D6: Fee/time indicators update with address and time of day

3) Menu & Customization
- T-M1: Split packaging default ON; surcharge/time disclosure; opt-out saved per order
- T-M2: Firmness/spice/oil/toppings validations and price deltas; inventory gates
- T-M3: Allergen labels and conflict warnings (block vs warn configs)
- T-M4: Notes limit 200 chars + guidance; impact preview display
- T-M5: Cross-sell sides/drinks accuracy and prep-time aggregation
- T-M6: Tsukemen rules (cold noodles, hot broth) enforced and labeled
- T-M7: Custom bowl preset save/edit/delete; reorder uses preset

4) Ordering & Tracking
- T-O1: Checkout delivery vs pickup; ASAP vs scheduled (15-min windows); tipping presets; promos apply/remove
- T-O2: Fees/taxes itemization; packaging surcharge delivery-only; pickup waived
- T-O3: Status lifecycle and timestamps from placed→delivered; messages visible to user
- T-O4: Live map tracking ≤10s updates; loss-of-signal state
- T-O5: ETA p90 ≤6 min in staging with seeded routes; drift alerting
- T-O6: Cancel/modify until cooking; refund trail; idempotent order creation via header
- T-O7: Out-of-stock substitution flow with auto-refund on decline
- T-O8: Masked contact and in-app chat logging; PII redaction

5) Reviews & Ratings
- T-R1: Post-delivery prompt ≤1h; 1 review per order constraint
- T-R2: Facet ratings (heat, firmness, flavor, packaging) capture and display; histogram aggregation
- T-R3: Photo uploads (≤3), auto moderation (NSFW/PII), manual queue for flags
- T-R4: Owner replies within 7 days; immutable customer text; resolution tags
- T-R5: Driver rating separate and not publicly shown on restaurant

6) Payments
- T-P1: Stripe cards, Apple/Google Pay; 3DS step-up
- T-P2: Capture timing config (on accept vs on delivery) honored
- T-P3: Partial/full refunds and store credits with audit logs
- T-P4: Packaging surcharge rule ($0.75 delivery only) and small-order fee/minimums messaging
- T-P5: Tip edit ≤1h after delivery

7) Restaurant Portal
- T-RP1: Onboarding wizard; bank details; test order required before go-live
- T-RP2: Menu CRUD + variant matrices; CSV import; image validation
- T-RP3: Packaging SOP defaults; printed checklist; seal/label codes per order
- T-RP4: Orders queue; ticket/label printing; handoff seal code confirmation
- T-RP5: Analytics metrics and CSV export; facet complaint drilldowns
- T-RP6: Roles & audits; 86 propagation ≤1 min
- T-RP7: Packaging inventory thresholds and alerts

8) Delivery Logistics & Dispatch
- T-L1: Driver pickup instructions; thermal-bag confirmation gate
- T-L2: QR/scan at pickup; timestamp + staff ID; sealed bag photo
- T-L3: Proof-of-delivery photo + timestamp + location
- T-L4: DoorDash/Uber webhook mapping; retries/backoff; idempotency; reconciliation job catches gaps
- T-L5: Spill-check prompts and optional photo

9) Nonfunctional
- T-N1: Availability ≥99.9% (synthetic checks + uptime report)
- T-N2: P95 API <300ms under expected load; mobile cold start <3s
- T-N3: WCAG 2.1 AA audits; keyboard and screen reader checks
- T-N4: Security: OWASP ASVS L2 checklist; TLS, secret management, least privilege
- T-N5: Privacy: DSR export/delete flows; retention policy; PII redaction in logs
- T-N6: Observability: dashboards for ETA accuracy, delivery success, facet satisfaction; alerts on defect rate

Test data & environments
- Seed restaurants with varied reliability; routes for ETA benchmarks; items covering tsukemen/allergens
- Feature flags for surcharge, capture timing; dispatch sandbox keys

Exit criteria
- 100% pass on critical tests (T-M1, T-O1–T-O5, T-P1–T-P4, T-R1–T-R3)
- No Sev-1 open bugs; ≤3 Sev-2; zero security P1s

