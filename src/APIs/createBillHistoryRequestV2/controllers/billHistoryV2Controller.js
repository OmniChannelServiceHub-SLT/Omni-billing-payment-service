// src/APIs/createBillHistoryRequestV2/controllers/billHistoryV2Controller.js

const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/billHistoryV2Service'
);

const mapper = require(
  '../mappers/billHistoryV2Mapper'
);

/**
 * GET /bill-history-v2
 *
 * Without x-response-format: TMF-aligned response
 * With x-response-format: legacy: Excel sheet 90 response
 */
async function createBillHistoryRequestV2(
  req,
  res
) {
  try {
    const { telephoneNo, accountNo } = req.query;

    if (!telephoneNo || !accountNo) {
      return failure(res, {
        message:
          'telephoneNo and accountNo are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const records = await service.getBillHistoryV2(
      telephoneNo,
      accountNo
    );

    if (!records) {
      return failure(res, {
        message:
          `No bill history V2 found for accountNo '${accountNo}'.`,
        errorCode: 'E404',
        status: 404,
      });
    }

    const responseFormat = (
      req.get('x-response-format') || ''
    ).toLowerCase();

    if (responseFormat === 'legacy') {
      return res.status(200).json({
        isSuccess: true,
        errorMessege: null,
        exceptionDetail: null,
        dataBundle:
          mapper.toLegacyDataBundle(records),
        errorShow: null,
        errorCode: null,
      });
    }

    return res
      .status(200)
      .json(mapper.toTmfResponse(records));
  } catch (error) {
    console.error(
      '[BillHistoryV2] Failed to retrieve history:',
      error.message
    );

    return failure(res, {
      message:
        'Failed to retrieve bill history V2.',
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
  createBillHistoryRequestV2,
};