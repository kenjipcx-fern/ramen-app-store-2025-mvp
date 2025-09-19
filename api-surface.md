# API Surface (MVP high-level)

Auth
- POST /auth/signup (email|phone|social)
- POST /auth/login (email|phone|social)
- POST /auth/otp/verify
- POST /auth/logout

Profiles
- GET/PUT /me (dietary, allergies, ramen_prefs, notifications)
- GET/POST/DELETE /me/addresses
- GET/POST/DELETE /me/payments (tokenized)

Restaurants & Search
- GET /restaurants?lat=&lng=&filters=...
- GET /restaurants/:id
- GET /restaurants/:id/menu
- POST /restaurants (owner)
- PUT /restaurants/:id (owner)

Menu & Customization
- POST /restaurants/:id/menu/items (owner)
- PUT /menu/items/:id (owner)
- PUT /menu/items/:id/inventory (owner)

Cart & Checkout
- POST /cart
- PUT /cart/items
- POST /checkout (idempotency-key)
- POST /promos/validate

Orders
- GET /orders/:id
- POST /orders/:id/cancel
- POST /orders/:id/change
- WS /orders/:id/stream (realtime state & ETA)

Driver
- POST /driver/register
- GET /driver/offers
- POST /driver/offers/:id/accept
- POST /driver/offers/:id/decline
- POST /driver/orders/:id/pickup-verify
- POST /driver/orders/:id/deliver (photo|otp)

Reviews
- POST /orders/:id/review
- GET /restaurants/:id/reviews

Payments & Payouts
- POST /payments (Stripe intent)
- POST /payouts (owner)
- POST /refunds (ops)

Ops/Admin
- POST /ops/orders/:id/reassign
- GET /ops/disputes
- GET /ops/sla/alerts

Notes
- All write endpoints require idempotency-key.
- RBAC enforced; audit headers required on admin/ops endpoints.

