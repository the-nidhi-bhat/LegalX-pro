# Blockchain and wallet

The current Smart Contracts page is **simulation mode**. It shows the intended contract details and lifecycle without claiming a wallet connection, deployment, funding, or transaction confirmation.

A real integration must use the existing escrow ABI, Sepolia chain ID `11155111`, a configured RPC, and explicit wallet confirmation. The UI should validate chain/account, show gas and transaction previews, handle pending/reverted/confirmed states, link to the explorer, and update execution history only from observed chain events. The application must never request seed phrases or private keys.

Deployment belongs in a secure local script with a dedicated test wallet and a documented explorer verification step. The browser receives only the contract address, ABI, and public chain configuration.
