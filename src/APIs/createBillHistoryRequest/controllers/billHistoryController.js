// Row #56 in Omni-Channel-API-Mapping-By-Service.xlsx
// Legacy source: AccountOMNI/BillHistoryRequest (GET)
// TMF API: TMF678 Customer Bill Management v4

const {
  success,
  failure,
} = require('../../../middleware/response.util');

const service = require('../services/billHistoryService');

/**
 * Retrieve bill-history records using telephoneNo and accountNo.
 */
async function createBillHistoryRequest(req, res) {
  try {
    const { telephoneNo, accountNo } = req.query;

    if (!telephoneNo || !accountNo) {
      return failure(res, {
        message: 'telephoneNo and accountNo are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const dataBundle = await service.getBillHistory(
      telephoneNo,
      accountNo
    );

    if (!dataBundle) {
      return failure(res, {
        message:
          `No bill history found for accountNo '${accountNo}'.`,
        errorCode: 'E404',
        status: 404,
      });
    }

    return success(res, {
      message: 'Bill history retrieved successfully.',
      dataBundle,
      status: 200,
    });
  } catch (error) {
    console.error(
      '[BillHistory] Failed to retrieve bill history:',
      error.message
    );

    return failure(res, {
      message: 'Failed to retrieve bill history.',
      errorCode: 'E500',
      exceptionDetail:
        process.env.NODE_ENV === 'production'
          ? null
          : error.message,
      status: 500,
    });
  }
}

module.exports = {
  createBillHistoryRequest,
};