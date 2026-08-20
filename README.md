# Omni-Channel Billing & Payment Service

| **Port:** `3006` | **Database:** `billing_payment_db`
**GitHub repo:** `OmniChannelServiceHub-SLT/Omni-billing-payment-service`

Restructured to match the team's agreed convention (`Omni-usage-management-service`):

```
src/
├── APIs/
│   ├── createBillDetailRequest/    # row 50
│   │   ├── controllers/billDetailController.js
│   │   ├── routes/billDetailRoutes.js
│   │   └── services/billDetailService.js
│   ├── createBillHistoryRequest/   # row 56
│   │   ├── controllers/billHistoryController.js
│   │   ├── routes/billHistoryRoutes.js
│   │   └── services/billHistoryService.js
│   └── createBillPaymentRequest/   # row 58
│       ├── controllers/billPaymentController.js
│       ├── routes/billPaymentRoutes.js
│       └── services/billPaymentService.js
├── config/db.js
├── middleware/
│   ├── auth.middleware.js
│   └── response.util.js
├── models/
│   └── TMF678_BillingPayment.js    # ONE file, all schemas (matches TMF635_UsageManagement.js convention)
└── app.js
server.js
```

`app.js` auto-mounts every `src/APIs/*/routes/*.js` file — adding a new API
is just: add a new `src/APIs/<tmfApiName>/{controllers,routes,services}`
folder, nothing to register by hand.

## Response data — pulled directly from the Excel, per team leader's instruction

All 3 endpoints' `dataBundle` shapes are copied field-for-field from the real
sample responses in `API_Params_SLTOMNI_V2_0_1.xlsx`:

| Endpoint | Sheet | Real fields used |
|---|---|---|
| `createBillDetailRequest` | "14" | `listofbillingInquiryType`, `listofProductDetail`, `myPackageInfo` |
| `createBillHistoryRequest` | "17" | `listOfSLTBillDetailsResponseIo` (19 invoice fields) |
| `createBillPaymentRequest` | "28" | `listofbillingInquiryType` |

## Running it

```bash
npm install
cp .env.example .env    # fill in real MONGODB_URI
npm run seed
npm run dev
```

```
GET http://localhost:3006/internal-api/billing/v1/bill-detail?telephoneNo=0112053609&accountNo=0037994858
GET http://localhost:3006/internal-api/billing/v1/bill-history?telephoneNo=0112053609&accountNo=0037994858
GET http://localhost:3006/internal-api/billing/v1/bill-payment?telephoneNo=0112053609&accountNo=0037994858
```

## All 24 endpoints

✅ = real response confirmed from `API_Params_SLTOMNI_V2_0_1.xlsx`. ⚠️ = no
sample response found; shape is a reasonable best-guess and needs your
team's confirmation before treating it as final.

| Row | Route | Method | Status |
|---|---|---|---|
| 50 | `/bill-detail` | GET | ✅ |
| 56 | `/bill-history` | GET | ✅ |
| 57 | `/bill-history-v2` | GET | ✅ |
| 58 | `/bill-payment` | GET | ✅ |
| 59 | `/bill-payment-v2` | GET | ⚠️ reused V1 shape |
| 71 | `/ebill-status` | GET | ✅ |
| 72 | `/bill-status` | GET | ✅ |
| 73 | `/sms-service-status` | GET | ✅ (preserves a real legacy double-envelope quirk) |
| 74 | `/ebill-check-user-exist` | GET | ✅ |
| 75 | `/ebill-check-user-exist-v2` | GET | ⚠️ reused row-74 shape |
| 76 | `/ebill-registration` | POST | ✅ |
| 77 | `/smart-bill-registration-source` | POST | ⚠️ Postman naming ambiguity - see route file NOTE |
| 78 | `/smart-bill-registration` | POST | ⚠️ |
| 79 | `/smart-bill-send` | POST | ⚠️ |
| 80 | `/ebill-resend` | POST | ⚠️ |
| 81 | `/ebill-download` | GET | ⚠️ inferred from row 82 |
| 82 | `/bill-download` | GET | ✅ |
| 84 | `/bill-codes` | GET | ✅ |
| 312 | `/invoice` (POST) | POST | ✅ |
| 317 | `/invoice/update` | POST | ⚠️ large body stored as `customerPayload` (Mixed) |
| 318 | `/invoice/bulk-update` | POST | ⚠️ same as above |
| 322 | `/invoice` (GET) | GET | ⚠️ |
| 325 | `/payment-logs` | GET | ✅ |
| 327 | `/payment-logs/update` | POST | ⚠️ |

**Before treating the ⚠️ endpoints as final**, get real sample
requests/responses for them (ask your team leader, or capture them by
running the old repo and hitting each endpoint yourself) and update the
matching `service.js` file's `dataBundle` shape to match.

## Known oddity worth raising with the team

Row 73's real response (`SMSServiceStatusRequest`) nests a **second full
envelope inside `dataBundle`** — `dataBundle.dataBundle` is the actual
boolean. This is preserved deliberately in
`createSMSServiceStatusRequest/services/...` since it's how the legacy
system actually responds, not a bug introduced here.
