// src/APIs/createBillStatusRequest/controllers/billStatusController.js

const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/billStatusService'
);

const mapper = require(
  '../mappers/billStatusMapper'
);

/**
 * GET /bill-status
 *
 * Default response: TMF678-aligned CustomerBill
 * x-response-format: legacy: Excel sheet 147 response
 */
async function createBillStatusRequest(
  req,
  res
) {
  try {
    const { accountNo, tpNo } = req.query;

    if (!accountNo || !tpNo) {
      return failure(res, {
        message:
          'accountNo and tpNo are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const record = await service.getBillStatus(
      accountNo,
      tpNo
    );

    if (!record) {
      return failure(res, {
        message:
          `No bill status found for accountNo '${accountNo}'.`,
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
          mapper.toLegacyDataBundle(record),
        errorShow: null,
        errorCode: null,
      });
    }

    return res
      .status(200)
      .json(mapper.toTmfCustomerBill(record));
  } catch (error) {
    console.error(
      '[BillStatus] Failed to retrieve status:',
      error.message
    );

    return failure(res, {
      message:
        'Failed to retrieve bill status.',
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
  createBillStatusRequest,
};