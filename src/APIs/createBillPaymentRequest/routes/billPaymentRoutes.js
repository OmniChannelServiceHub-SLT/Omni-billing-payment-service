// Row #58 in Omni-Channel-API-Mapping-By-Service.xlsx ("Billing and Payment Service" sheet)
// Legacy source: [AccountOMNI] "BillPaymentRequest" (GET)
const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/billPaymentController');

const router = express.Router();

router.get('/bill-payment', auth, controller.createBillPaymentRequest);

module.exports = router;
