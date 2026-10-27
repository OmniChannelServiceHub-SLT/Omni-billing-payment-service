# Billing & Payment — 678 / 676 response update

This version supersedes the earlier package that introduced Account Management routes. There are no accountManagement routes, account models, or extra account fixtures here.

## Apply

Keep your existing repository and private `.env`. Stop the billing server. Create a new branch from your current dev, then copy this folder's contents over the existing project. Keep `.git`, `.env` and your own credentials. The `src/APIs` directory still contains the same 12 API folders and the controller/route filenames are unchanged. No mapper files or new dependencies are added.

```cmd
npm ci
node server.js
```

Your existing seeded database can be reused. For a new development database use `npm run seed`. Keep the existing MONGODB_URI and JWT_ACCESS_SECRET. The existing development settings `NODE_ENV=development`, `OTP_MODE=mock`, `INTERIM_MODE=mock` and optional `TMF_DEMO_DATA=true` behave as before. If the standalone seed process has an Atlas DNS failure, use the same DNS workaround already used in the project.

Import the matching `Billing_Payment_12_Resource_Responses.postman_collection.json` as a new collection. It contains Setup (4 requests) and exactly 12 API folders. Enter your credentials/accessToken locally. Billing URLs are literal http://localhost:3006; no baseUrl variable is used.

## Response change

The existing business methods, query/body contracts and team-style 678/676 URLs are retained. Successful responses are resource objects/arrays instead of the SLT isSuccess/dataBundle/errorMessege envelope. They use actual source identifiers, hrefs, types, account references and numeric Money values. Extra business-specific fields are declared SLT extensions with published schema URLs. Errors use code, reason, message and status.

A145 retains its existing interim internal-api path. Its mock returns operationPerformed=false; no real invoice update is claimed. OTP mock responses say mock-not-sent. No fake invoice number, PDF, tax, paid state or allocated per-bill balance is manufactured from missing source information. Payment logs remain audit events rather than invented performed Payment records. The BillStatus sample has reversed email/mobile labels; the response classifies those contact values by their content.

This is the requested response-format update. The business URL aliases are custom SLT operations within the existing service; putting them under a TMF-style prefix does not make each one an official standard TMF operation. Existing standard customerBill, appliedCustomerBillingRate, customerBillOnDemand, payment and refund endpoints remain separate and unchanged. Their fixture CTK results do not certify the custom business operations.

## Local verification

- primary: 12 requests, 37 assertions, 0 failures.
- TMF678: 20 requests, 133 assertions, 0 failures.
- TMF676: 7 requests, 111 assertions, 0 failures.
- 89 resource/schema/href/auth/error/mock checks passed against a fresh local MongoDB using development fixtures.

Real OTP delivery, source backend integration and confirmed A144/A145 invoice classification remain outside this response-only change. Production authorization and ownership/OTP hooks remain required. No GitHub changes have been pushed by this delivery.

Embedded standard schemas are derived from the Apache-2.0 TM Forum TMF678_CustomerBill and TMF676_PaymentManagement specifications. See LICENSE-TMF.txt.
