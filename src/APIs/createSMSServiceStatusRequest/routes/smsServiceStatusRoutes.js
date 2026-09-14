// src/APIs/createSMSServiceStatusRequest/routes/smsServiceStatusRoutes.js

const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/smsServiceStatusController'
);

const router = express.Router();

/**
 * SMS Service Status Request
 *
 * GET /tmf-api/customerBillManagement/v4/sms-service-status
 */
router.get(
  '/sms-service-status',
  auth,
  controller.createSMSServiceStatusRequest
);

module.exports = router;