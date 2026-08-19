// src/app.js
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

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
  })
);

app.use(morgan('combined'));

app.use(express.json({ limit: '1mb' }));
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
// All route files are loaded into one shared router.
// ---------------------------------------------------------
const apisDir = path.join(__dirname, 'APIs');
const router = express.Router();

let mountedRouteFiles = 0;

if (fs.existsSync(apisDir)) {
  for (const apiFolder of fs.readdirSync(apisDir)) {
    const apiFolderPath = path.join(apisDir, apiFolder);

    if (!fs.statSync(apiFolderPath).isDirectory()) {
      continue;
    }

    const routesDir = path.join(apiFolderPath, 'routes');

    if (!fs.existsSync(routesDir)) {
      continue;
    }

    for (const file of fs.readdirSync(routesDir)) {
      if (!file.endsWith('.js')) {
        continue;
      }

      const routeFile = path.join(routesDir, file);

      // eslint-disable-next-line global-require, import/no-dynamic-require
      const routeModule = require(routeFile);

      router.use(routeModule);

      mountedRouteFiles += 1;
    }
  }
}

// eslint-disable-next-line no-console
console.log(
  `[Billing] mounted ${mountedRouteFiles} route file(s) from src/APIs/*/routes/*.js`
);

// ---------------------------------------------------------
// TMF-Aligned Gateway Routes
//
// Gateway forwards these paths to Billing Service :3006.
//
// TMF678 - Customer Bill Management
// TMF676 - Payment Management
// ---------------------------------------------------------

app.use('/tmf-api/customerBillManagement/v4', router);

app.use('/tmf-api/paymentManagement/v4', router);

// ---------------------------------------------------------
// Optional legacy/internal compatibility route
//
// Keep this temporarily if team members are already calling:
//
// http://localhost:3006/internal-api/billing/v1/...
//
// You can remove it later after all consumers use Gateway/TMF paths.
// ---------------------------------------------------------
app.use('/internal-api/billing/v1', router);

// ---------------------------------------------------------
// 404 Handler
// ---------------------------------------------------------
app.use((req, res) => {
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

  const message =
    err.publicMessage ||
    err.message ||
    'An unexpected error occurred.';

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