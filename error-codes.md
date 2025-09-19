# Error Codes — Ramen App Store (MVP)

Conventions
- Format: E<DOMAIN>-<ERROR>
- HTTP mapping: use 4xx for client errors, 5xx for server
- Response shape: { code, message, details? }

Auth (HTTP 400/401/403)
- EAUTH-INVALID_CREDENTIALS — 401 — Email/password invalid — Remediate: retry/login reset
- EAUTH-UNVERIFIED_EMAIL — 403 — Email not verified — Remediate: verify email
- EAUTH-RATE_LIMITED — 429 — Too many attempts — Remediate: wait and retry
- EAUTH-PROVIDER_TOKEN_INVALID — 401 — Invalid Apple/Google token — Remediate: re-auth via provider

Users & Profiles (HTTP 400/404)
- EUSER-NOT_FOUND — 404 — User not found
- EUSER-INVALID_FIELD — 400 — Invalid profile field value

Addresses (HTTP 400/404/422)
- EADDR-NOT_FOUND — 404 — Address not found
- EADDR-NOT_SERVICEABLE — 422 — Address outside delivery zone — Remediate: pick another address or switch to pickup
- EADDR-GEOCODE_FAILED — 502 — Upstream geocoding failed — Remediate: retry

Payments (HTTP 402/409)
- EPAYMENT-REQUIRES_ACTION — 402 — 3DS required — Remediate: complete authentication
- EPAYMENT-DECLINED — 402 — Payment declined — Remediate: use another method
- EPAYMENT-CONFLICT — 409 — Duplicate payment/idempotency conflict — Remediate: change Idempotency-Key
- EPAYMENT-REFUND_FAILED — 502 — Provider error on refund — Remediate: retry or manual ops

Orders (HTTP 400/404/409/422)
- EORDER-NOT_FOUND — 404 — Order not found
- EORDER-INVALID_STATE — 409 — Action not allowed in current state (e.g., cancel after cooking)
- EORDER-OUT_OF_STOCK — 409 — One or more items unavailable — Remediate: substitute or remove
- EORDER-INVALID_ADDRESS — 422 — Delivery not available to selected address
- EORDER-IDEMPOTENCY_CONFLICT — 409 — Duplicate create detected for header key

Cart (HTTP 400/409/422)
- ECART-INVALID_ITEM — 400 — Menu item invalid/inactive
- ECART-INVALID_OPTIONS — 422 — Option combo fails validation (min/max)
- ECART-PRICE_MISMATCH — 409 — Client vs server pricing mismatch — Remediate: refresh cart

Discovery (HTTP 400)
- EDISCOVERY-BAD_QUERY — 400 — Unsupported filter/sort parameter

Dispatch (HTTP 502/504)
- EDSP-UNAVAILABLE — 502 — Dispatch provider unavailable — Remediate: fallback provider or manual flow
- EDSP-INVALID_WEBHOOK — 400 — Signature invalid or malformed payload

Reviews (HTTP 400/403/404)
- EREVIEW-NOT_ELIGIBLE — 403 — Only verified purchasers can review
- EREVIEW-ALREADY_EXISTS — 409 — One review per order enforced
- EREVIEW-PHOTO_INVALID — 400 — Photo upload invalid (type/size)

Portal (HTTP 400/403/404)
- EPORTAL-FORBIDDEN — 403 — Role lacks permission for action
- EPORTAL-MENU_INVALID — 400 — Menu or variant payload invalid

Promos (HTTP 400/409)
- EPROMO-INVALID — 400 — Promo invalid or expired
- EPROMO-NOT_ELIGIBLE — 400 — Order not eligible (min not met, user exceeded redemptions)
- EPROMO-CONFLICT — 409 — Promo conflicts with another applied discount

General
- ESYS-RATE_LIMITED — 429 — Too many requests
- ESYS-VALIDATION — 422 — Request validation failed
- ESYS-INTERNAL — 500 — Internal server error

