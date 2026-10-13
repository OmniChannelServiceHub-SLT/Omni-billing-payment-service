const service = require('../services/eBillStatusService');
const { success, failure, envelope, requiredInput } = require('../../../middleware/response.util');

async function retrieveBillingRequest(req, res) {
  try {
    const input = requiredInput(req.query, ["accountNo", "tpNo"]);
    const data = await service.getEBillStatus(input.accountNo, input.tpNo);
    if (!data) return failure(res, { status: 404, errorCode: 'E404', message: 'No matching eBill status was found.' });
    return success(res, { dataBundle: [data] });
  } catch (error) {
    const status = error.status || 500;
    return failure(res, {
      status, errorCode: `E${status}`,
      message: error.status ? error.message : 'Request failed.',
    });
  }
}

module.exports = { retrieveBillingRequest };
