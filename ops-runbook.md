# Ops Runbook — Ramen App Store (MVP)

Purpose
Standardize incident response for delivery quality, dispatch, payments, and portal operations.

On-call rotation
- Primary: Ops Engineer
- Secondary: Support Lead
- Escalation: Head of Ops, CTO (security/payment incidents)

Severities
- Sev-1: Full outage, orders cannot be created or paid, PII/security incident
- Sev-2: Orders created but tracking/dispatch failing; severe ETA drift; mass refund trigger
- Sev-3: Degraded non-critical feature (reviews, analytics); single-restaurant outage

Comms templates
- Status page updates: initial within 15 min, hourly until resolved
- Customer banner: only for Sev-1/2 affecting ordering/ETA
- Restaurant email: targeted when specific partners impacted

Runbooks
1) Dispatch provider outage (DoorDash)
- Detect: 5xx spike from provider API; webhooks silent >10 min
- Action:
  1. Flip feature flag to route new jobs to Uber Direct
  2. Pause auto-cancel timers; extend ETAs +10 min; show delay banner
  3. Trigger reconciliation job for stuck orders (awaiting_pickup/picked_up without updates)
  4. Inform impacted restaurants via portal banner
- Recovery: Resume primary; run reconciliation for overlap window; close incident post-monitor green

2) ETA drift > p90 target (≥6 min) for 30 min window
- Detect: SLO dashboard alert
- Action:
  1. Identify top contributing restaurants/areas
  2. Auto-increase quoted prep time +5 min for affected restaurants (temporary)
  3. Notify restaurants via banner; inform customers with ETA transparency note
  4. Schedule post-mortem: root causes (kitchen load, traffic, provider backlog)

3) Webhook backlog / DLQ growth
- Detect: Queue length > threshold; DLQ > 50 events
- Action:
  1. Scale consumers; enable backoff with jitter
  2. Replay DLQ with idempotency; contact provider if malformed payloads
  3. Run /ops/recompute-reliability and status reconciliation as needed

4) High refund rate spike (>6% GMV daily)
- Detect: Finance dashboard alert
- Action:
  1. Inspect reasons (SPILL/SOGGY/LATE)
  2. If packaging-related: trigger restaurant audits; ensure SOP checklist printed
  3. Temporarily subsidize packaging surcharge for top offenders (flag in portal)
  4. Tune auto-credit caps; enable photo-evidence requirement for larger credits

5) Portal outage for a single restaurant
- Detect: Error logs scoped to restaurant_id; health checks pass overall
- Action:
  1. Check RBAC/config changes in audit log
  2. Revert last config change; re-run menu cache warmers
  3. Provide manual ticket print fallback PDF

6) Payments incident (Stripe degraded)
- Detect: Stripe status, elevated failures in intents
- Action:
  1. Retry with exponential backoff; switch to capture-on-delivery if accept failing
  2. Allow order placement with reserve; queue capture until recovery (feature flag)
  3. Post status; reconcile intents post-recovery

7) Security/PII incident
- Action:
  1. Contain: rotate keys/tokens; block compromised accounts
  2. Assess scope; engage security lead; preserve evidence
  3. Notify per regulatory timelines; customer comms approved by legal

KPIs & thresholds
- ETA p90 error ≤6 min; defect rate ≤3%; refunds ≤6% GMV; webhooks DLQ < 10; dispatch job create success ≥99.5%

Post-incident review
- Timeline; contributing factors; action items with owners and dates; SLO impact; prevention steps

