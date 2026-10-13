const service = require('../services/billDetailService');
const { success, failure, envelope, requiredInput } = require('../../../middleware/response.util');

async function retrieveBilling(req, res) {
  try {
    const input = requiredInput(req.query, ["telephoneNo", "accountNo"]);
    const data = await service.getBillDetail(input.telephoneNo, input.accountNo);
    if (!data) return failure(res, { status: 404, errorCode: 'E404', message: 'No matching billing record was found.' });
    return success(res, { dataBundle: data });
  } catch (error) {
    const status = error.status || 500;
    return failure(res, {
      status, errorCode: `E${status}`,
      message: error.status ? error.message : 'Request failed.',
    });
  }
}

module.exports = { retrieveBilling };
