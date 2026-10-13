const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/eBillStatusController');

const router = express.Router();
// A22: preserve the documented HTTP method and source endpoint.
router.get('/api/ebill/eBillStatusRequest', auth, controller.retrieveBillingRequest);

module.exports = router;
