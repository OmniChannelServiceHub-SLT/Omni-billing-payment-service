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

const {contractHandle,contractOne}=require('../../../middleware/response.util');
router.get('/tmf-api/customerBillManagement/v4/bill-detail/:id',auth,contractHandle('retrieveBilling',async(req,res)=>{const service=require('../services/billDetailService');const data=await(async()=>{const [accountNo,telephoneNo]=req.params.id.split(':');return service.getBillingSummary(telephoneNo,accountNo);})();return contractOne(res,req,data);}));
