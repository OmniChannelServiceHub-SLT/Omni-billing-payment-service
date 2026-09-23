const express = require('express');

const controller = require(
  '../controllers/controller'
);

const router = express.Router();

router.post(
  '/customerBillOnDemand',
  controller.createCustomerBillOnDemand
);

router.get(
  '/customerBillOnDemand',
  controller.listCustomerBillOnDemand
);

router.get(
  '/customerBillOnDemand/:id',
  controller.retrieveCustomerBillOnDemand
);

module.exports = router;