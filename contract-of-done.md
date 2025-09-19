# Contract of Done — Ramen App Store (v1.0, MVP Locked)

Derived from acceptance criteria in specs.md. All items must be satisfied for MVP sign-off.

## Authentication & Profiles
- [ ] Email/Apple/Google signup and login; email verification; password reset; session management; optional 2FA
- [ ] Profile: name, avatar, dietary tags, default address; notification prefs; delete/deactivate account; active session management
- [ ] Addresses: add/edit/delete; geocoded; default; zone validation with clear errors
- [ ] Payments tokenized via provider; no PAN at rest
- [ ] Owner roles: owner/admin/staff; invites; revokes; audit logs for role/menu/order changes
- [ ] Driver: login only if verification valid; expired docs blocked; document upload flow present
- [ ] Data rights: export within 24h; deletion within 30 days

## Discovery & Search
- [ ] Keyword search with typo tolerance across restaurant/dish/tags; empty state with suggestions
- [ ] Filters: style, price, distance, rating, open-now; session persistence; accessible controls
- [ ] Sorts: rating, texture reliability, distance, prep time; indicates current sort
- [ ] Reliability score with methodology tooltip and sample size
- [ ] Restaurant page: photos, hours, fees, prep time, min order, packaging policy, featured items, reviews
- [ ] Favorites CRUD and list view; sync across devices
- [ ] Map view with delivery zones and eligibility indicator
- [ ] Dietary filters and disclosures
- [ ] Fee/time indicators per listing
- [ ] Refund policy automation: minor quality defects auto-credit $5 or 20% (whichever higher); spill/undelivered full refund; late >15 min beyond ETA => 15% credit; abuse detection flags


## Menu & Customization
- [ ] Split packaging default ON with surcharge and prep-time disclosure; opt-out available
- [ ] Firmness (3), spice (0–5), oil (3), toppings add/remove with price deltas; inventory checks; invalid combos prevented
- [ ] Allergen labels + conflict warnings; configurable block vs warn
- [ ] Notes limited to 200 chars with guidance; impact preview if applicable
- [ ] Cross-sell module for sides/drinks with dynamic prep-time aggregation
- [ ] HD photos, ingredients, calories when available
- [ ] Tsukemen-specific packaging rules enforced
- [ ] Saved custom bowl presets CRUD
- [ ] 86 controls at variant/topping level with ≤1 min propagation

## Ordering & Tracking
- [ ] Checkout: delivery/pickup, ASAP/scheduled (15-min windows), tip presets + custom, promos apply/remove with reason codes
- [ ] Fee/tax itemization; guest checkout optional
- [ ] Status lifecycle with timestamps and user messages
- [ ] Map tracking ≤10s updates; graceful loss-of-signal handling
- [ ] ETA p90 error ≤ 6 min in staging; delay reason display
- [ ] Cancellation/modification until “cooking”; refund/audit trail
- [ ] Substitution flow for out-of-stock with auto-refund if declined
- [ ] Masked contact + in-app chat with logging
- [ ] Address notes and delivery instructions passed to driver with PII redaction

## Reviews & Ratings
- [ ] Post-delivery prompt within 1 hour; one review per order; verified purchasers only
- [ ] Facet ratings: heat, firmness, flavor, packaging; 1–5 scale with definitions
- [ ] Photo uploads (≤3), automated moderation and manual queue
- [ ] Owner replies within 7 days; resolution tags; immutable customer text
- [ ] Abuse controls: profanity filter, rate limiting, report function
- [ ] Driver rating separate from restaurant and not publicly shown in restaurant listing

## Payments
- [ ] Stripe cards + Apple/Google Pay; 3DS when required; tokenization only
- [ ] Configurable capture timing; full/partial refunds; store credits; audit logs
- [ ] Receipts emailed + in-app; location-based tax calculation; defined rounding rules
- [ ] Small-order fees/minimums enforced with messaging
- [ ] Tip edit allowed ≤1h after delivery per policy
- [ ] Packaging surcharge: $0.75 auto-applied for delivery, waived for pickup; owner subsidy toggle

## Restaurant Management Portal
- [ ] Onboarding wizard; test order required before go-live; bank details capture
- [ ] Menu CRUD + variant matrices; CSV import; image upload validation; 86 propagation ≤1 min
- [ ] Packaging SOP checklists and per-item defaults; printed checklist; seal/label codes per order
- [ ] Order queue with ticket/label printing; handoff step requires seal code confirmation
- [ ] Analytics: sales, AOV, volume, reliability score trend, facet complaints, item performance; CSV export
- [ ] Roles & audits for critical actions
- [ ] Packaging inventory alerts with thresholds and notifications

## Delivery Logistics
- [ ] Driver pickup instructions, seal code, thermal-bag confirmation gate
- [ ] QR/scan at pickup; timestamp + staff ID; photo of sealed bag
- [ ] Integrated navigation; arrival notifications; leave-at-door support
- [ ] Proof-of-delivery photo + timestamp + location capture
- [ ] Third-party dispatch webhook mapping; retries/backoff; reconciliation jobs; idempotency
- [ ] Spill-check prompts with optional photo

## Nonfunctional
- [ ] Availability ≥ 99.9%/month; P95 API < 300ms; mobile cold start <3s
- [ ] WCAG 2.1 AA for customer + portal
- [ ] OWASP ASVS L2; TLS 1.2+; encryption at rest; secrets managed; least privilege; audit trails
- [ ] GDPR/CCPA DSRs; retention policy; DSR SLA ≤30 days
- [ ] Observability: logs, traces, metrics; SLO dashboards for ETA accuracy, delivery success, facet satisfaction; alerting on defect rate

- [ ] SLAs enforced and monitored: pickup ≤10 min from accept; ETA p90 error ≤6 min; median delivery ≤35 min




