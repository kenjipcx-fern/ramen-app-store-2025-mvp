# Telemetry Events — Ramen App Store (MVP)

Event conventions
- event: snake_case; include user_id, session_id (if available), restaurant_id/order_id when relevant
- context: app_version, platform, locale, experiment/variant, geo (city), network_type
- pii: never include PAN, phone, email, names in event properties

Key events

Auth & Profile
- auth_signup_started { provider }
- auth_signup_succeeded { provider }
- auth_signup_failed { provider, error_code }
- auth_login_succeeded { provider }
- profile_updated { fields_changed[] }
- address_added { serviceable: bool }

Discovery
- discovery_impression { restaurant_ids[], count }
- discovery_filter_changed { filters }
- discovery_sort_changed { sort }
- restaurant_card_viewed { restaurant_id, position, reliability_value }
- restaurant_opened { restaurant_id }
- map_view_toggled { enabled: bool }

Menu & Customization
- menu_item_viewed { restaurant_id, menu_item_id }
- customization_changed { menu_item_id, firmness, spice, oil, toppings_add_count, toppings_remove_count, split_packaging }
- allergen_conflict_shown { allergens[] }
- cross_sell_impression { item_ids[] }

Cart & Checkout
- cart_item_added { menu_item_id, qty, price_cents, split_packaging }
- cart_viewed { item_count, subtotal_cents }
- checkout_started { type, scheduled: bool }
- promo_applied { promo_code, success: bool, reason? }
- tip_changed { tip_cents }
- order_submitted { order_id, idempotency_key }

Orders & Tracking
- order_created { order_id, restaurant_id, type, total_cents }
- order_status_changed { order_id, from, to }
- eta_updated { order_id, eta_seconds, error_seconds }
- contact_driver_clicked { order_id, channel }
- cancel_requested { order_id, allowed: bool, reason }

Payments
- payment_intent_created { order_id, amount_cents, capture_mode }
- payment_capture_succeeded { order_id, amount_cents }
- payment_failed { order_id, error_code }
- refund_issued { order_id, amount_cents, reason_code }

Reviews & Reliability
- review_prompt_shown { order_id }
- review_submitted { restaurant_id, order_id, heat, firmness, flavor, packaging }
- review_reported { review_id, reason }

Portal
- portal_login_succeeded { restaurant_id }
- order_status_updated_by_portal { order_id, to, actor_role }
- item_86_set { item_id, until }
- packaging_sop_printed { order_id }

Dispatch
- dispatch_job_created { order_id, provider }
- dispatch_webhook_received { provider, event_type }
- dispatch_reconciliation_run { window_minutes, corrected_count }

Diagnostics
- api_error { route, status, code }
- app_crash { screen, stack_hash }

KPIs derived from telemetry
- 30d repeat rate, NPS
- ETA p90 error, defect rate (spill/soggy/late), refund % of GMV
- Reliability value and volume per restaurant

