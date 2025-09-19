Ramen App Store — API Surface (MVP)

Auth & Sessions
- POST /auth/signup — email, password or Apple/Google token; returns user + session
- POST /auth/login — email/password or Apple/Google token; returns session
- POST /auth/logout — revokes current session
- POST /auth/refresh — rotate tokens
- POST /auth/password/reset-request — email; sends reset link
- POST /auth/password/reset-confirm — token, newPassword; completes reset

Users & Profiles
- GET /me — returns profile, notification prefs, defaults
- PATCH /me — name, avatarUrl, dietaryTags[], notificationPrefs
- GET /me/sessions — list active sessions
- POST /me/sessions/revoke-all — revoke all sessions
- GET /me/addresses — list
- POST /me/addresses — create (label, lines, city, postalCode, country, lat, lng, instructions, isDefault)
- PATCH /me/addresses/{id} — update
- DELETE /me/addresses/{id} — delete
- GET /me/payment-methods — list tokenized methods (providerRef only)
- POST /me/payment-methods — attach Stripe PM to customer
- DELETE /me/payment-methods/{id} — detach
- GET /me/favorites — list restaurantIds
- POST /me/favorites/{restaurantId} — add
- DELETE /me/favorites/{restaurantId} — remove
- GET /me/orders — list my orders (pagination, status filter)

Discovery
- GET /restaurants — query, filters (style[], priceRange, maxDistanceKm, minRating, openNow), sort (rating|reliability|distance|prepTime)
- GET /restaurants/map — bbox or near(lat,lng), return pins + delivery eligibility
- GET /restaurants/{id} — includes hours, fees, minOrder, packaging policy, reliabilityScore
- GET /restaurants/{id}/menu — categories, items, customization schema
- GET /restaurants/{id}/reviews — pagination; facet histograms

Cart
- GET /cart — current cart for session/user
- PUT /cart — set items: [{menuItemId, quantity, customizations: {firmness, spice, oil, toppingsAdd[], toppingsRemove[], notes, splitPackagingOptOut?}}]
- DELETE /cart — clear

Orders
- POST /orders — from cart, addressId, type (delivery|pickup), tip, promoCode, scheduledAt?; idempotency-key header required
- GET /orders/{id} — details with timeline and fees
- GET /orders/{id}/track — driver location (lat,lng), ETA, status
- POST /orders/{id}/cancel — allowed until status=cooking
- POST /orders/{id}/modify — limited edits until cooking (server validates)
- POST /orders/{id}/tip — edit tip within policy window
- POST /orders/{id}/support — create issue (spill|soggy|late|other) with description/photos

Reviews
- POST /orders/{id}/review — facets {heat, firmness, flavor, packaging} 1–5, text?, photos[]
- POST /reviews/{id}/report — reason (abuse|spam|NSFW|PII)
- POST /restaurants/{id}/reviews/{reviewId}/reply — owner reply (role=owner/admin)

Payments
- POST /payments/attach-method — creates/attaches Stripe PM to customer
- POST /payments/intent — pre-auth or capture total for order (server-managed)
- POST /payments/refund — orderId, amount, reasonCode; returns refund record
- POST /webhooks/stripe — Stripe events; idempotent; signature verified

Restaurant Portal (auth: owner/admin/staff)
- GET /portal/restaurants/mine — list of managed restaurants
- GET /portal/restaurants/{id} — overview
- PATCH /portal/restaurants/{id} — settings (hours, zones, prep times, fees, packaging defaults)
- GET /portal/restaurants/{id}/orders — filter by status/time
- PATCH /portal/orders/{id}/status — accept|cooking|packed|awaiting_pickup (sealed)
- POST /portal/orders/{id}/labels — generate/print labels with seal code
- GET /portal/restaurants/{id}/menu — list
- POST /portal/restaurants/{id}/menu — bulk upsert categories/items/variants
- PATCH /portal/menu/items/{itemId} — update
- POST /portal/menu/items/{itemId}/86 — mark out-of-stock (optionally until time)
- GET /portal/analytics/{id} — KPIs (sales, AOV, reliability, complaints)
- GET /portal/packaging-inventory — levels and thresholds
- POST /portal/packaging-inventory/reconcile — update counts

Dispatch & Logistics
- POST /webhooks/dispatch — DoorDash/Uber event intake; maps to lifecycle
- GET /orders/{id}/seal — returns seal code and required checklist
- POST /orders/{id}/pickup-scan — scan/confirm chain-of-custody; photo of sealed bag
- POST /orders/{id}/pod — proof of delivery (photo, timestamp, location)

Admin/Ops
- GET /ops/issues — unresolved issues queue
- PATCH /ops/issues/{id} — resolve (action taken, credit/refund)
- GET /ops/reliability — reliability score computation snapshots
- POST /ops/recompute-reliability — triggers backfill

Security & Conventions
- All endpoints require TLS; auth via Bearer JWT/opaque session token depending on client
- Role-based authorization enforced; owner can only access own restaurants
- Idempotency-Key header required for POST /orders and payment/refund actions
- Rate limits: per-IP and per-user; 429 on excess
- Standard errors: 400, 401, 403, 404, 409, 422, 429, 500 with machine-readable codes

Status Lifecycle
- placed → accepted → cooking → packed → awaiting_pickup → picked_up → arriving → delivered → (optionally) refunded/canceled

Dispatch Mapping (examples)
- DoorDash pickup_assignment_created → awaiting_pickup
- courier_picked_up → picked_up
- courier_location_update → arriving (ETA updates)
- delivered → delivered

Reliability Score (surfaced on restaurant)
- GET /restaurants/{id} returns reliabilityScore {value 0–5, sampleSize, windowDays}
- Computed from last 30 days facet ratings: heat (40%), firmness (40%), packaging (20%); Wilson adjustment for n<50

