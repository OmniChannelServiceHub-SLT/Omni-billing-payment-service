const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/saveInvoiceController');

const router = express.Router();
// A144: preserve the documented HTTP method and source endpoint.
router.post('/api/NewCon/SaveInvoiceData', auth, controller.createConnection);

// A144: SLT business route using the team URL convention; not a standard TMF resource.
router.post('/tmf-api/paymentManagement/v4/save-invoice', auth, controller.createConnection);

module.exports = router;


const { tmfRoutes } = require('../../../middleware/response.util');
router.use(["/tmf-api/customerBillManagement/v4"], tmfRoutes(express, auth, 'customerBillOnDemand', { list: controller.listTmfCustomerBillOnDemand, get: controller.getTmfCustomerBillOnDemand, create: controller.createTmfCustomerBillOnDemand }));

const {contractHandle,contractOne}=require('../../../middleware/response.util');
router.get('/tmf-api/paymentManagement/v4/save-invoice/:id',auth,contractHandle('createConnection',async(req,res)=>{const service=require('../services/saveInvoiceService');const data=await(async()=>{const row=await service.getInvoiceRecord(req.params.id);return row?service.invoiceResource(row):null;})();return contractOne(res,req,data);}));
