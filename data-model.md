# Ramen App Store — Data Model (MVP)

This document outlines the core entities, relationships, and key constraints for the MVP.

## Entities

User
- id (UUID, PK)
- email (unique, nullable for SSO)
- auth_provider (email|apple|google)
- password_hash (nullable)
- name
- avatar_url
- dietary_tags (string[])
- phone (optional, E.164)
- created_at, updated_at, deleted_at (soft delete)

Session
- id (UUID, PK)
- user_id (FK User)
- created_at, expires_at
- user_agent, ip
- revoked_at

Address
- id (UUID, PK)
- user_id (FK User)
- label (e.g., Home)
- line1, line2, city, region, postal_code, country
- lat, lng (nullable until geocoded)
- instructions (text)
- is_default (bool)
- serviceable (bool cached)
- created_at, updated_at

PaymentMethod
- id (UUID, PK)
- user_id (FK User)
- provider (stripe)
- stripe_customer_id
- stripe_payment_method_id
- brand, last4, exp_month, exp_year
- is_default (bool)
- created_at, updated_at

Restaurant
- id (UUID, PK)
- owner_user_id (FK User)
- name, legal_name
- description
- logo_url, hero_photos (string[])
- cuisines (e.g., ["ramen"]) / styles (tonkotsu/shoyu/miso/shio/tsukemen/vegan)
- price_tier (1–4)
- timezone
- status (draft|active|paused)
- created_at, updated_at

RestaurantSettings
- restaurant_id (PK/FK Restaurant)
- hours (json)
- delivery_zones (GeoJSON MultiPolygon)
- min_order_cents, delivery_fee_cents, service_fee_cents
- packaging_surcharge_delivery_cents (default 75)
- packaging_surcharge_pickup_cents (default 0)
- packaging_subsidized_by_restaurant (bool)
- default_split_packaging (bool)
- avg_prep_time_min
- max_parallel_orders (pacing)
- created_at, updated_at

MenuCategory
- id (UUID, PK)
- restaurant_id (FK Restaurant)
- name
- sort_order

MenuItem
- id (UUID, PK)
- restaurant_id (FK Restaurant)
- category_id (FK MenuCategory)
- name, description
- photo_url
- base_price_cents
- calories (nullable)
- allergens (string[])
- dietary_tags (string[])
- is_tsukemen (bool)
- is_active (bool)
- created_at, updated_at

OptionGroup
- id (UUID, PK)
- menu_item_id (FK MenuItem)
- code (e.g., "firmness", "spice", "oil", "toppings")
- name
- type (single|multi)
- required (bool)
- min_selections, max_selections
- display_order

Option
- id (UUID, PK)
- option_group_id (FK OptionGroup)
- code (e.g., "soft", "regular", "firm", "spice_3")
- name
- price_delta_cents (can be negative)
- inventory_count (nullable)
- display_order

OutOfStock
- id (UUID, PK)
- restaurant_id
- entity_type (item|option)
- entity_id (FK MenuItem or Option)
- until (timestamp, nullable)
- created_at

Cart
- id (UUID, PK)
- user_id (FK User, nullable for guest)
- session_id (FK Session)
- created_at, updated_at

CartItem
- id (UUID, PK)
- cart_id (FK Cart)
- menu_item_id (FK MenuItem)
- name_snapshot, price_snapshot_cents
- quantity
- customizations (json: {firmness, spice, oil, toppingsAdd[], toppingsRemove[]})
- split_packaging (bool)
- notes (varchar(200))

Order
- id (UUID, PK)
- user_id (FK User)
- restaurant_id (FK Restaurant)
- type (delivery|pickup)
- address_id (FK Address, nullable for pickup)
- scheduled_at (nullable)
- status (placed|accepted|cooking|packed|awaiting_pickup|picked_up|arriving|delivered|canceled|refunded)
- subtotal_cents
- tax_cents
- delivery_fee_cents
- service_fee_cents
- packaging_surcharge_cents
- tip_cents
- total_cents
- currency (USD)
- promo_code (nullable)
- dispatch_provider (doordash|uber|null)
- dispatch_job_id (nullable)
- eta_initial (timestamp, nullable)
- created_at, updated_at
- placed_at, accepted_at, cooking_at, packed_at, awaiting_pickup_at, picked_up_at, arriving_at, delivered_at, canceled_at

OrderItem
- id (UUID, PK)
- order_id (FK Order)
- menu_item_id (FK MenuItem)
- name_snapshot
- price_snapshot_cents
- quantity
- customizations (json)
- split_packaging (bool)
- notes

Payment
- id (UUID, PK)
- order_id (FK Order)
- provider (stripe)
- stripe_payment_intent_id
- amount_cents
- status (requires_action|requires_capture|succeeded|canceled|refunded)
- captured_at, canceled_at, refunded_at

Refund
- id (UUID, PK)
- order_id (FK Order)
- payment_id (FK Payment)
- amount_cents
- reason_code (SPILL|SOGGY|LATE|UNDLV|OTHER)
- created_by (user id or system)
- created_at

Review
- id (UUID, PK)
- order_id (FK Order, unique)
- restaurant_id (FK Restaurant)
- user_id (FK User)
- heat_rating (1–5)
- firmness_rating (1–5)
- flavor_rating (1–5)
- packaging_rating (1–5)
- text (nullable)
- photo_urls (string[])
- owner_reply (text, nullable)
- replied_at (timestamp, nullable)
- status (active|hidden)
- created_at

ReliabilityScoreSnapshot
- restaurant_id (FK Restaurant)
- window_start, window_end
- sample_size
- heat_avg, firmness_avg, packaging_avg
- value_computed (0–5)
- wilson_low, wilson_high
- computed_at
- PK: (restaurant_id, window_end)

Issue
- id (UUID, PK)
- order_id (FK Order)
- type (SPILL|SOGGY|LATE|OTHER)
- description
- status (open|resolved)
- credit_amount_cents
- refund_amount_cents
- created_at, resolved_at, resolved_by

Favourite
- user_id (FK User)
- restaurant_id (FK Restaurant)
- created_at
- PK: (user_id, restaurant_id)

Promo
- id (UUID, PK)
- code (unique)
- percentage (nullable), fixed_amount_cents (nullable)
- min_order_cents (nullable)
- start_at, end_at
- max_redemptions_per_user (nullable)
- active (bool)

WebhookEvent
- id (UUID, PK)
- source (stripe|dispatch)
- event_type
- payload_json (text)
- received_at, processed_at
- status (processed|error)
- error_message (nullable)

DispatchEvent
- id (UUID, PK)
- order_id (FK Order)
- provider (doordash|uber)
- event_type
- data_json (text)
- received_at

DeliveryProof
- order_id (FK Order, PK)
- photo_url
- timestamp
- lat, lng
- signature_json (nullable)

Seal
- order_id (FK Order, PK)
- seal_code (string)
- generated_at
- verified_at (nullable)
- verified_by_staff_id (FK User, nullable)

AuditLog
- id (UUID, PK)
- actor_user_id (FK User)
- actor_role (customer|owner|staff|admin|system)
- action
- entity_type, entity_id
- metadata_json (text)
- ip, user_agent
- created_at

PackagingInventory
- id (UUID, PK)
- restaurant_id (FK Restaurant)
- item_code (BROTH_CONTAINER|NOODLE_BOX|LABELS|THERMAL_BAG)
- current_qty
- threshold_qty
- updated_at

## Relationships Summary
- User 1—* Address, PaymentMethod, Favourite, Order, Review
- Restaurant 1—* MenuCategory, MenuItem, Order, Review, ReliabilityScoreSnapshot
- MenuItem 1—* OptionGroup 1—* Option
- Order 1—* OrderItem, Payment 1—* Refund
- Order 1—1 DeliveryProof, 1—1 Seal

## Key Indexes
- idx_restaurants_geo (using PostGIS on delivery_zones centroids or separate geospatial index)
- idx_restaurants_rating_reliability (for sorting)
- idx_menu_item_restaurant_id
- idx_orders_user_id_status_created_at
- idx_orders_restaurant_id_status_created_at
- idx_reviews_restaurant_id_created_at
- idx_dispatch_events_order_id_received_at

## State Machines
Order.status allowed transitions
- placed → accepted → cooking → packed → awaiting_pickup → picked_up → arriving → delivered
- Any → canceled (if allowed)
- delivered → refunded (optional)

## Constraints & Guards
- One review per order (unique on Review.order_id)
- Address must be serviceable to place delivery order
- OptionGroup min/max enforced on server; invalid combos rejected (422)
- Split packaging surcharge auto-applied for delivery, waived for pickup (config allows restaurant subsidy)
- Refund rules automated per policy with override by ops/admin


