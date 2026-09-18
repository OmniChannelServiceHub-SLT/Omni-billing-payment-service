const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/bulkUpdateInvoiceDataController'
);

const router = express.Router();

router.post(
  '/bulk-update-invoice-data',
  auth,
  controller.createBulkUpdateInvoiceData
);

module.exports = router;