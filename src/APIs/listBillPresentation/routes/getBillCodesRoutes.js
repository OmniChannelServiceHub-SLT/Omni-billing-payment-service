const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/getBillCodesController');

const router = express.Router();
// A148: preserve the documented HTTP method and source endpoint.
router.get('/api/ebill/GetBillCodes', auth, controller.listBillPresentation);

module.exports = router;
