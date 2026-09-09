// src/APIs/createBillPaymentRequest/controllers/billPaymentController.js

const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/billPaymentService'
);

const mapper = require(
  '../mappers/billPaymentMapper'
);

/**
 * GET /bill-payment
 *
 * Default response: TMF676 Payment
 * x-response-format: legacy: Excel sheet 28 response
 */
async function createBillPaymentRequest(
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

    const record = await service.getBillPayment(
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
      '[BillPayment] Failed to retrieve payment:',
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
  createBillPaymentRequest,
};