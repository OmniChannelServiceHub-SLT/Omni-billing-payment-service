const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/eBillRegistrationController');

const router = express.Router();
// A21: preserve the documented HTTP method and source endpoint.
router.post('/api/ebill/eBillRegistration', auth, controller.patchBillingAccount);

// A21: SLT business route using the team URL convention; not a standard TMF resource.
router.post('/tmf-api/customerBillManagement/v4/ebill-registration', auth, controller.patchBillingAccount);

module.exports = router;
