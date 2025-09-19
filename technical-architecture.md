# Technical Architecture — Ramen App Store (MVP)

Objectives
- Ship fast with reliable, ramen-aware logistics; keep PCI scope minimal; enable analytics and SLA enforcement from day one.

Core components
- Client apps: iOS (Swift), Android (Kotlin), Web (React/PWA); Driver Android first; Owner Web portal (React)
- API Gateway: REST (JSON) + WebSocket for real-time; GraphQL optional later for aggregation
- Services (modular monolith or small services):
  - Auth Service: OAuth/OIDC, OTP, social login (Apple/Google), session & 2FA
  - User Profile Service: preferences, addresses, payment methods (tokens only)
  - Restaurant Service: menus, option groups/constraints, inventory, hours, promos
  - Search Service: discovery, facets, ranking (backed by Algolia or OpenSearch)
  - Order Service: cart, checkout, order state machine, idempotency, refunds
  - Delivery Integration Service: partner courier APIs (DoorDash Drive/Uber Direct)
  - Driver Service: offers, pickup verification (packaging/hot-bag), proof of delivery
  - Review Service: ramen facet reviews, moderation
  - Payment Service: Stripe charges, payouts, refunds, disputes
  - Notification Service: push (OneSignal/Firebase APNs/FCM), SMS (Twilio), email
  - Observability: metrics, tracing, logs; SLA monitors

Data & infra
- Primary DB: Postgres (RDS/Cloud SQL). Strong consistency, relational integrity.
- Caching/queues: Redis (caching, rate limits, session tokens), Redis Streams/SQS for events.
- Object storage: S3/GCS for media (photos, docs) with signed URLs.
- Search: Algolia (hosted) for speed-to-market; OpenSearch as alternative.
- Geospatial: PostGIS for geo queries; Mapbox/Google Maps SDK for client.
- Real-time: WebSocket (Socket.IO or native WS) + push/SMS fallback; Pub/Sub for fanout.
- Analytics: Segment (events) -> warehouse (BigQuery/Snowflake) and dashboard (Metabase/Looker Studio).
- CI/CD: GitHub Actions; infra-as-code (Terraform) for reproducibility.

Integration choices (MVP)
- Payments: Stripe (Checkout elements or Payment Element for SAQ-A), Connect for restaurant payouts, test mode then live.
- Courier: DoorDash Drive (first), Uber Direct (second) behind abstraction.
- SMS: Twilio. Push: FCM/APNs via OneSignal or Firebase.
- Geocoding: Mapbox or Google.

Security & compliance
- PCI: SAQ-A by using Stripe-hosted fields/components; never store PAN/CVV.
- PII: AES-256 at rest, TLS 1.2+ in transit; field-level encryption for sensitive docs; strict RBAC; audit logs.
- AuthZ: role-based (customer/owner/driver/ops); least privilege; scoped API keys.
- Secrets: KMS-managed; no secrets in code; short-lived tokens.
- Abuse/risk: rate limiting, IP/device fingerprinting, velocity checks, CAPTCHA on risk.

Reliability & SLOs
- SLOs: search p95 <500ms; checkout p95 <2s; state propagation E2E <2s; uptime 99.9%.
- Patterns: idempotency keys on write APIs; retries with backoff; circuit breakers for 3rd parties; DLQs for events.

Data model notes
- Orders append-only events (OrderEvent) for auditability.
- Option constraints normalized to allow validation; inventory gating per ingredient.
- DeliveryAssignment holds courier state/ids and proof artifacts.

Scalability
- Start as modular monolith with clear boundaries; extract services that have high change rate (Orders, Delivery) if needed.
- Read replicas for Postgres; CDN for images; cache hot reads (menu, shop pages).

Privacy & retention
- Retain personal data minimally; configurable retention policies (e.g., driver doc images limited duration).
- Data subject requests supported (export/delete); logging avoids PII.

Operational playbooks
- Incident runbooks for: payment outage, courier outage, push/SMS failures, search degradation.
- Feature flags for packaging policy and grace windows.

