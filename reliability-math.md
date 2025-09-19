# Reliability Score — Methodology (MVP)

Purpose
Produce a ramen-specific delivery quality score (0–5) that reflects heat-on-arrival, noodle firmness, and packaging integrity, with safeguards for low sample sizes and recency.

Definition
- Facets captured per order review: heat, firmness, packaging (1–5)
- Per-review composite score s_r = 0.4*heat + 0.4*firmness + 0.2*packaging (range 1–5)
- Time decay: weight recent reviews higher using exponential decay with half-life H=15 days
  w_time(r) = exp(-ln(2) * age_days(r) / H)
- Eligibility: include reviews in last W=30 days, status=active, verified purchases only; exclude flagged/abusive

Aggregation
- Weighted sums per restaurant:
  W = Σ w_time(r)
  S = Σ w_time(r) * s_r
  V = Σ w_time(r) * s_r^2
- Raw weighted mean: μ_raw = S / W
- Weighted variance (unbiased): σ_w^2 = (V/W) - μ_raw^2

Small-sample correction (Empirical Bayes shrinkage)
- Global mean μ_g = 4.2 (computed weekly over all active restaurants)
- Prior weight m = 50 (acts as pseudo-reviews)
- Shrunk mean: μ_shrunk = (S + m*μ_g) / (W + m)
- Use μ_shrunk as the reliability value displayed when W ≥ 10; else label as “New” and show a placeholder (e.g., “—”) with tooltip “Insufficient recent reviews”

Uncertainty band (for internal monitoring)
- Effective sample W acts as weight; approximate standard error: SE ≈ sqrt(σ_w^2 / (W + m))
- 95% band: μ_shrunk ± 1.96*SE (internal only; we display value and sample size to users)

Recency & windowing
- Window W_days = 30; half-life H=15 yields ≈75% weight from last ~21 days
- Nightly job recomputes μ_g and refreshes snapshots; on-write triggers incremental update for the affected restaurant

Edge cases & guards
- If fewer than 5 reviews in absolute count over last 30 days, always show “New” regardless of W
- Clamp facets to [1,5]; discard reviews missing any facet
- Winsorize per-review composite at [1.2, 4.9] to reduce extreme influence
- Fraud/abuse signals (velocity from single device/IP, anomalous text) exclude from scoring

Display contract
- Restaurant card: reliabilityScore.value (0–5, one decimal), sampleSize (absolute reviews in 30d), windowDays=30
- Tooltip: “Based on last 30 days of delivery reviews: heat(40%), firmness(40%), packaging(20%). Adjusted for recency and volume.”

SQL sketch (PostgreSQL)
```
WITH params AS (
  SELECT 15.0::float AS half_life_days, 30::int AS window_days, 50.0::float AS m
), eligible AS (
  SELECT r.restaurant_id,
         GREATEST(1, LEAST(5, r.heat_rating)) AS h,
         GREATEST(1, LEAST(5, r.firmness_rating)) AS f,
         GREATEST(1, LEAST(5, r.packaging_rating)) AS p,
         EXTRACT(EPOCH FROM (NOW() - r.created_at)) / 86400.0 AS age_days
  FROM review r
  WHERE r.status = 'active'
    AND r.created_at >= NOW() - (SELECT window_days FROM params) * INTERVAL '1 day'
    AND r.verified = TRUE
    AND COALESCE(r.flagged,false) = FALSE
), per_review AS (
  SELECT restaurant_id,
         EXP(-LN(2) * age_days / (SELECT half_life_days FROM params)) AS w,
         LEAST(4.9, GREATEST(1.2, 0.4*h + 0.4*f + 0.2*p)) AS s
  FROM eligible
), agg AS (
  SELECT restaurant_id,
         SUM(w) AS w_sum,
         SUM(w*s) AS ws_sum,
         SUM(w*s*s) AS wss_sum,
         COUNT(*) AS n_abs
  FROM per_review
  GROUP BY restaurant_id
)
SELECT a.restaurant_id,
       CASE WHEN a.w_sum >= 10 AND a.n_abs >= 5
            THEN (a.ws_sum + (SELECT m FROM params) * (SELECT AVG(0.4*h + 0.4*f + 0.2*p)
                                                      FROM eligible)) / (a.w_sum + (SELECT m FROM params))
            ELSE NULL END AS reliability_value,
       a.n_abs AS sample_size,
       (SELECT window_days FROM params) AS window_days
FROM agg a;
```

Pseudocode (service layer)
```
if (n_abs < 5 or w_sum < 10) display_new_placeholder()
else display(format_one_decimal(mu_shrunk), sample_size=n_abs)
```

Backfill & jobs
- Nightly: recompute μ_g, refresh all snapshots into reliability_score_snapshot
- On review write: upsert snapshot for restaurant_id using incremental update

Monitoring
- Alert if reliability drops >0.5 within 7 days while volume stable (±20%)
- Track facet distributions; spike in “soggy” flags triggers ops outreach

