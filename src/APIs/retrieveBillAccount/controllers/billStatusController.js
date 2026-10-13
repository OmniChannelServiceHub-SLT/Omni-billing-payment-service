const service = require('../services/billStatusService');
const { success, failure, envelope, requiredInput } = require('../../../middleware/response.util');

async function retrieveBillAccount(req, res) {
  try {
    const input = requiredInput(req.query, ["accountNo", "tpNo"]);
    const data = await service.getBillStatus(input.accountNo, input.tpNo);
    if (!data) return failure(res, { status: 404, errorCode: 'E404', message: 'No matching bill status was found.' });
    return success(res, { dataBundle: data });
  } catch (error) {
    const status = error.status || 500;
    return failure(res, {
      status, errorCode: `E${status}`,
      message: error.status ? error.message : 'Request failed.',
    });
  }
}

module.exports = { retrieveBillAccount };
