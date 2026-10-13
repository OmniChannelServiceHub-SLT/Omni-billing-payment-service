const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/billStatusController');

const router = express.Router();
// A147: preserve the documented HTTP method and source endpoint.
router.get('/api/ebill/BillStatusRequest', auth, controller.retrieveBillAccount);

module.exports = router;
