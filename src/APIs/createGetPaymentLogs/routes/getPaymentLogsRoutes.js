const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/getPaymentLogsController');

const router = express.Router();

router.get(
  '/payment-logs',
  auth,
  controller.createGetPaymentLogs
);

module.exports = router;