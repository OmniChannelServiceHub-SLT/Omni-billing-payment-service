// Row #56 in Omni-Channel-API-Mapping-By-Service.xlsx ("Billing and Payment Service" sheet)
// Legacy source: [AccountOMNI] "BillHistoryRequest" (GET)
// Proposed TMF-Aligned Method Name: createBillHistoryRequest
const { success, failure } = require('../../../middleware/response.util');
const service = require('../services/billHistoryService');

async function createBillHistoryRequest(req, res) {
  try {
    const { telephoneNo, accountNo } = req.query;

    if (!telephoneNo || !accountNo) {
      return failure(res, { message: 'telephoneNo and accountNo are required.', errorCode: 'E400', status: 400 });
    }

    const dataBundle = await service.getBillHistory(telephoneNo, accountNo);

    if (!dataBundle) {
      return failure(res, { message: `No bill history found for accountNo '${accountNo}'`, errorCode: 'E404', status: 404 });
    }

    return success(res, { message: 'createBillHistoryRequest OK', dataBundle });
  } catch (err) {
    return failure(res, { message: err.message, errorCode: 'E500', status: 500 });
  }
}

module.exports = { createBillHistoryRequest };
