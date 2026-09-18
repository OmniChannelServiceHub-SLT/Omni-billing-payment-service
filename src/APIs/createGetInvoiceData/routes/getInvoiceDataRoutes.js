const express = require('express');

const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/getInvoiceDataController');

const router = express.Router();

router.get(
  '/invoice-data',
  auth,
  controller.createGetInvoiceData
);

module.exports = router;