# Sprint Exit Criteria — MVP (Ramen App Store)

Sprint 1 — Foundations
- [ ] Auth: email, phone OTP, Apple, Google flows tested incl. invalid OTP, rate limits
- [ ] RBAC: role isolation verified; session expiry; 2FA opt-in
- [ ] Geocoding/address validation; timezone correctness
- [ ] Observability: error tracking, logs include correlation ids; p95 latency baselines

Sprint 2 — Discovery
- [ ] Map + list show same results; filters correct; empty states
- [ ] “Open now” respects hours/timezone; scheduled orders preview
- [ ] Search: typo tolerance, synonyms, ranking by availability/quality; p95 search <500ms

Sprint 3 — Menu & Checkout
- [ ] Options/constraints enforced; guard rails block invalid combos
- [ ] Allergy flags and packaging suggestions visible; price updates correct
- [ ] Stripe: Apple/Google Pay + card; 3DS flows; idempotency; promo errors clear

Sprint 4 — Orders & Tracking
- [ ] Order state machine e2e incl. change/cancel grace logic; refund audit trail
- [ ] Real-time updates delivered; event-to-user latency ≤2s p95
- [ ] ETA p90 error ≤ ±6 min (pilot geo test data)

Sprint 5 — Driver + Portal
- [ ] Driver: accept/decline, nav, pickup verification (separation + hot-bag), proof (photo/OTP)
- [ ] Portal: menu CRUD, inventory gating, KDS/queue, throttle, packaging notes
- [ ] Ops: refund tool, reassignment tool, SLA alerting

Sprint 6 — Reviews & Hardening
- [ ] Ramen facet reviews, moderation, owner replies
- [ ] Accessibility pass WCAG 2.1 AA; localization scaffolding
- [ ] Load/security tests; rollback plan; pilot checklist completed

