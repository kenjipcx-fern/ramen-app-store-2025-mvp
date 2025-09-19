# Ramen App Store — Technical Architecture (MVP)

Overview
- Client apps: Customer iOS + Web PWA; Restaurant Web Portal
- Backend: REST API + background workers; integrations with Stripe and third-party dispatch (DoorDash Drive primary, Uber Direct fallback)
- Data: PostgreSQL (+ PostGIS for zones), Redis cache, S3-compatible object storage for photos, queue for jobs/webhooks

Services (logical)
1) API Gateway
- Terminates TLS; routes to backend; rate limiting; request/response logging

2) Identity & Access
- JWT/opaque session tokens; Apple/Google SSO; RBAC (customer/owner/staff/admin)

3) Catalog & Discovery
- Restaurants, menus, availability/86; discovery queries (filters/sorts); favorites

4) Cart & Orders
- Cart state; pricing/fees; order creation; lifecycle management; promo application; idempotency

5) Payments
- Stripe customer + PMs; payment intents; capture/refunds; webhooks

6) Dispatch Integration
- Create delivery jobs; receive webhooks; status mapping; reconciliation jobs; provider routing

7) Reviews & Reliability
- Review capture; moderation; owner replies; reliability snapshot jobs; facet histograms

8) Portal Operations
- Menu/variant management; order queue; ticket/label generation; SOP checklists; analytics

9) Observability & Trust
- Metrics/traces/logs; anomaly detection (ETA drift, defect spikes); abuse/fraud signals

Data stores
- PostgreSQL 14+: core relational data; PostGIS for delivery zones; JSONB for flexible attributes
- Redis: short-lived caches (menus, zones), rate-limit counters, session data (optional)
- Object storage (S3): photos (menu, reviews), labels, delivery proof
- Message/Job queue: e.g., Redis-backed (BullMQ) or SQS; used for webhook processing, emails, reliability recompute

Key patterns
- Idempotency: POST /orders, payment/refund actions require Idempotency-Key
- Event-driven updates: dispatch webhooks processed async with retries/backoff
- Consistency: order status transitions enforced via state machine; audit logs for critical ops
- Security: input validation; output encoding; secret rotation; least privilege DB roles

External integrations
- Stripe: tokens, intents, webhooks (signature verification), partial/full refunds
- DoorDash Drive/Uber Direct: create jobs, status webhooks; sandbox + prod keys; provider fallback strategy

Performance & scaling
- Read-heavy discovery endpoints cached (Redis) with cache busting on 86 and menu changes
- N+1 avoidance via batching; pagination on lists
- Background jobs for heavy tasks (thumbnailing, reliability, report exports)

Deployment & environments
- Envs: dev, staging, prod; CI/CD with migrations; feature flags for fees/capture timing
- Blue/green or rolling deploy; migration safety (backwards compatible)

Security & compliance
- OWASP ASVS L2; TLS 1.2+; encryption at rest; CSP and secure headers; dependency scanning
- PCI scope minimized (Stripe tokens only); PII minimization; audit logging

SLOs
- Availability ≥99.9%/month; P95 API <300ms; ETA p90 error ≤6 minutes; mobile cold start <3s

Fallbacks & resilience
- Dispatch provider fallback; circuit breakers; exponential backoff; dead-letter queue for failed webhooks

Sequence (Order placement)
1. Client PUT /cart; server prices items and fees
2. Client POST /orders (Idempotency-Key); server validates address/zone, inventory, 86; creates order=placed
3. Server confirms payment intent (pre-auth or capture) per policy
4. Server dispatches to DoorDash (fallback to Uber on error); sets status=accepted/cooking per portal
5. Webhooks update statuses; client tracks via /orders/{id}/track; ETA model updates
6. On delivery, proof captured; review prompt scheduled; refunds/credits handled as needed

