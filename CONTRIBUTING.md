# Contributing Guide

Branching
- main: protected; release tags for milestones
- feat/*: features; fix/*: bugfixes; docs/*: documentation

Commit style
- Conventional commits (feat:, fix:, docs:, chore:, refactor:, test:)

PR checklist
- [ ] Story linked to backlog item (RAS-*)
- [ ] Updated specs or DoD if behavior changed
- [ ] Unit/integration tests added/updated
- [ ] Security/privacy impact considered
- [ ] Telemetry events added/updated
- [ ] Docs updated (README/backlog)

Code quality
- Linting & type checks mandatory in CI
- SAST/SCA scans must be green

Release process
- Staging deploy behind feature flags; QA pass against DoD; tag release

Security
- No secrets in repo. Use env vars and secret manager.

