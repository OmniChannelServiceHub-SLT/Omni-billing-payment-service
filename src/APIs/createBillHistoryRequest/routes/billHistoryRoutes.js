// Row #56 in Omni-Channel-API-Mapping-By-Service.xlsx ("Billing and Payment Service" sheet)
// Legacy source: [AccountOMNI] "BillHistoryRequest" (GET)
const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/billHistoryController');

const router = express.Router();

router.get('/bill-history', auth, controller.createBillHistoryRequest);

module.exports = router;
