// src/APIs/createEBillDownloadRequest/routes/eBillDownloadRequestRoutes.js

const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/eBillDownloadRequestController'
);

const router = express.Router();

router.get(
  '/ebill-download',
  auth,
  controller.createEBillDownloadRequest
);

module.exports = router;