# Security & Privacy Checklist (MVP)

Standards & posture
- OWASP ASVS Level 2 for web; OWASP MASVS L1 guidance for mobile
- TLS 1.2+ everywhere; HSTS, TLS A+ on public endpoints
- Minimal PCI scope (Stripe tokens only); SOC2 alignment later

Authentication & sessions
- Strong password policy; email verification required to order; optional 2FA (TOTP/SMS)
- SSO (Apple/Google) with token verification and replay protection
- Session tokens httpOnly, Secure, SameSite=Lax; refresh flow with rotation; device/session revocation
- Brute-force protection: per-IP and per-account rate limits; incremental backoff

Authorization
- RBAC (customer/owner/staff/admin); least privilege
- Server-side checks on every privileged operation; avoid relying on client state
- Restaurant scoping: owners only see own resources; consider DB row-level security

Input & output handling
- Validate and sanitize all inputs (OpenAPI/JSON schema); reject unknown fields
- Prevent SQLi via parameterized queries; escape output to prevent XSS
- File uploads: content-type and magic byte checks; size limits; AV scan; private bucket+signed URLs
- Enforce content security policy (CSP), X-Frame-Options, X-Content-Type-Options, Referrer-Policy

Secrets & config
- Secrets in managed store (e.g., AWS KMS/Secrets Manager); rotation policy; no secrets in repo
- Separate envs (dev/staging/prod) with isolated credentials; principle of least privilege for DB/users

Payments
- Card data tokenized by Stripe; never log PAN/PII; enable 3DS; enforce idempotency keys
- Webhooks: verify signatures; rotate secrets; handle replays idempotently

Webhooks & dispatch
- Verify provider signatures and IP allowlist where possible
- Exponential backoff with jitter; DLQ and reconciliation job; idempotent handlers

Privacy & data protection
- PII inventory; encrypt at rest (AES-256) and in transit
- Data minimization; retention policy; GDPR/CCPA data subject requests (export/delete) flows
- Logs with PII redaction; access controls for logs and analytics

Mobile app specifics
- Use secure keychain/keystore for tokens; do not store secrets in plaintext
- Optional certificate pinning; jailbreak/root detection (best effort)

Monitoring & testing
- SAST/DAST in CI; dependency scanning (SCA); SBOM produced for releases
- Penetration test before GA; bug bounty readiness post-MVP
- Security alerts wired to on-call; runbooks for auth abuse, webhook flood, refund abuse

Incident response
- Severity matrix; 24/7 on-call; customer comms templates; regulatory notification workflow

