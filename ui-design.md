# Ramen App Store — UI/UX Design (MVP)

Scope
- Customer iOS + Web PWA
- Restaurant Web Portal

Design principles
- Ramen-first: highlight reliability and customization
- Frictionless: minimal taps to reorder, clear tradeoffs for split packaging
- Accessible: WCAG 2.1 AA; large touch targets; voiceover order flow tested

Customer app — Navigation
- Tabs: Home (Discover), Search, Orders, Favorites, Profile
- Floating CTA: Cart (badge count)

Key screens & states
1) Onboarding
- Sign in/up: Email/Apple/Google; password strength meter; email verification notice
- Location permission: precise vs approximate; default address setup

2) Home (Discover)
- Hero: "Get your ramen delivered hot and textured right"
- Carousels: Top near you, High reliability, Vegan/Spicy/Tsukemen
- Delivery fee/time indicators; badges: Reliability 4.6, Split packaging default
- Empty state: Set address to see nearby ramen

3) Restaurant list/map
- Filters pill bar: Style, Price, Distance, Rating, Open Now
- Sort dropdown: Rating, Reliability, Distance, Prep time
- Map toggle: Pins + delivery zone shading; eligibility label
- Item card: Photo, name, rating, reliability score, ETA, fee

4) Restaurant detail
- Header: photos (carousel), name, rating, reliability (tooltip)
- Info: hours, fees, min order, packaging policy (split default ON)
- Sections: Signature bowls, Build your bowl, Sides & Drinks
- Reviews summary with facet histograms (heat, firmness, packaging)

5) Menu item (bowl configurator)
- Photo + description + allergens/dietary tags
- Options: Firmness (soft/regular/firm), Spice (0–5), Oil (none/light/regular)
- Toppings: add/remove with price deltas
- Split packaging: pre-selected switch with $0.75 and +3 min badge; info tooltip; opt-out allowed
- Notes (≤200 chars) with guidance
- Cross-sell: show complementary sides/drinks
- Add to Cart: disabled until required options chosen

6) Cart
- Items with customization chips; edit/remove; split packaging fee line
- Fees breakdown (food, tax, delivery, service, packaging, tip)
- Delivery vs Pickup; ASAP vs Schedule (15-min windows)
- Address selector; instructions; tipping presets
- Promo code apply/remove with error reasons

7) Checkout confirmation
- Summary; ETA; refund policy snippet (quality + late credits)
- Place Order CTA (idempotent)
- Error cases: invalid address/zone; out-of-stock; payment failure

8) Order tracking
- Timeline: placed→accepted→cooking→packed→awaiting pickup→picked up→arriving→delivered
- Live map: driver icon; ETA; delay reason banner if behind
- Contact: masked call/message; support chat link
- Cancel/Modify: enabled until "cooking"

9) Post-delivery review
- Facet ratings: heat, firmness, flavor, packaging; 1–5 with labels
- Add photos (≤3); issue flags (spill, soggy, late)
- Thank-you + loyalty teaser (post-MVP)

10) Profile
- Edit profile, dietary tags, notifications (push/SMS/email)
- Addresses; payment methods
- Favorites list
- Settings: export data, delete account, sign out all devices

Accessibility & UX notes
- Focus order and labels for all controls; field errors announced via ARIA
- Color contrast ≥ 4.5:1; larger text mode supported
- Haptic feedback on critical actions (add to cart, place order)
- Large touch targets (≥44px); skeleton loaders for perceived speed

Restaurant Portal — Navigation
- Sidebar: Dashboard, Orders, Menu, Availability/86, Packaging SOP, Analytics, Settings, Staff

Key screens
1) Dashboard
- KPIs: Sales, AOV, Orders, Reliability score trend, Top complaints
- Alerts: Packaging inventory low, Late orders, Dispatch reconciliation

2) Orders queue
- Columns: New, Cooking, Packed, Awaiting Pickup
- Ticket/label print buttons; handoff step requires seal code entry
- Pause/Throttle controls; per-order ETA adjustments

3) Menu & Variants
- Category list; item CRUD; variant matrix editor (size/broth/noodle)
- Toppings inventory; 86 at item/option; CSV import

4) Packaging SOP
- Default split packaging toggles and surcharge/time setup
- Printable checklist with broth temp, noodle drain, toppings sealed

5) Analytics
- Charts: Sales, AOV, Volume; Reliability score and facets distribution
- Reviews browser with owner reply

6) Settings & Staff
- Hours, zones (map editor), prep times, fees, banking
- Staff roles and invites; audit log viewer

Empty/error states
- No orders: "You're live! Orders will appear here"
- Out-of-stock: prompt to 86 with optional "until time"
- Dispatch outage: banner with manual fallback instructions

Component library (atoms/molecules)
- Buttons: Primary/Secondary/Ghost; Danger
- Pills: Filters, Tags, Badges (Reliability, Split)
- Cards: Restaurant, Menu item, Order
- Form elements: Dropdowns, Segmented controls, Switches, Numeric steppers
- Feedback: Toasts, Banners (info/warn/error), Skeletons, Loaders


