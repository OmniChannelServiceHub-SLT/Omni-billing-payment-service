// src/APIs/createEBillCheckUserExistV2/routes/eBillCheckUserExistV2Routes.js

const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/eBillCheckUserExistV2Controller'
);

const router = express.Router();

/**
 * eBill Check User Exist V2
 *
 * GET /tmf-api/customerBillManagement/v4/ebill-check-user-exist-v2
 */
router.get(
  '/ebill-check-user-exist-v2',
  auth,
  controller.createEBillCheckUserExistV2
);

module.exports = router;