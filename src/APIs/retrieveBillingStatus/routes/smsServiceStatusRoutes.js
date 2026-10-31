const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/smsServiceStatusController');

const router = express.Router();
// A23: preserve the documented HTTP method and source endpoint.
router.get('/api/ebill/SMSServiceStatusRequest', auth, controller.retrieveBillingStatus);

// A23: SLT business route using the team URL convention; not a standard TMF resource.
router.get('/tmf-api/customerBillManagement/v4/sms-service-status', auth, controller.retrieveBillingStatus);

module.exports = router;
