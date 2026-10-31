const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/billPaymentController');

const router = express.Router();
// A28: preserve the documented HTTP method and source endpoint.
router.get('/api/AccountOMNI/BillPaymentRequest', auth, controller.retrieveBillingPayment);

// A28: SLT business route using the team URL convention; not a standard TMF resource.
router.get('/tmf-api/paymentManagement/v4/bill-payment', auth, controller.retrieveBillingPayment);

module.exports = router;

const {contractHandle,contractOne}=require('../../../middleware/response.util');
router.get('/tmf-api/paymentManagement/v4/bill-payment/:id',auth,contractHandle('retrieveBillingPayment',async(req,res)=>{const service=require('../services/billPaymentService');const data=await(async()=>{const [accountNo,telephoneNo]=req.params.id.split(':');return service.getPaymentSummary(telephoneNo,accountNo);})();return contractOne(res,req,data);}));
