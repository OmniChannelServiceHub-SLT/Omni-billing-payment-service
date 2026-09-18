// src/APIs/createEBillResendRequest/controllers/eBillResendRequestController.js

const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/eBillResendRequestService'
);

const mapper = require(
  '../mappers/eBillResendRequestMapper'
);

/**
 * POST /ebill-resend
 *
 * Default response: TMF-aligned CustomerBill
 * x-response-format: legacy: compatibility response
 */
async function createEBillResendRequest(
  req,
  res
) {
  try {
    const input = {
      ...req.query,
      ...req.body,
    };

    const {
      eContact,
      accountNo,
      ebillMonth,
      tpNo,
    } = input;

    if (
      !eContact ||
      !accountNo ||
      !ebillMonth ||
      !tpNo
    ) {
      return failure(res, {
        message:
          'eContact, accountNo, ebillMonth and tpNo are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const record =
      await service.resendEBill({
        eContact,
        accountNo,
        ebillMonth,
        tpNo,
        resendStatus: 'sent',
      });

    const responseFormat = (
      req.get('x-response-format') || ''
    ).toLowerCase();

    if (responseFormat === 'legacy') {
      const message = 'Successfully Sent.';

      return res.status(200).json({
        isSuccess: true,
        errorMessege: message,
        exceptionDetail: null,
        dataBundle:
          mapper.toLegacyDataBundle(record),
        errorShow: message,
        errorCode: null,
      });
    }

    return res
      .status(200)
      .json(mapper.toTmfCustomerBill(record));
  } catch (error) {
    console.error(
      '[EBillResendRequest] Failed:',
      error.message
    );

    return failure(res, {
      message:
        'Failed to resend the E-Bill.',
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
  createEBillResendRequest,
};