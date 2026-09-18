const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/updateSaveInvoiceController'
);

const router = express.Router();

router.post(
  '/update-save-invoice',
  auth,
  controller.createUpdateSaveInvoice
);

module.exports = router;