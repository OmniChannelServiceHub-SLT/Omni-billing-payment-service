const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/smartBillRegistrationSorceController'
);

const router = express.Router();

router.post(
  '/smart-bill-registration-sorce',
  auth,
  controller.createSmartBillRegistrationSorce
);

module.exports = router;