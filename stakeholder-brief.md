# Ramen App Store — Stakeholder Brief (One-Pager)

Problem
- Delivery ramen arrives soggy/lukewarm because general apps ignore ramen-specific assembly/packaging constraints.

Why now
- Delivery normalized post-pandemic; ramen demand rising; packaging tech and third-party dispatch APIs matured.

Product promise
- Get the exact bowl you crave, delivered hot and textured right — ramen-aware packaging and logistics, by default.

Who we serve (MVP)
- Customers in SF Bay Area (English). Restaurants via web portal. Dispatch via DoorDash Drive (primary), Uber Direct (fallback).

Scope (MVP decisions locked)
- Platforms: Customer iOS + Web PWA; Restaurant Portal Web; Driver handled by third-party
- Payments: Stripe (Cards, Apple Pay, Google Pay); USD
- Quality controls: Split packaging default ON ($0.75; +3 min; waived for pickup; restaurant may subsidize)
- SLAs: Pickup ≤10 min from accept; ETA p90 error ≤6 min; median delivery ≤35 min
- Refunds: Auto-credit $5 or 20% (higher) for minor defects; full refund for spill/undelivered; >15 min late => 15% credit; abuse detection

Differentiators
- Ramen-aware defaults (split packaging, tsukemen rules, driver thermal-bag enforcement)
- Texture Reliability Score from facet reviews (heat, firmness, packaging)
- Operator tooling: pacing, 86’ing, packaging SOPs, analytics on complaints

KPIs (MVP)
- 30-day repeat rate ≥35%; NPS ≥45
- Facet satisfaction: heat ≥4.3/5; firmness ≥4.2/5
- Defect rate (spill/soggy/late) ≤3%; Refunds ≤6% GMV trending down post-month 2

Phased timeline (indicative)
- Sprint 1–2: Auth, Discovery, Menu, Cart
- Sprint 3–4: Orders/Tracking, Payments, Reviews
- Sprint 5: Portal (Menu/Orders/86), SOPs, Dispatch webhooks
- Sprint 6: Analytics, Reliability score, Refund automations; hardening & WCAG AA

Top risks & mitigations
- ETA accuracy misses (Tech): seed route models; feedback loop; alert on drift
- Restaurant SOP adherence (Ops): printed checklists; portal gating; random audits
- Dispatch outages (Ops/Tech): fallback provider; reconciliation jobs; manual playbook
- Abuse/refund gaming (Trust): velocity rules; photo evidence; pattern detection
- Packaging inventory runout (Ops): thresholds + alerts; suggested reorder quantities

Go-to-market (pilot)
- Curate 10–15 ramen partners with strong dine-in reputation; subsidize packaging for first 60 days; promo for first orders; social proof via reliability badges.

