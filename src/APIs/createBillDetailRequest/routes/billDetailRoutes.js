// Row #50 in Omni-Channel-API-Mapping-By-Service.xlsx ("Billing and Payment Service" sheet)
// Legacy source: [AccountOMNI] "BillDetailRequest" (GET)
const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/billDetailController');

const router = express.Router();

router.get('/bill-detail', auth, controller.createBillDetailRequest);

module.exports = router;
