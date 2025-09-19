# QA Test Cases — MVP (Ramen App Store)

Legend: P = Priority (P0 must-pass for launch; P1 important; P2 nice-to-have)
Format: ID, Title, Steps, Expected, Notes

A. Authentication & Profiles
- A-001 (P0) Email signup/login happy path
  Steps: Signup with valid email -> verify -> login
  Expected: Account created, session active, 2FA opt-in visible
- A-002 (P0) Phone OTP with rate limiting
  Steps: Request OTP repeatedly 6x
  Expected: Throttled with clear error; cooldown timer shown
- A-003 (P0) Social auth Apple/Google
  Steps: Sign in via Apple; logout; re-login
  Expected: Token exchange succeeds; session revokes on logout
- A-004 (P0) Allergies & ramen prefs applied
  Steps: Set peanut allergy + spicy=low; open item with peanut topping
  Expected: Allergy warning banner; default spice=low applied

B. Discovery & Search
- B-001 (P0) Map/list parity with filters
  Steps: Apply filters (open now, ETA ≤30, tonkotsu)
  Expected: Same results in map and list; empty state when none
- B-002 (P1) Typo-tolerance & synonyms
  Steps: Search "tonkotsu" misspelled
  Expected: Corrected results; latency <500ms p95

C. Menu & Customization
- C-001 (P0) Option constraints & price rules
  Steps: Choose noodle type (1 of N), toppings (max 3)
  Expected: Prevent >3 toppings; price updates accurately
- C-002 (P0) Guard rails for invalid combos
  Steps: Select "no broth" on soup-only item
  Expected: Prevent selection with rationale
- C-003 (P1) Packaging suggestion toggle
  Steps: Toggle "separate broth/noodles"
  Expected: Fee +$0.75 and +3 min displayed; totals update

D. Checkout & Payments
- D-001 (P0) Apple/Google Pay payment
  Steps: Checkout with Apple Pay
  Expected: Success; 3DS when required; idempotent on retry
- D-002 (P0) Card decline & retry
  Steps: Force decline -> retry with valid card
  Expected: Clear error; subsequent success; no duplicate charge
- D-003 (P1) Promo validation
  Steps: Apply invalid/expired promo
  Expected: Error with reason; totals unchanged

E. Orders & Tracking
- E-001 (P0) Order lifecycle & notifications
  Steps: Place order -> progress through states
  Expected: Status updates with ≤2s latency; ETA updates visible
- E-002 (P0) Change/cancel within grace window
  Steps: Cancel before window expires
  Expected: Full refund; audit trail entry; notifications sent
- E-003 (P1) Post-window cancel
  Steps: Cancel after window
  Expected: Shop approval required; partial refund per policy

F. Driver
- F-001 (P0) Offer accept/decline timing
  Steps: Receive offer -> accept within response time
  Expected: Assigned; lateness penalties simulate based on pickup time
- F-002 (P0) Pickup verification (separation + hot-bag)
  Steps: Attempt pickup without confirmations
  Expected: Blocked; require confirmations to proceed
- F-003 (P1) Proof of delivery
  Steps: Complete via OTP and via photo
  Expected: Either method records proof; customer sees receipt

G. Reviews
- G-001 (P0) Facet review submission
  Steps: Submit broth/noodle/spice/packaging/overall
  Expected: Stored; spam guard passes
- G-002 (P1) Owner reply & moderation
  Steps: Owner replies; flag abusive review
  Expected: Reply visible; review enters moderation queue

H. Restaurant Portal
- H-001 (P0) KDS queue & throttle
  Steps: Mark orders ready; enable throttle
  Expected: State updates; throttle blocks new orders
- H-002 (P1) Inventory gating
  Steps: Mark ingredient OOS
  Expected: Dependent options auto-hide

Non-Functional & SLAs
- N-001 (P0) Search latency p95 <500ms
- N-002 (P0) Checkout latency p95 <2s
- N-003 (P0) Notification E2E latency ≤2s p95
- N-004 (P0) ETA error p90 ≤ ±6 min in pilot geo
- N-005 (P0) Uptime 99.9% during pilot window

