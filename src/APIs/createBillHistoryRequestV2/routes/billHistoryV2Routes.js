// src/APIs/createBillHistoryRequestV2/routes/billHistoryV2Routes.js

const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/billHistoryV2Controller'
);

const router = express.Router();

/**
 * TMF678 - Bill History Request V2
 *
 * GET /tmf-api/customerBillManagement/v4/bill-history-v2
 */
router.get(
  '/bill-history-v2',
  auth,
  controller.createBillHistoryRequestV2
);

module.exports = router;