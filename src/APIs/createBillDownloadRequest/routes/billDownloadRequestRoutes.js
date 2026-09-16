// src/APIs/createBillDownloadRequest/routes/billDownloadRequestRoutes.js

const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/billDownloadRequestController'
);

const router = express.Router();

router.get(
  '/bill-download',
  auth,
  controller.createBillDownloadRequest
);

module.exports = router;