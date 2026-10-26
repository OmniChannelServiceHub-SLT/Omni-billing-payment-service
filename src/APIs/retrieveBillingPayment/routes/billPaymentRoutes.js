const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/billPaymentController');

const router = express.Router();
// A28: preserve the documented HTTP method and source endpoint.
router.get('/api/AccountOMNI/BillPaymentRequest', auth, controller.retrieveBillingPayment);

// A28: SLT business route using the team URL convention; not a standard TMF resource.
router.get('/tmf-api/paymentManagement/v4/bill-payment', auth, controller.retrieveBillingPayment);

module.exports = router;
