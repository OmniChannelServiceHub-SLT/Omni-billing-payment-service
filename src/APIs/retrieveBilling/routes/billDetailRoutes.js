const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/billDetailController');

const router = express.Router();
// A14: preserve the documented HTTP method and source endpoint.
router.get('/api/AccountOMNI/BillDetailRequest', auth, controller.retrieveBilling);

module.exports = router;
