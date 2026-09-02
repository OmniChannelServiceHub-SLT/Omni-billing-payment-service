// src/APIs/createBillDetailRequest/controllers/billDetailController.js

const { success, failure } = require(
  '../../../middleware/response.util'
);

const service = require(
  '../services/billDetailService'
);

/**
 * Bill Detail Request
 *
 * Row #50 in Omni-Channel-API-Mapping-By-Service.xlsx
 * Legacy API: AccountOMNI/BillDetailRequest
 * TMF API: TMF678 Customer Bill Management v4
 */
async function createBillDetailRequest(req, res) {
  try {
    const { telephoneNo, accountNo } = req.query;

    // Validate required query parameters
    if (!telephoneNo || !accountNo) {
      return failure(res, {
        message: 'telephoneNo and accountNo are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    // Find bill details from Billing database
    const dataBundle = await service.getBillDetail(
      telephoneNo,
      accountNo
    );

    // No matching bill
    if (!dataBundle) {
      return failure(res, {
        message: `No bill found for accountNo '${accountNo}'.`,
        errorCode: 'E404',
        status: 404,
      });
    }

    // BillDetail is a GET request, therefore return 200
    return success(res, {
      message: 'Bill details retrieved successfully.',
      dataBundle,
      status: 200,
    });
  } catch (error) {
    console.error(
      '[BillDetail] Failed to retrieve bill details:',
      error.message
    );

    return failure(res, {
      message: 'Failed to retrieve bill details.',
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
  createBillDetailRequest,
};