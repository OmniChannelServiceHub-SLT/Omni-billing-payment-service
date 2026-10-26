const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/billDetailController');

const router = express.Router();
// A14: preserve the documented HTTP method and source endpoint.
router.get('/api/AccountOMNI/BillDetailRequest', auth, controller.retrieveBilling);

// A14: SLT business route using the team URL convention; not a standard TMF resource.
router.get('/tmf-api/customerBillManagement/v4/bill-detail', auth, controller.retrieveBilling);

module.exports = router;


const { tmfRoutes } = require('../../../middleware/response.util');
router.use(["/tmf-api/customerBillManagement/v4"], tmfRoutes(express, auth, 'appliedCustomerBillingRate', { list: controller.listTmfAppliedCustomerBillingRate, get: controller.getTmfAppliedCustomerBillingRate }));
