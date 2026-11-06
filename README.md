# LEGALX

### From human agreements to executable trust.

LEGALX is Lexora's hackathon demo for turning ordinary English or Hinglish deal descriptions into a structured contract interpretation, a readable legal agreement preview, and matching Solidity escrow logic.

The differentiator is the **Legal-to-Code Parity Engine**: it checks whether the written agreement and executable payment behavior express the same defined terms before a user commits to the blockchain. It verifies consistency; it does not claim that blockchain makes an agreement legally enforceable or replace legal advice.

## Demo path

1. Describe a freelance agreement in the intake composer, or load the seeded ₹50,000 website project.
2. Review the extracted Contract IR summary: milestones, amounts, review window, and dispute behavior.
3. Compare the generated legal agreement with the Solidity escrow logic.
4. Toggle **Simulate tamper** to see the parity score drop when the code changes the review window from five days to two.

## Run locally

```bash
npm install
npm run dev
```

The app is a responsive Vite + React + TypeScript experience. The current demo uses seeded data so the core judge walkthrough is deterministic and can be shown in under two minutes.
