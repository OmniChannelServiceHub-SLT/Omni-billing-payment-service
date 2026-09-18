// src/APIs/createSmartBillRegistration/routes/smartBillRegistrationRoutes.js

const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/smartBillRegistrationController'
);

const router = express.Router();

router.post(
  '/smart-bill-registration',
  auth,
  controller.createSmartBillRegistration
);

module.exports = router;