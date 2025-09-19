# Launch Checklist — Ramen App Store (MVP)

Phase 0 — Planning
- [ ] Define pilot scope (10–15 restaurants, 2–3 sub-areas of SF Bay Area)
- [ ] Confirm dispatch contracts (DoorDash Drive primary, Uber Direct fallback)
- [ ] Finalize refund policy and TOS/Privacy drafts
- [ ] Select payment capture mode (accept vs delivery) for MVP

Phase 1 — Technical readiness
- [ ] All Contract of Done v1.0 items pass QA (see contract-of-done.md)
- [ ] OpenAPI: linted/validated; mock server passes smoke tests
- [ ] Observability: dashboards for ETA, delivery success, facet satisfaction live
- [ ] Alerts configured: ETA drift, dispatch failures, DLQ growth, refund spikes
- [ ] Security: ASVS L2 checklist completed; secrets rotated; CSP in place

Phase 2 — Restaurant onboarding
- [ ] Portal accounts created; roles assigned; test order completed for each restaurant
- [ ] Menu/variants uploaded; photos approved; allergen/dietary tags set
- [ ] Packaging SOP printed and posted; seal/label printer verified
- [ ] Packaging inventory thresholds set; initial stock delivered
- [ ] Staff training completed (FOH pickup flow; seal code/QR)

Phase 3 — Dispatch & logistics
- [ ] Provider sandbox → prod switch validated; webhook signatures verified
- [ ] Pickup scan (QR/SEAL CODE) tested; photos stored and retrievable
- [ ] Proof-of-delivery flow tested; location recorded
- [ ] Thermal bag enforcement messaging validated at pickup

Phase 4 — Payments & refunds
- [ ] Stripe live keys; Apple/Google Pay enabled
- [ ] Refund automation rules deployed (minor defect credit; spill/undelivered full refund; late credit)
- [ ] Finance dashboard configured (refunds as % GMV, reasons)

Phase 5 — Policy & compliance
- [ ] Privacy policy and Terms of Service published
- [ ] Data subject request flow validated (export/delete)
- [ ] Accessibility audit (WCAG AA) remediations complete

Phase 6 — Go-to-market
- [ ] Stakeholder brief circulated; social assets prepared (reliability badge, promo)
- [ ] First-order promo configured; packaging subsidy toggle for 60 days (selected partners)
- [ ] Support scripts and macros loaded in helpdesk

Phase 7 — Soft launch (friends & family)
- [ ] 50–100 orders; track ETA p90, facet satisfaction, defect rate
- [ ] Fixes for top 3 issues; re-run QA on impacted areas

Phase 8 — Public pilot
- [ ] Announce; monitor SLOs daily; weekly reliability review with partners
- [ ] Post-mortem template ready for incidents

