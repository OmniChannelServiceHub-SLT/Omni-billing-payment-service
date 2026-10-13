const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/saveInvoiceController');

const router = express.Router();
// A144: preserve the documented HTTP method and source endpoint.
router.post('/api/NewCon/SaveInvoiceData', auth, controller.createConnection);

module.exports = router;
