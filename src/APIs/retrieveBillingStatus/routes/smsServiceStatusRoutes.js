const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/smsServiceStatusController');

const router = express.Router();
// A23: preserve the documented HTTP method and source endpoint.
router.get('/api/ebill/SMSServiceStatusRequest', auth, controller.retrieveBillingStatus);

module.exports = router;
