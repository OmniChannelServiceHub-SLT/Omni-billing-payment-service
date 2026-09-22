const express = require('express');

const auth = require('../../../middleware/auth.middleware');
const controller = require(
  '../controllers/updatePaymentLogsController'
);

const router = express.Router();

router.post(
  '/update-payment-logs',
  auth,
  controller.patchPaymentLogs
);

module.exports = router;