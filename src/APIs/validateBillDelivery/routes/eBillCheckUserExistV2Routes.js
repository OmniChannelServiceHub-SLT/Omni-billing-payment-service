const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/eBillCheckUserExistV2Controller');

const router = express.Router();
// A98: preserve the documented HTTP method and source endpoint.
router.get('/api/ebill/eBillCheckUserExistV2', auth, controller.validateBillDelivery);

module.exports = router;
