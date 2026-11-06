# Setup

## Local demo

```bash
npm install
npm run dev
```

Then open the managed Preview or the local Vite origin. `/demo` is the fastest judge path and does not require an account, wallet, API key, Supabase project, or real payment.

## Production prerequisites

1. Create a Supabase project and configure Auth, private Storage, PostgreSQL migrations, and Row Level Security.
2. Create a server-side Gemini key and expose it only to server routes.
3. Deploy the escrow contract to Sepolia from a dedicated test wallet using a secure local shell.
4. Configure an RPC endpoint, chain ID, deployed address, ABI, and explorer base URL.
5. Configure the production application origin, cookie policy, CSP, and monitoring.
6. Add environment variables from `.env.example` through the deployment provider secret manager.

No private key belongs in source, browser code, `.env` committed files, or chat.
