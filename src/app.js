// src/app.js
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const { tmfFailure } = require('./middleware/response.util');
const isTmfPath = req => /^\/(?:tmf-api\/(?:customerBillManagement|paymentManagement|payment)\/v4|payment\/v4)(?:\/|$)/.test(req.path);

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(helmet());

app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === '*'
        ? '*'
        : process.env.CORS_ORIGIN || '*',
    credentials: process.env.CORS_ORIGIN !== '*',
    exposedHeaders: ['Location', 'ETag', 'X-Total-Count', 'X-Result-Count'],
  })
);

app.use(morgan('combined'));

app.use(express.json({ limit: '1mb', type: ['application/json', 'application/*+json'] }));
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------
// Health Check
// ---------------------------------------------------------
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'omnichannel-billing-payment-service',
    port: Number(process.env.PORT || 3006),
  });
});

// ---------------------------------------------------------
// Auto-discover Billing APIs
//
// Expected structure:
//
// src/
//   APIs/
//     <tmfApiName>/
//       routes/
//         *.js
//
// API route modules contain the complete documented /api/... path.
const apisDir = path.join(__dirname, 'APIs');
const router = express.Router();
let mountedRouteFiles = 0;

if (fs.existsSync(apisDir)) {
  for (const apiFolder of fs.readdirSync(apisDir).sort()) {
    const apiFolderPath = path.join(apisDir, apiFolder);
    if (!fs.statSync(apiFolderPath).isDirectory()) continue;
    const routesDir = path.join(apiFolderPath, 'routes');
    if (!fs.existsSync(routesDir)) continue;
    for (const file of fs.readdirSync(routesDir).sort()) {
      if (!file.endsWith('.js')) continue;
      router.use(require(path.join(routesDir, file)));
      mountedRouteFiles += 1;
    }
  }
}
console.log(`[Billing] mounted ${mountedRouteFiles} route file(s) from src/APIs/*/routes/*.js`);
app.use(router);

// ---------------------------------------------------------
// 404 Handler
// ---------------------------------------------------------
app.use((req, res) => {
  if (isTmfPath(req)) return tmfFailure(res, { status: 404, message: 'No TMF resource matches this path.' });
  res.status(404).json({
    isSuccess: false,
    errorMessege: `No Billing route matches ${req.method} ${req.originalUrl}`,
    exceptionDetail: null,
    dataBundle: null,
    errorShow: `No Billing route matches ${req.method} ${req.originalUrl}`,
    errorCode: 'E404',
  });
});

// ---------------------------------------------------------
// Error Handler
// ---------------------------------------------------------
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error('[Billing]', err.stack || err.message);

  const status = err.status || 500;
  if (isTmfPath(req)) return tmfFailure(res, { status, message: status === 400 ? 'Invalid request body.' : status < 500 ? err.message : 'Request failed.' });

  const message =
    err.publicMessage ||
    (status === 400 ? 'Invalid request body.' : 'Request failed.');

  res.status(status).json({
    isSuccess: false,
    errorMessege: message,
    exceptionDetail:
      process.env.NODE_ENV === 'production'
        ? null
        : err.message || null,
    dataBundle: null,
    errorShow: message,
    errorCode: err.code || 'E500',
  });
});

module.exports = app;
