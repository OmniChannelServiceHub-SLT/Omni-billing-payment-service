// src/APIs/createBillPaymentRequestV2/controllers/billPaymentV2Controller.js

const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/billPaymentV2Service'
);

const mapper = require(
  '../mappers/billPaymentV2Mapper'
);

/**
 * GET /bill-payment-v2
 *
 * Default response: TMF676 Payment
 * x-response-format: legacy: closest available
 * BillPaymentRequest response from Excel sheet 28
 */
async function createBillPaymentRequestV2(
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

    const record =
      await service.getBillPaymentV2(
        telephoneNo,
        accountNo
      );

    if (!record) {
      return failure(res, {
        message:
          `No payment/billing record found for accountNo '${accountNo}'.`,
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
      .json(mapper.toTmfPayment(record));
  } catch (error) {
    console.error(
      '[BillPaymentV2] Failed to retrieve payment:',
      error.message
    );

    return failure(res, {
      message:
        'Failed to retrieve payment information.',
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
  createBillPaymentRequestV2,
};