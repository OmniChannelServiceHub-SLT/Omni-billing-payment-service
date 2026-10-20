const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/viewTransactionsHistoryController');

const router = express.Router();
// A168: original source endpoint; interim and not TMF aligned.
router.get('/api/LTEPrepaid/viewTransactionsHistory', auth, controller.viewTransactionsHistory);

module.exports = router;
