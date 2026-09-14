// src/APIs/createEBillCheckUserExist/routes/eBillCheckUserExistRoutes.js

const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/eBillCheckUserExistController'
);

const router = express.Router();

/**
 * eBill Check User Exist
 *
 * GET /tmf-api/customerBillManagement/v4/ebill-check-user-exist
 */
router.get(
  '/ebill-check-user-exist',
  auth,
  controller.createEBillCheckUserExist
);

module.exports = router;