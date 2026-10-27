const service = require('../services/updateSaveInvoiceService');
const { success, failure, requiredInput } = require('../../../middleware/response.util');

async function updateInvoiceData(req, res) {
  try {
    const input = requiredInput(req.query, ["REF_NO"]);
    const data = await service.updateInvoiceData(input);
    if (data === null) {
      return failure(res, { status: 404, errorCode: 'E404', message: 'No sample is available for this request.' });
    }
    res.set('X-Interim-Mode', 'mock');
    res.set('Cache-Control', 'no-store');
    return success(res, { dataBundle: data });
  } catch (error) {
    const status = error.status || 500;
    return failure(res, { status, errorCode: `E${status}`, message: error.status ? error.message : 'Request failed.' });
  }
}

module.exports = { updateInvoiceData };


const { contractOne,sltType,contractHandle }=require('../../../middleware/response.util');
module.exports.updateInvoiceTask=async (req,res)=>{
 const input=requiredInput(req.query,['REF_NO']);const result=await service.updateInvoiceData(input);
 if(result===null)throw Object.assign(new Error('No development sample matches this reference.'),{status:404});
 res.set('X-Interim-Mode','mock');res.set('Cache-Control','no-store');
 return contractOne(res,req,{...sltType('SLTInvoiceUpdateResult'),reference:input.REF_NO,mode:'mock',operationPerformed:false,state:'notPerformed',description:'Development acknowledgement only. No invoice was updated.'});
};


module.exports.updateInvoiceData=contractHandle('updateInvoiceData',module.exports.updateInvoiceTask);
