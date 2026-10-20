const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/getWalletDetailController');

const router = express.Router();
// A158: original source endpoint; interim and not TMF aligned.
router.get('/api/LTEPrepaid/GetWalletDetail', auth, controller.getWalletDetail);

module.exports = router;
