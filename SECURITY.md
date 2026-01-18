# Security

## Policy

- **No secrets should be committed** to this repository.
- Use `.env.example` as the template for local configuration (copy to `.env.local`).

## Before pushing

Run a local secret scan and fix any findings before you push:

```bash
# Option A: gitleaks
# brew install gitleaks
# gitleaks detect --source .

# Option B: trufflehog
# brew install trufflehog
# trufflehog git file://. --since-commit HEAD
```

## Common sensitive items (never commit)

- `.env.local` (or any real API keys/tokens)
- Wallet keys / seed phrases / private keys
- Playwright artifacts that may contain URLs/cookies/screenshots (`test-results/`, traces, videos)
