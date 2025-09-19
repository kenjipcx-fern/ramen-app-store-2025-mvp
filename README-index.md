# Ramen App Store — Specs Package Index (v1)

Core
- specs.md — full product spec (problem, personas, user stories, AC, NFRs)
- contract-of-done.md — checklist derived from ACs + sprint exit gates
- backlog.md — prioritized MVP backlog
- flows.md — end-to-end flows (customer, owner, driver, ops)

Execution
- system-architecture.md — services, infra, SLOs, security
- api-surface.md — endpoint outline
- openapi.yaml — OpenAPI 3.0 draft
- data-model.md — MVP schema
- telemetry-events.md — events to measure KPIs/SLAs
- qa-test-plan.md — P0/P1 cases
- error-codes.md — error schema & domain codes
- security-checklist.md — MVP security items
- risk-register.md — pilot risks & mitigations

Ops & Collateral
- restaurant-packaging-sop.md — packaging workflow to preserve quality
- driver-sop-checklist.md — driver handling & proof
- pilot-restaurant-criteria.md — onboarding expectations
- stakeholder-brief.md — one-pager for partners
- partner-deck.md — pilot deck outline

Samples
- sample-data/menu-sample.json — ramen menu with options/constraints
- sample-data/orders-sample.json — order and events
- sample-data/telemetry-sample.json — event payload examples

Dev assets
- wireframes/ — static low-fi preview (served on morph URL)
- wireframes/api-docs.html — Redoc viewer for OpenAPI
- sdk/ts — TypeScript SDK scaffold (USAGE.md inside)
- postman_collection.json — quick calls for core flows

How to use
1) Read specs.md and contract-of-done.md to align scope and “done”.
2) Use openapi.yaml to generate client/server stubs; consult api-surface.md for narrative.
3) Use data-model.md to bootstrap DB; link to QA/telemetry to instrument KPIs.
4) Follow backlog.md + flows.md to plan sprints; gate with qa-test-plan.md.

If you need a GitHub repo scaffold or SDK generation, say: “Create repo” or “Ship SDK build.”

