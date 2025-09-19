# Ramen App Store — MVP Specs & Assets

Live prototype: https://ramen-prototype-morphvm-52mu6gct.http.cloud.morph.so

This repo contains v1.0 (MVP locked) specifications and build-ready assets for a ramen-focused discovery and delivery experience optimized for heat/texture quality.

Key docs
- specs.md — Product specs (problem, personas, user stories, ACs, UVP)
- contract-of-done.md — Checklist derived from ACs for MVP sign-off
- api.md — REST API surface (developer-friendly)
- openapi.yaml — OpenAPI 3 spec (generate SDKs/clients)
- data-model.md — Entities and relationships
- architecture.md — System design
- reliability-math.md — Reliability score methodology
- ui-design.md — UI flows and principles
- qa-test-plan.md — Test suites and exit criteria
- security-checklist.md — Security & privacy posture
- ops-runbook.md — Incident response playbooks
- telemetry-events.md — Event instrumentation
- error-codes.md — Standardized error taxonomy
- backlog.md — MVP backlog tied to DoD
- stakeholder-brief.md — One-pager for execs/stakeholders
- onboarding-emails.md — Restaurant onboarding sequence

Prototype
- prototype/ — Static HTML/CSS demo (discover → bowl → cart → tracking → review)

Samples
- sample-data/ — Example restaurants and menus for demos/tests

Quickstart (mock API)
- Dockerized Prism mock server using OpenAPI

1) Install Docker
2) Run: docker compose -f mock/docker-compose.mock.yml up
3) Hit: http://localhost:4010

Postman collection
- postman_collection.json — Import and set baseUrl/token variables

Contributing
- See CONTRIBUTING.md

License
- MIT (for specs and prototype assets). Verify before publishing any proprietary content.



Live prototype: https://ramen-prototype-morphvm-52mu6gct.http.cloud.morph.so
Live mock API: https://ramen-mock-api-morphvm-52mu6gct.http.cloud.morph.so
