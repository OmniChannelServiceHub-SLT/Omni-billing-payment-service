// src/APIs/createEBillResendRequest/routes/eBillResendRequestRoutes.js

const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/eBillResendRequestController'
);

const router = express.Router();

router.post(
  '/ebill-resend',
  auth,
  controller.createEBillResendRequest
);

module.exports = router;