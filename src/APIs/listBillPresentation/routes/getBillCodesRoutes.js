const express = require('express');
const auth = require('../../../middleware/auth.middleware');
const controller = require('../controllers/getBillCodesController');

const router = express.Router();
// A148: preserve the documented HTTP method and source endpoint.
router.get('/api/ebill/GetBillCodes', auth, controller.listBillPresentation);

// A148: SLT business route using the team URL convention; not a standard TMF resource.
router.get('/tmf-api/customerBillManagement/v4/bill-codes', auth, controller.listBillPresentation);

module.exports = router;

const {contractHandle,contractOne}=require('../../../middleware/response.util');
router.get('/tmf-api/customerBillManagement/v4/bill-codes/:id',auth,contractHandle('listBillPresentation',async(req,res)=>{const service=require('../services/getBillCodesService');const data=await(async()=>{return service.mediaGet(req.params.id);})();return contractOne(res,req,data);}));
