// src/APIs/createBillStatusRequest/routes/billStatusRoutes.js

const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/billStatusController'
);

const router = express.Router();

/**
 * Bill Status Request
 *
 * TMF678 - Customer Bill Management API
 *
 * GET /tmf-api/customerBillManagement/v4/bill-status
 */
router.get(
  '/bill-status',
  auth,
  controller.createBillStatusRequest
);

module.exports = router;