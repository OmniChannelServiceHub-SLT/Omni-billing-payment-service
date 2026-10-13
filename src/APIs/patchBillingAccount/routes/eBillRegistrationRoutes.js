const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/eBillRegistrationController');

const router = express.Router();
// A21: preserve the documented HTTP method and source endpoint.
router.post('/api/ebill/eBillRegistration', auth, controller.patchBillingAccount);

module.exports = router;
