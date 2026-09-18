// src/APIs/createSmartBillSendRequest/routes/smartBillSendRequestRoutes.js

const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/smartBillSendRequestController'
);

const router = express.Router();

router.post(
  '/smart-bill-send',
  auth,
  controller.createSmartBillSendRequest
);

module.exports = router;