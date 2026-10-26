const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/billHistoryV2Controller');

const router = express.Router();

// Accept the service path and the /slt/ext prefix captured in the source URL.
router.get(
  ['/api/AccountOMNI/BillHistoryRequestV2', '/slt/ext/api/AccountOMNI/BillHistoryRequestV2'],
  auth,
  controller.listCustomerBill
);

// A90: SLT business route using the team URL convention; not a standard TMF resource.
router.get('/tmf-api/customerBillManagement/v4/bill-history-v2', auth, controller.listCustomerBill);

module.exports = router;


const { tmfRoutes } = require('../../../middleware/response.util');
router.use(["/tmf-api/customerBillManagement/v4"], tmfRoutes(express, auth, 'customerBill', { list: controller.listTmfCustomerBill, get: controller.getTmfCustomerBill, patch: controller.patchTmfCustomerBill }));
