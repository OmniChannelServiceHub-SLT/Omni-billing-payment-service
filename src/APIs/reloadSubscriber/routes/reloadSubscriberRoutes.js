const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/reloadSubscriberController');

const router = express.Router();
// A166: original source endpoint; interim and not TMF aligned.
router.post('/api/LTEPrepaid/reloadSubscriber', auth, controller.reloadSubscriber);

module.exports = router;
