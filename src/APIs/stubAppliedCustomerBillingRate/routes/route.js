const express = require('express');

const controller = require(
  '../controllers/controller'
);

const router = express.Router();

router.get(
  '/appliedCustomerBillingRate',
  controller.listAppliedCustomerBillingRates
);

router.get(
  '/appliedCustomerBillingRate/:id',
  controller.retrieveAppliedCustomerBillingRate
);

module.exports = router;