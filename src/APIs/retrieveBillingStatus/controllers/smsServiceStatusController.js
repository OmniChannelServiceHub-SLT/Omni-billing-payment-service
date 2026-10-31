const service = require('../services/smsServiceStatusService');
const { success, failure, envelope, requiredInput } = require('../../../middleware/response.util');

async function retrieveBillingStatus(req, res) {
  try {
    const input = requiredInput(req.query, ["accountNo", "tpNo"]);
    const data = await service.getSMSServiceStatus(input.accountNo, input.tpNo);
    if (data === null) return failure(res, { status: 404, errorCode: 'E404', message: 'No matching SMS status was found.' });
    return success(res, { dataBundle: envelope({ isSuccess: true, dataBundle: data }) });
  } catch (error) {
    const status = error.status || 500;
    return failure(res, {
      status, errorCode: `E${status}`,
      message: error.status ? error.message : 'Request failed.',
    });
  }
}

module.exports = { retrieveBillingStatus };

const { contractHandle,contractOne,contractList }=require('../../../middleware/response.util');
module.exports.retrieveBillingStatus=contractHandle('retrieveBillingStatus',async(req,res)=>{const input=requiredInput(req.query,["accountNo", "tpNo"]);return contractOne(res,req,await service.statusResource(input.accountNo,input.tpNo));});
