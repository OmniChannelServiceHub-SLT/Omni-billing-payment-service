const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/updateSaveInvoiceController');

const router = express.Router();
// A145: original source endpoint; interim and not TMF aligned.
router.post('/api/NewCon/UpdateInvoiceData', auth, controller.updateInvoiceData);

module.exports = router;
