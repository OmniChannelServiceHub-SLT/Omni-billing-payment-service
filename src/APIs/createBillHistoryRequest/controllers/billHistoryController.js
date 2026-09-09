// src/APIs/createBillHistoryRequest/controllers/billHistoryController.js

// Row #56 in Omni-Channel-API-Mapping-By-Service.xlsx
// Legacy source: AccountOMNI/BillHistoryRequest (GET)
// TMF API: TMF678 Customer Bill Management v4

const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/billHistoryService'
);

const mapper = require(
  '../mappers/billHistoryMapper'
);

/**
 * Check whether the client requested the
 * original SLTOMNI response format.
 */
function isLegacyResponse(req) {
  return String(
    req.headers['x-response-format'] || ''
  )
    .trim()
    .toLowerCase() === 'legacy';
}

/**
 * Retrieve bill-history records using
 * telephoneNo and accountNo.
 *
 * GET /bill-history
 */
async function createBillHistoryRequest(
  req,
  res
) {
  try {
    const { telephoneNo, accountNo } =
      req.query;

    if (!telephoneNo || !accountNo) {
      return failure(res, {
        message:
          'telephoneNo and accountNo are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const billHistoryRecords =
      await service.getBillHistory(
        telephoneNo,
        accountNo
      );

    if (!billHistoryRecords) {
      return failure(res, {
        message:
          `No bill history found for accountNo '${accountNo}'.`,
        errorCode: 'E404',
        status: 404,
      });
    }

    /*
     * Original response from
     * API_Params_SLTOMNI_V2.0 sheet "17".
     */
    if (isLegacyResponse(req)) {
      return res.status(200).json({
        isSuccess: true,
        errorMessege: null,
        exceptionDetail: null,

        dataBundle:
          mapper.mapToLegacyResponse(
            billHistoryRecords
          ),

        errorShow: null,
        errorCode: null,
      });
    }

    /*
     * Default TMF678 response.
     * CTK requests must not include
     * x-response-format: legacy.
     */
    const tmfResponse =
      mapper.mapToTmfResponse(
        billHistoryRecords
      );

    return res
      .status(200)
      .json(tmfResponse);
  } catch (error) {
    console.error(
      '[BillHistory] Failed to retrieve bill history:',
      error.message
    );

    return failure(res, {
      message:
        'Failed to retrieve bill history.',
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