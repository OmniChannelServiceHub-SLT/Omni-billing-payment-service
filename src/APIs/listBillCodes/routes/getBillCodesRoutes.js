// src/APIs/listBillCodes/routes/getBillCodesRoutes.js

const express = require('express');

const auth = require(
  '../../../middleware/auth.middleware'
);

const controller = require(
  '../controllers/getBillCodesController'
);

const router = express.Router();

router.get(
  '/bill-codes',
  auth,
  controller.listBillCodes
);

module.exports = router;