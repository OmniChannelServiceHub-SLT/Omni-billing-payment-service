# OmniChannel Billing & Payment Service

The OmniChannel Billing & Payment Service provides billing, invoice, eBill, and payment-related operations for the SLT OmniChannel platform.

The service is implemented using Node.js, Express, and MongoDB. It supports client-defined legacy responses and TM Forum-aligned responses based on:

* TMF678 Customer Bill Management API v4
* TMF676 Payment Management API v4

The service can be accessed directly on port `3006` or through the OmniChannel API Gateway on port `8080`.

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Project Architecture](#project-architecture)
3. [Project Structure](#project-structure)
4. [TM Forum Alignment](#tm-forum-alignment)
5. [Implemented API Modules](#implemented-api-modules)
6. [Prerequisites](#prerequisites)
7. [Installation](#installation)
8. [Environment Configuration](#environment-configuration)
9. [Running the Service](#running-the-service)
10. [Health Checks](#health-checks)
11. [Authentication](#authentication)
12. [API URLs](#api-urls)
13. [Response Formats](#response-formats)
14. [Postman Testing](#postman-testing)
15. [TMF678 CTK Testing](#tmf678-ctk-testing)
16. [TMF676 CTK Testing](#tmf676-ctk-testing)
17. [Known CTK Limitations](#known-ctk-limitations)
18. [Validation Commands](#validation-commands)
19. [Git Workflow](#git-workflow)
20. [Local DNS Workaround](#local-dns-workaround)
21. [Security Guidelines](#security-guidelines)

---

## Technology Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token authentication
* Postman
* Newman
* Docker for the supplied TMF676 CTK
* TM Forum Open API specifications

---

## Project Architecture

The Billing & Payment Service follows a layered module structure.

Each API module contains:

* Routes
* Controllers
* Services
* Mappers

The responsibilities of each layer are:

### Routes

Routes define HTTP methods, endpoint paths, authentication middleware, and controller functions.

### Controllers

Controllers validate requests, call service functions, select response formats, and return HTTP responses.

### Services

Services contain database access and business operations.

### Mappers

Mappers convert database records into:

* TM Forum-aligned responses
* Legacy responses based on the supplied Excel response definitions

### Models

Mongoose schemas and models are separated by TM Forum API:

```text
src/models/TMF678_BillingPayment.js
src/models/TMF676_Payment.js
```

---

## Project Structure

```text
Omni-billing-payment-service/
│
├── src/
│   ├── APIs/
│   │   ├── createBillDetailRequest/
│   │   ├── createBillHistoryRequest/
│   │   ├── createBillHistoryRequestV2/
│   │   ├── createBillPaymentRequest/
│   │   ├── createBillPaymentRequestV2/
│   │   ├── createEBillStatusRequest/
│   │   ├── createBillStatusRequest/
│   │   ├── createSMSServiceStatusRequest/
│   │   ├── createEBillCheckUserExist/
│   │   ├── createEBillCheckUserExistV2/
│   │   ├── createEBillRegistration/
│   │   ├── createSmartBillRegistrationSorce/
│   │   ├── createSmartBillRegistration/
│   │   ├── createSmartBillSendRequest/
│   │   ├── createEBillResendRequest/
│   │   ├── createEBillDownloadRequest/
│   │   ├── createBillDownloadRequest/
│   │   ├── listBillCodes/
│   │   ├── createInvoice/
│   │   ├── patchSaveInvoice/
│   │   ├── createBulkUpdateInvoiceData/
│   │   ├── listInvoiceData/
│   │   ├── listPaymentLogs/
│   │   └── patchPaymentLogs/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── response.util.js
│   │
│   ├── models/
│   │   ├── TMF678_BillingPayment.js
│   │   └── TMF676_Payment.js
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

The application automatically discovers route files from:

```text
src/APIs/*/routes/*.js
```

Each route is mounted on the relevant TMF678 or TMF676 router.

---

## TM Forum Alignment

The service separates Customer Bill Management and Payment Management operations.

### TMF678 Customer Bill Management

TMF678 operations are mounted under:

```text
/tmf-api/customerBillManagement/v4
```

The API Gateway currently exposes the service using:

```text
/tmf-api/customerBillManagement/v1
```

### TMF676 Payment Management

TMF676 operations are mounted under:

```text
/tmf-api/paymentManagement/v4
```

The API Gateway currently exposes the service using:

```text
/tmf-api/paymentManagement/v1
```

### API Naming Convention

Module folder names and controller method names follow the `Proposed TMF-Aligned Method Name` column in `billing(4).xlsx`.

The following method-name corrections have been applied:

| Existing API      | TMF-aligned method name |
| ----------------- | ----------------------- |
| GetBillCodes      | `listBillCodes`         |
| SaveInvoice       | `createInvoice`         |
| UpdateSaveInvoice | `patchSaveInvoice`      |
| GetInvoiceData    | `listInvoiceData`       |
| GetPaymentLogs    | `listPaymentLogs`       |
| UpdatePaymentLogs | `patchPaymentLogs`      |

GET collection operations use `list`, create operations use `create`, and update operations use `patch` where specified by the approved mapping.

---

## Implemented API Modules

The service currently contains 24 API modules.

### TMF678 Customer Bill Management Modules

| No. | Excel API name              | TMF-aligned module/method          |
| --: | --------------------------- | ---------------------------------- |
|   1 | BillDetailRequest           | `createBillDetailRequest`          |
|   2 | BillHistoryRequest          | `createBillHistoryRequest`         |
|   3 | BillHistoryRequestV2        | `createBillHistoryRequestV2`       |
|   4 | eBillStatusRequest          | `createEBillStatusRequest`         |
|   5 | BillStatusRequest           | `createBillStatusRequest`          |
|   6 | SMSServiceStatusRequest     | `createSMSServiceStatusRequest`    |
|   7 | eBillCheckUserExist         | `createEBillCheckUserExist`        |
|   8 | eBillCheckUserExistV2       | `createEBillCheckUserExistV2`      |
|   9 | eBillRegistration           | `createEBillRegistration`          |
|  10 | SmartBillRegistration Sorce | `createSmartBillRegistrationSorce` |
|  11 | SmartBillRegistration       | `createSmartBillRegistration`      |
|  12 | SmartBillSendRequest        | `createSmartBillSendRequest`       |
|  13 | eBillResendRequest          | `createEBillResendRequest`         |
|  14 | eBillDownloadRequest        | `createEBillDownloadRequest`       |
|  15 | BillDownloadRequest         | `createBillDownloadRequest`        |
|  16 | GetBillCodes                | `listBillCodes`                    |

The spelling `Sorce` is retained because it appears in the approved mapping and existing client API name.

### TMF676 Payment Management Modules

| No. | Excel API name        | TMF-aligned module/method     |
| --: | --------------------- | ----------------------------- |
|   1 | BillPaymentRequest    | `createBillPaymentRequest`    |
|   2 | BillPaymentRequestV2  | `createBillPaymentRequestV2`  |
|   3 | SaveInvoice           | `createInvoice`               |
|   4 | UpdateSaveInvoice     | `patchSaveInvoice`            |
|   5 | BulkUpdateInvoiceData | `createBulkUpdateInvoiceData` |
|   6 | GetInvoiceData        | `listInvoiceData`             |
|   7 | GetPaymentLogs        | `listPaymentLogs`             |
|   8 | UpdatePaymentLogs     | `patchPaymentLogs`            |

---

## Prerequisites

Install or configure the following before running the service:

* Node.js
* npm
* MongoDB or MongoDB Atlas
* Git
* Postman
* OmniChannel IAM Service
* OmniChannel API Gateway
* Docker Desktop for the supplied TMF676 CTK

Verify Node.js and npm:

```cmd
node --version
npm --version
```

Verify Git:

```cmd
git --version
```

Verify Docker when running the TMF676 CTK:

```cmd
docker --version
docker info
```

---

## Installation

Clone the repository:

```cmd
git clone https://github.com/OmniChannelServiceHub-SLT/Omni-billing-payment-service.git
```

Open the project:

```cmd
cd Omni-billing-payment-service
```

Install dependencies:

```cmd
npm install
```

Do not commit the `node_modules` directory.

---

## Environment Configuration

Create or update the local `.env` file with the environment values required by the project.

Example structure:

```env
PORT=3006
MONGODB_URI=<MongoDB connection string>
JWT_SECRET=<shared JWT secret>
CORS_ORIGIN=*
NODE_ENV=development
```

Use the exact environment variable names expected by the project configuration.

Do not commit:

* Access tokens
* Passwords
* MongoDB credentials
* JWT secrets
* Private keys
* Production configuration values

The `.env` file must remain excluded through `.gitignore`.

---

## Running the Service

Start the service from the project root:

```cmd
node server.js
```

A successful startup displays output similar to:

```text
[Billing] mounted 24 route file(s) from src/APIs/*/routes/*.js
Billing & Payment Service connected to MongoDB (billing_payment_db)
OmniChannel Billing & Payment Service listening on port 3006
```

Keep this terminal open while testing the APIs.

### Required Integration Services

For API Gateway testing, keep the following services running:

1. IAM Service
2. Billing & Payment Service
3. OmniChannel API Gateway
4. MongoDB connection

---

## Health Checks

### Direct Billing Service

```http
GET http://localhost:3006/health
```

Expected response:

```json
{
  "status": "UP",
  "service": "omnichannel-billing-payment-service",
  "port": 3006
}
```

### API Gateway

```http
GET http://localhost:8080/health
```

Expected response:

```json
{
  "status": "UP",
  "service": "omnichannel-api-gateway",
  "port": 8080
}
```

A correlation ID may also be included in the Gateway response.

---

## Authentication

Protected endpoints require an IAM bearer token.

Example header:

```http
Authorization: Bearer <ACCESS_TOKEN>
```

Obtain a valid access token from the IAM login endpoint before testing protected routes.

Do not store literal bearer tokens in:

* Source files
* README files
* Git commits
* Shared Postman collections
* CTK files committed to the repository

Use a Postman environment variable such as:

```text
{{access_token}}
```

Expired or invalid tokens return:

```text
401 Unauthorized
```

---

## API URLs

### Direct TMF678 URL

```text
http://localhost:3006/tmf-api/customerBillManagement/v4/
```

### Gateway TMF678 URL

```text
http://localhost:8080/tmf-api/customerBillManagement/v1/
```

### Direct TMF676 URL

```text
http://localhost:3006/tmf-api/paymentManagement/v4/
```

### Gateway TMF676 URL

```text
http://localhost:8080/tmf-api/paymentManagement/v1/
```

The direct service uses the TM Forum-aligned `v4` paths. The current Gateway configuration exposes corresponding `v1` paths.

---

## Response Formats

The service supports two response formats.

### Default TMF-Aligned Response

Do not send the `x-response-format` header when requesting the default TMF-aligned response.

Example:

```http
Accept: application/json
Authorization: Bearer <ACCESS_TOKEN>
```

### Legacy Response

Send the following header to request the Excel-aligned legacy response:

```http
x-response-format: legacy
```

Example legacy response structure:

```json
{
  "isSuccess": true,
  "errorMessege": null,
  "exceptionDetail": null,
  "dataBundle": {},
  "errorShow": null,
  "errorCode": null
}
```

Legacy field names and spelling are retained when required by the supplied Excel response definitions.

---

## Postman Testing

The Postman collection contains requests for:

* Direct service testing
* API Gateway testing
* Default TMF-aligned responses
* Legacy responses

### Direct Request Rules

Use:

```text
Port: 3006
Version: v4
```

Examples:

```text
http://localhost:3006/tmf-api/customerBillManagement/v4/
http://localhost:3006/tmf-api/paymentManagement/v4/
```

### Gateway Request Rules

Use:

```text
Port: 8080
Version: v1
```

Examples:

```text
http://localhost:8080/tmf-api/customerBillManagement/v1/
http://localhost:8080/tmf-api/paymentManagement/v1/
```

### Request Pair Validation

When comparing a direct request and its Gateway copy:

* Use the same HTTP method.
* Use the same query parameters.
* Use the same request body.
* Use the same valid access token.
* Use the same `x-response-format` setting.
* Compare status codes and response bodies.

### Legacy Testing

Enable:

```http
x-response-format: legacy
```

on both direct and Gateway requests when testing legacy responses.

### TMF Testing

Disable the legacy header on both requests when testing TMF-aligned responses.

---

## TMF678 CTK Testing

The supplied TMF678 CTK can run locally using Newman.

Example CTK folder:

```text
C:\Projects\TMF678_Customer_Bill_V4-0-0
```

Important files include:

```text
config.json
ctk/
Windows-Bat-RUNCTK.bat
Windows-PowerShell-RUNCTK.ps1
Mac-Linux-RUNCTK.sh
htmlResults.html
jsonResults.json
```

### TMF678 Direct-Service Configuration

```json
{
  "url": "http://127.0.0.1:3006/tmf-api/customerBillManagement/v4/",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer <ACCESS_TOKEN>"
  }
}
```

### TMF678 Gateway Configuration

```json
{
  "url": "http://127.0.0.1:8080/tmf-api/customerBillManagement/v1/",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer <ACCESS_TOKEN>"
  }
}
```

Use `127.0.0.1` instead of `localhost` if the bundled Newman version reports an invalid IP address error.

### Running TMF678 CTK

Keep the Billing Service and, for Gateway testing, the API Gateway running.

Run:

```cmd
cd C:\Projects\TMF678_Customer_Bill_V4-0-0
Windows-Bat-RUNCTK.bat
```

The generated reports are:

```text
htmlResults.html
jsonResults.json
```

### TMF678 CTK Result Interpretation

The CTK tests standard resources, response schemas, field filtering, status codes, and error handling.

A failed assertion may be a secondary failure. For example, if an initial request fails and does not set an ID variable, later ID filtering and PATCH tests may also fail.

Review the first failed request before fixing later failures.

---

## TMF676 CTK Testing

The supplied TMF676 CTK package uses Docker.

Example CTK folder:

```text
C:\Projects\tmf676-v4.0.0-ctk-1.0.1
```

Important files include:

```text
.env
config.json
docker-compose.yaml
README.md
run.bat
run.sh
```

The supplied Docker image is:

```text
tmforumorg/tmf676-v4.0.0-ctk:1.0.1
```

### Docker Requirement

Docker Desktop must be installed and running.

Verify Docker:

```cmd
docker --version
docker info
```

The supplied TMF676 CTK package cannot run without Docker because the CTK collection and runner files are stored inside the Docker image.

### TMF676 Gateway Configuration

Because the CTK runs inside a Docker container, do not use `127.0.0.1` to access services running on the Windows host.

Use:

```json
{
  "url": "http://host.docker.internal:8080/tmf-api/paymentManagement/v1/",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer <ACCESS_TOKEN>"
  }
}
```

Inside a Docker container, `127.0.0.1` refers to the container itself. `host.docker.internal` refers to the Windows host.

### Running TMF676 CTK

Start:

1. IAM Service
2. Billing & Payment Service
3. API Gateway
4. Docker Desktop

Then run:

```cmd
cd C:\Projects\tmf676-v4.0.0-ctk-1.0.1
run.bat
```

The generated report is written to:

```text
reports/htmlResults.html
```

---

## Known CTK Limitations

The 24 implemented APIs are based on the approved client mapping in `billing(4).xlsx`.

The official full TMF678 CTK also tests standard resources that are not currently part of the client-defined 24-API scope:

```text
/customerBillOnDemand
/appliedCustomerBillingRate
```

The CTK expects operations such as:

```text
POST /customerBillOnDemand
GET  /customerBillOnDemand
GET  /customerBillOnDemand/:id

GET  /appliedCustomerBillingRate
GET  /appliedCustomerBillingRate/:id
```

Until these standard resources are implemented, the corresponding full CTK tests may return `404` and fail.

Do not remove CTK tests or change expected results to create an artificial passing report. A modified CTK report is not valid evidence of full TM Forum compliance.

The missing resources can be added later as separate CTK-compliance modules without modifying the existing client-defined API contracts.

---

## Validation Commands

### Check One JavaScript File

```cmd
node --check path\to\file.js
```

### Check All API JavaScript Files

```cmd
for /r src\APIs %f in (*.js) do @node --check "%f"
```

### Verify Application Route Loading

```cmd
node -e "require('./src/app');console.log('App routes loaded')"
```

Expected output:

```text
[Billing] mounted 24 route file(s) from src/APIs/*/routes/*.js
App routes loaded
```

### Verify Exported Models

```cmd
node -e "const a=require('./src/models/TMF678_BillingPayment');const b=require('./src/models/TMF676_Payment');console.log('TMF678:',Object.keys(a));console.log('TMF676:',Object.keys(b))"
```

### Check Git Formatting Errors

```cmd
git diff --check
```

### Check Staged Formatting Errors

```cmd
git diff --cached --check
```

### View Changed Files

```cmd
git status --short
```

---

## Git Workflow

Do not make feature changes directly on `dev`.

### Update Local Development Branch

```cmd
git switch dev
git pull origin dev
git status
```

### Create a Feature Branch

```cmd
git switch -c <FeatureName>_Kumudu
```

### Stage Selected Files

```cmd
git add <file-or-folder>
```

### Verify Staged Changes

```cmd
git diff --cached --check
git status --short
```

### Commit

```cmd
git commit -m "Describe the change"
```

### Push

```cmd
git push -u origin <FeatureName>_Kumudu
```

### Pull Request

Create a pull request with:

```text
base: dev
compare: <FeatureName>_Kumudu
```

After the pull request is reviewed and merged:

```cmd
git switch dev
git pull origin dev
git status
```

Delete the completed local branch:

```cmd
git branch -d <FeatureName>_Kumudu
```

Delete the completed remote branch when appropriate:

```cmd
git push origin --delete <FeatureName>_Kumudu
```

---

## Local DNS Workaround

Some local environments may fail to resolve the MongoDB Atlas SRV address:

```text
querySrv ECONNREFUSED
```

A machine-specific DNS workaround may be temporarily added to `server.js`.

This workaround is local-only and must not be committed.

### Save the Local Workaround

```cmd
git stash push -m "Local DNS workaround" -- server.js
```

### View Available Stashes

```cmd
git stash list
```

### Restore the Workaround

```cmd
git stash apply "stash@{0}"
```

Use `git stash apply` instead of `git stash pop` when the workaround may be required again.

### Confirm the Local Change

```cmd
git status --short
```

Expected local test state:

```text
 M server.js
```

Before creating a commit, confirm that `server.js` is not staged.

---

## Security Guidelines

* Never commit `.env`.
* Never commit access tokens.
* Never include passwords in README files.
* Never include database credentials in source code.
* Never push machine-specific DNS changes.
* Use environment variables for secrets.
* Use Postman environment variables for access tokens.
* Rotate any credential accidentally shared in a collection, report, screenshot, or chat.
* Review staged changes before every commit.
* Keep generated CTK reports out of source control unless the team specifically requires them.
* Do not modify official CTK tests to produce a passing result.

---

## Current Verification Status

The following validations have been completed during development:

* All 24 API route modules load successfully.
* JavaScript syntax checks pass for API module files.
* Direct service routes are available on port `3006`.
* API Gateway routes are available on port `8080`.
* MongoDB connectivity has been verified.
* TMF678 CTK can execute through the local Newman runner.
* TMF678 CTK can reach the service through the API Gateway.
* TMF676 CTK configuration has been prepared.
* The supplied TMF676 CTK requires Docker before it can be executed.
* Six API folders and controller methods were aligned with the approved Excel method names.

---

## License

This project is maintained for the OmniChannel Service Hub billing and payment integration.

Any TM Forum specifications, CTK packages, and related materials remain subject to their respective licenses and usage conditions.
