const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/billStatusController');

const router = express.Router();
// A147: preserve the documented HTTP method and source endpoint.
router.get('/api/ebill/BillStatusRequest', auth, controller.retrieveBillAccount);

// A147: SLT business route using the team URL convention; not a standard TMF resource.
router.get('/tmf-api/customerBillManagement/v4/bill-status', auth, controller.retrieveBillAccount);

module.exports = router;
