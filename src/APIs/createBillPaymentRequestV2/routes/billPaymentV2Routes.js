// src/APIs/createBillPaymentRequestV2/routes/billPaymentV2Routes.js

const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/billPaymentV2Controller'
);

const router = express.Router();

/**
 * Bill Payment Request V2
 *
 * TMF676 - Payment Management API
 *
 * GET /tmf-api/paymentManagement/v4/bill-payment-v2
 */
router.get(
  '/bill-payment-v2',
  auth,
  controller.createBillPaymentRequestV2
);

module.exports = router;