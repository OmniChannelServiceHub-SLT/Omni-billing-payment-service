// src/APIs/createEBillStatusRequest/routes/eBillStatusRoutes.js

const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/eBillStatusController'
);

const router = express.Router();

/**
 * eBill Status Request
 *
 * TMF678 - Customer Bill Management API
 *
 * GET /tmf-api/customerBillManagement/v4/ebill-status
 */
router.get(
  '/ebill-status',
  auth,
  controller.createEBillStatusRequest
);

module.exports = router;