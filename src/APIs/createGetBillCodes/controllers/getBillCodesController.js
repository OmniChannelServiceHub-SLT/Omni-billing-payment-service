// src/APIs/createGetBillCodes/controllers/getBillCodesController.js

const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/getBillCodesService'
);

const mapper = require(
  '../mappers/getBillCodesMapper'
);

/**
 * GET /bill-codes
 *
 * Default response: TMF-aligned characteristics
 * x-response-format: legacy: source response
 */
async function createGetBillCodes(req, res) {
  try {
    const records =
      await service.getBillCodes();

    if (!records.length) {
      return failure(res, {
        message: 'No active bill codes found.',
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
      .json(mapper.toTmfBillCodes(records));
  } catch (error) {
    console.error(
      '[GetBillCodes] Failed:',
      error.message
    );

    return failure(res, {
      message:
        'Failed to retrieve bill codes.',
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
  createGetBillCodes,
};