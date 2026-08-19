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
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(morgan('combined'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'omnichannel-billing-payment-service', port: Number(process.env.PORT || 3006) });
});

// Auto-mount every src/APIs/<tmfApiName>/routes/*.js file. Each API folder
// is self-contained (controllers/routes/services), matching the team's
// agreed convention (see Omni-usage-management-service).
const apisDir = path.join(__dirname, 'APIs');
const router = express.Router();

for (const apiFolder of fs.readdirSync(apisDir)) {
  const routesDir = path.join(apisDir, apiFolder, 'routes');
  if (!fs.existsSync(routesDir)) continue;

  for (const file of fs.readdirSync(routesDir)) {
    if (!file.endsWith('.js')) continue;
    // eslint-disable-next-line global-require, import/no-dynamic-require
    router.use(require(path.join(routesDir, file)));
  }
}

app.use('/internal-api/billing/v1', router);

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

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error('[Billing]', err.stack || err.message);
  res.status(err.status || 500).json({
    isSuccess: false,
    errorMessege: err.publicMessage || 'An unexpected error occurred.',
    exceptionDetail: process.env.NODE_ENV === 'production' ? null : err.message,
    dataBundle: null,
    errorShow: err.publicMessage || 'An unexpected error occurred.',
    errorCode: err.code || 'E500',
  });
});

module.exports = app;
