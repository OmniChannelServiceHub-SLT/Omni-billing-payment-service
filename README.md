# Omni Billing & Payment Service — latest requirements

This version uses the uploaded project's existing files and directory layout. The ten API folder names follow column E of `ominichannelapiList.xlsx`. Controller/service/route filenames retain the original names. The two existing model files remain under `src/models`. No mapper files, contract file, test folder, seed-script folder, Gateway patch folder or new helper files are included.

## Run

1. Use a separate extracted folder while comparing with the existing repository. The `src/APIs` directory must contain only these ten new folders when you copy it to the feature branch. Do not leave the old API directories alongside them.
2. Run `npm ci`.
3. Keep `.env` private. Set `MONGODB_URI` to your development database and `JWT_ACCESS_SECRET` to the same access secret used by IAM. The uploaded `.env` is retained unchanged.
4. Run `npm run seed` if you want the Excel samples. This existing command now calls code inside `src/config/db.js`; it inserts missing records only and does not overwrite existing records, remove collections or reset registrations.
5. Run `npm start`.
6. Import the separately supplied Postman JSON. Set `baseUrl=http://localhost:3006` and `accessToken` to a valid IAM access token. Optional login defaults to the uploaded Gateway's v4 IAM path; adjust `loginPath` if your running Gateway uses v1 instead.

A21 `patchBillingAccount` is POST with query parameters. A144 `createConnection` is POST with a JSON body. The other eight APIs are GET. Responses retain the latest Excel's source envelopes; the folder name does not change the HTTP method or response schema.

## Local behavior

Reads use the original Mongoose model collections. A21 persists eBill preferences; A22/A23 read the resulting preferences for the same account and telephone before falling back to their original status collections. A144 saves/updates the invoice package record. No live SLT upstream has been configured.

A98 new-user behavior returns 501 until an OTP provider is connected. For local sample testing only, add `OTP_MODE=mock` to `.env` and restart; set collection `otpMode=mock`. The response contains `x-otp-mode: mock`; no real OTP is sent. Mock mode is disabled when NODE_ENV=production. A live provider can be injected as `app.locals.otpProvider` with an async `send` method.

Use a development database for these tests. Final account ownership checks and OTP verification before preference changes still need the team's integration rules. CTK is deferred; the TMF numbers in Excel are assignments and do not certify these source envelopes.

## Source details

- A114 uses FTTH_162 from the endpoint and output; its input example says FTTH_102. Only the truncated sample's JSON syntax is repaired, and its absent errorCode is not invented.
- A147 uses the endpoint's account/telephone pair; its input example has a different pair. Its swapped email/mobile source values are retained.
- A22 uses its explicit input pair to match A21's sample.
- A144's missing opening output brace is repaired.
- Interim/incomplete A89, A90, A115, A136, A145, A146, A149, A151, A158, A166 and A168 are excluded.

## Git workflow

Preserve uncommitted changes first. With a clean working tree, create an archive branch from current dev, then an implementation branch. Moving/replacing files in a new commit does not erase old commits. No history rewrite or force push is needed. For one API per PR, merge shared model/app/middleware/config changes first and then add the provided API folders on individual branches.

## Verification

46 local tests passed. The separate collection was executed with 20 HTTP requests and 43 script assertions, covering mock and disabled OTP modes. HTTP testing was performed outside this delivery folder so no extra test files are shipped. It tests the actual controllers/services against an in-memory replacement for Mongoose queries, not a live MongoDB server. Local IAM login, live MongoDB, SLT upstream and CTK testing remain to be run in your environment.
