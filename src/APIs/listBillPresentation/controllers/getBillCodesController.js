const service = require('../services/getBillCodesService');
const { success, failure, envelope, requiredInput } = require('../../../middleware/response.util');

async function listBillPresentation(req, res) {
  try {
    const input = requiredInput(req.query, []);
    const records = await service.getBillCodes();
    return success(res, { dataBundle: records.map(record => ({
      bilL_HANDLING_CODE: record.billCode,
      bilL_HANDLING_CODE_NAME: record.billCodeName,
      bilL_HANDLING_CODE_DESC: record.billCodeDescription,
    })) });
  } catch (error) {
    const status = error.status || 500;
    return failure(res, {
      status, errorCode: `E${status}`,
      message: error.status ? error.message : 'Request failed.',
    });
  }
}

module.exports = { listBillPresentation };
