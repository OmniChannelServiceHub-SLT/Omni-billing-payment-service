const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/saveInvoiceController'
);

const router = express.Router();

router.post(
  '/save-invoice',
  auth,
  controller.createInvoice
);

module.exports = router;