// src/APIs/createEBillRegistration/routes/eBillRegistrationRoutes.js

const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/eBillRegistrationController'
);

const router = express.Router();

/**
 * eBill Registration
 *
 * POST /tmf-api/customerBillManagement/v4/ebill-registration
 */
router.post(
  '/ebill-registration',
  auth,
  controller.createEBillRegistration
);

module.exports = router;