const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/billPaymentController');

const router = express.Router();
// A28: preserve the documented HTTP method and source endpoint.
router.get('/api/AccountOMNI/BillPaymentRequest', auth, controller.retrieveBillingPayment);

module.exports = router;
