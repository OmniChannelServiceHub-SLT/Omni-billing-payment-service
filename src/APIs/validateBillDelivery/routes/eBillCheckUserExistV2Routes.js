const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/eBillCheckUserExistV2Controller');

const router = express.Router();
// A98: preserve the documented HTTP method and source endpoint.
router.get('/api/ebill/eBillCheckUserExistV2', auth, controller.validateBillDelivery);

// A98: SLT business route using the team URL convention; not a standard TMF resource.
router.get('/tmf-api/customerBillManagement/v4/ebill-check-user-exist-v2', auth, controller.validateBillDelivery);

module.exports = router;
