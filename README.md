# OmniChannel Billing & Payment Service

The Billing & Payment Service provides billing enquiries, bill history, eBill delivery preferences, payment enquiries, payment audit logs and invoice record handling for the OmniChannel platform. It exposes 12 business APIs and separate TMF678 Customer Bill Management and TMF676 Payment Management resource endpoints.

The service runs on **http://localhost:3006** by default and stores its records in MongoDB. Protected APIs accept a JWT bearer token issued by the platform's authentication service.

## What the service does

- Retrieves a customer's billing summary, outstanding balance, product details and package usage information.
- Lists historical billing details for a customer account.
- Registers eBill delivery preferences and retrieves eBill, SMS service and bill delivery status.
- Checks eBill registration information through the existing validation operation.
- Retrieves bill payment summaries and payment audit logs.
- Saves invoice records for connection-related requests.
- Provides an interim invoice-update acknowledgement in development mock mode.
- Exposes customer bill, applied billing rate, bill-on-demand, payment and refund resources through the implemented TMF678 and TMF676 routes.

Some operations currently use seeded development data or explicit mocks. See [Current implementation boundaries](#current-implementation-boundaries) for their behaviour.

## Technology

| Component | Technology |
| --- | --- |
| Runtime | Node.js; package engine requirement: 18 or later |
| HTTP API | Express |
| Database | MongoDB with Mongoose |
| Authentication | JWT bearer tokens, verified using HS256 |
| Schema validation | AJV and ajv-formats |
| HTTP middleware | Helmet, CORS and Morgan |
| Manual API testing | Postman |
| Resource conformance testing | TMF678 and TMF676 CTKs |

## Business APIs

The following are the **12 active API folders** under `src/APIs`. Method names identify the existing project modules; use the HTTP method shown in the table when sending a request.

All paths below are relative to **http://localhost:3006**.

| ID | API module | Method | Path | Purpose |
| --- | --- | --- | --- | --- |
| A14 | `retrieveBilling` | GET | `/tmf-api/customerBillManagement/v4/bill-detail` | Retrieve billing, product and package usage details. |
| A21 | `patchBillingAccount` | POST | `/tmf-api/customerBillManagement/v4/ebill-registration` | Save eBill delivery preferences, subject to ownership/OTP verification or explicit development mock mode. |
| A22 | `retrieveBillingRequest` | GET | `/tmf-api/customerBillManagement/v4/ebill-status` | Retrieve eBill registration and delivery preferences. |
| A23 | `retrieveBillingStatus` | GET | `/tmf-api/customerBillManagement/v4/sms-service-status` | Retrieve SMS billing service status. |
| A28 | `retrieveBillingPayment` | GET | `/tmf-api/paymentManagement/v4/bill-payment` | Retrieve the account's bill payment summary. |
| A90 | `listCustomerBill` | GET | `/tmf-api/customerBillManagement/v4/bill-history-v2` | List historical billing details for an account. |
| A98 | `validateBillDelivery` | GET | `/tmf-api/customerBillManagement/v4/ebill-check-user-exist-v2` | Check eBill user information; identify mocked OTP delivery explicitly. |
| A114 | `listPayment` | GET | `/tmf-api/paymentManagement/v4/payment-logs` | Retrieve payment audit events by order reference. |
| A144 | `createConnection` | POST | `/tmf-api/paymentManagement/v4/save-invoice` | Save or update an invoice record using its source reference. |
| A145 | `UpdateInvoiceData` | POST | `/internal-api/billingPayment/v4/update-invoice` | Return an interim development acknowledgement; currently performs no invoice update. |
| A147 | `retrieveBillAccount` | GET | `/tmf-api/customerBillManagement/v4/bill-status` | Retrieve account bill delivery status and contact preferences. |
| A148 | `listBillPresentation` | GET | `/tmf-api/customerBillManagement/v4/bill-codes` | List configured bill presentation codes. |

### Request inputs

Parameter names are case-sensitive. Use the matching Postman collection for complete request examples.

| API | Input location | Fields |
| --- | --- | --- |
| A14, A28, A90 | Query | `telephoneNo`, `accountNo` |
| A21 | Query | `eventSource`, `newEmailAddress`, `newContactNumber`, `accountNumber`, `isEnableSms`, `isAlreadyRegistered`, `isPrestigeCustomer` |
| A22, A23, A147 | Query | `accountNo`, `tpNo` |
| A98 | Query | `accountNo` |
| A114 | Query | `orderreff` |
| A144 | JSON body | `REF_NO`, `SERVICE_TYPE`, `PACKAGE_NAME`, `PACKAGE_COUNT`, `RENTAL`, `INI_CHARGE`, `STATUS` |
| A145 | Query | `REF_NO` |
| A148 | None | No business query parameters. |

A21 accepts case-insensitive `True` or `False` values for its three boolean query fields. Despite its module name, its current HTTP operation is **POST**.

## Standard resource endpoints

The service also implements resource operations under these base paths:

| API | Base URL | Resource | Implemented operations |
| --- | --- | --- | --- |
| TMF678 | `http://localhost:3006/tmf-api/customerBillManagement/v4/` | `customerBill` | List, retrieve by ID and PATCH by ID. |
| TMF678 | Same as above | `appliedCustomerBillingRate` | List and retrieve by ID. |
| TMF678 | Same as above | `customerBillOnDemand` | Create, list and retrieve by ID. |
| TMF676 | `http://localhost:3006/tmf-api/paymentManagement/v4/` | `payment` | Create, list and retrieve by ID. |
| TMF676 | Same as above | `refund` | Create, list and retrieve by ID. |

These resources are separate from the 12 custom business operations. A TMF-style URL prefix and resource response format do not make a custom operation an official TM Forum operation. CTK results apply to the resource operations exercised by the corresponding test kit.

## Project structure

| Location | Responsibility |
| --- | --- |
| `server.js` | Load configuration, connect to MongoDB and start the HTTP server. |
| `src/app.js` | Configure Express middleware, health checks, schema routes and API route discovery. |
| `src/APIs/<API>/routes/` | Define HTTP routes and authentication middleware. |
| `src/APIs/<API>/controllers/` | Validate request inputs and return API responses. |
| `src/APIs/<API>/services/` | Read or write source records and implement business behaviour. |
| `src/models/` | Define billing, payment and TMF resource models. |
| `src/config/db.js` | Manage database connection and development sample seeding. |
| `src/middleware/auth.middleware.js` | Verify JWT bearer tokens. |
| `src/middleware/response.util.js` | Provide shared response, error, authorization and extension schema utilities. |

The application automatically loads JavaScript route files from `src/APIs/*/routes/`. Controllers, routes and services remain inside their existing API folders; no separate mapper layer is required.

## Local setup

### 1. Get the project and install dependencies

For a new checkout:

```cmd
git clone https://github.com/OmniChannelServiceHub-SLT/Omni-billing-payment-service.git
cd Omni-billing-payment-service
git switch dev
npm ci
```

For an existing checkout, open its project directory and run `npm ci` after updating the code. Keep the existing `.git` directory and private configuration.

### 2. Configure the environment

Create a private `.env` file in the project root, or retain your existing working file. Replace the placeholders below with your own local values:

```dotenv
PORT=3006
MONGODB_URI=<your MongoDB connection string>
JWT_ACCESS_SECRET=<secret configured for the platform authentication service>
NODE_ENV=development
OTP_MODE=mock
INTERIM_MODE=mock
TMF_DEMO_DATA=true
BILLING_CURRENCY=LKR
```

| Setting | Purpose |
| --- | --- |
| `PORT` | HTTP port; defaults to `3006`. |
| `MONGODB_URI` | Required MongoDB connection string. |
| `JWT_ACCESS_SECRET` | Secret used to verify platform access tokens. |
| `NODE_ENV` | Runtime environment; use `development` for local sample testing. |
| `OTP_MODE` | `mock` enables the existing development/test verification fallback; it does not send a real OTP. |
| `INTERIM_MODE` | `mock` enables supported interim development behaviour. |
| `TMF_DEMO_DATA` | Optional development/test resource fixtures for CTK testing; set to `true` before running the seed command. |
| `BILLING_CURRENCY` | Currency for business Money values; defaults to `LKR`. |
| `TMF_PUBLIC_ORIGIN` | Optional public origin used when constructing resource links. |
| `CORS_ORIGIN` | Optional allowed browser origin configuration. |

Do not commit `.env`, MongoDB credentials, JWT secrets, passwords or exported access tokens.

### 3. Seed a development database

```cmd
npm run seed
```

An existing seeded database can be reused. Enable `TMF_DEMO_DATA=true` only when development/test resource fixtures are needed. Sample data and fixtures are for local testing, not customer production records.

### 4. Start the service

```cmd
npm start
```

Alternatively:

```cmd
node server.js
```

For development with automatic restart:

```cmd
npm run dev
```

The startup log should show 12 mounted API route files and a successful database connection. Check the running service at:

```text
http://localhost:3006/health
```

## Authentication and Postman

1. Start the platform authentication service and any gateway required by your local setup.
2. Import `Billing_Payment_12_Resource_Responses.postman_collection.json`.
3. Enter your own credentials in the collection's Setup requests and obtain an access token.
4. Set the collection's `accessToken` value locally, or use the token captured by its Setup flow.
5. Run the 12 business API folders and inspect both the response body and test results.

Protected requests use:

```http
Authorization: Bearer <accessToken>
Accept: application/json
```

For JSON request bodies, also send `Content-Type: application/json`. The collection contains four Setup requests and exactly 12 business API folders. Billing URLs use literal `http://localhost:3006`.

Example billing enquiry using seeded development account data:

```text
GET http://localhost:3006/tmf-api/customerBillManagement/v4/bill-detail?telephoneNo=0112053609&accountNo=0037994858
```

## Responses and errors

Business success responses are resource objects or arrays. Depending on the resource, they include identifiers, resource links, type information, account references and numeric Money values. Business-specific resources use explicit SLT extension types, such as `SLTBillingSummary` and `SLTCustomerBillHistory`.

Extension schemas are available at:

```text
http://localhost:3006/internal-api/billingPayment/v4/schema/<type>
```

Money values use a currency and a numeric amount, for example:

```json
{"unit": "LKR", "value": 2500}
```

Handled business and TMF errors use `code`, `reason`, `message` and `status`. Check HTTP status codes as well as response bodies: a successful HTTP response alone does not establish that the returned business data is correct.

## CTK testing

Keep the billing service running with a reachable database and valid authorization for the test requests. Use development resource fixtures when the CTK needs sample resources.

### TMF678

From the existing Windows CTK installation:

```cmd
cd /d C:\Projects\TMF678_Customer_Bill_V4-0-0\ctk
npm start
```

Configure its environment base URL as:

```text
http://127.0.0.1:3006/tmf-api/customerBillManagement/v4/
```

### TMF676

Start Docker Desktop. In the CTK's `config.json`, configure its `url` as:

```text
http://host.docker.internal:3006/tmf-api/paymentManagement/v4/
```

Retain the required CTK payloads and provide a valid bearer token through its headers. Then run:

```cmd
cd /d C:\Projects\tmf676-v4.0.0-ctk-1.0.1
run.bat
```

Use the generated HTML and JSON reports to inspect failures. CTK installation paths above are examples from the development setup; use your own extracted CTK folder when different.

### Recorded verification — 27 October 2026

| Check | Result |
| --- | --- |
| Business APIs | All 12 reported successfully tested in Postman. |
| TMF678 CTK | 20 requests, 165 assertions, 0 failures. |
| TMF676 CTK | 7 requests, 134 assertions, 0 failures. |

These are results from the recorded development runs, not a claim of formal TM Forum certification. Assertion counts may vary with the resources present in the test database.

## Current implementation boundaries

- **eBill registration:** saves registration preferences. Real account ownership and OTP verification require the configured integration hook; the explicit development/test fallback bypasses real verification.
- **OTP delivery:** mock responses identify delivery as `mock-not-sent`. No real message is sent by that mock.
- **Invoice save (A144):** persists the source invoice record. Its final external invoice resource classification remains to be confirmed.
- **Invoice update (A145):** the current mock returns `operationPerformed: false` and `state: "notPerformed"`; it does not update an invoice.
- **Payment logs:** represent audit events, not evidence that a financial transaction settled.
- **Standard payment/refund creation:** records resource requests; it does not move money through a payment gateway.
- **Bill-on-demand creation:** records the request in progress; it does not generate a real bill PDF.
- **Source integration:** seeded records and development fixtures are used where live backend integrations are not yet connected. Missing invoice numbers, PDFs, tax values or per-bill payment allocations are not fabricated.
- **Production access:** configure the required account authorization integration (`app.locals.tmfAuthorizer`) and eBill ownership/OTP integration (`app.locals.billDeliveryGuard`) before enabling production workflows. Development mocks are not production integrations.

## Troubleshooting

| Problem | Check |
| --- | --- |
| `Cannot find module 'dotenv'` | Run `npm ci` in the project root. |
| `MONGODB_URI is not set` | Confirm the root `.env` contains a valid connection string and start the server from that directory. |
| MongoDB connection or Atlas SRV lookup fails | Check the connection string, Atlas network access and local DNS. A standalone seed process needs its own working DNS configuration. |
| `401 Unauthorized` | Obtain a fresh token and confirm the configured JWT verification secret matches the authentication service. |
| `403 Forbidden` | Check account authorization and ownership/OTP verification. |
| `503` for guarded workflows | Configure the required integration hooks; for local samples only, check the documented development mock settings. |
| CTK cannot connect | Check the running port and CTK base URL; use the Docker host address for the Docker-based kit. |
| Empty resource lists | Check the target database and seed appropriate development fixtures where required. |

## TM Forum schema attribution

Embedded standard resource schemas are derived from the Apache-2.0 TM Forum TMF678 Customer Bill Management and TMF676 Payment Management specifications. See [LICENSE-TMF.txt](LICENSE-TMF.txt).
