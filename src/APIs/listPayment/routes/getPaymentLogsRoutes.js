const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/getPaymentLogsController');

const router = express.Router();
// A114: preserve the documented HTTP method and source endpoint.
router.get('/api/NewCon/GetPaymentLogs', auth, controller.listPayment);

module.exports = router;
