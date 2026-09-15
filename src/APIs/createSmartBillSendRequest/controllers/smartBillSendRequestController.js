// src/APIs/createSmartBillSendRequest/controllers/smartBillSendRequestController.js

const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/smartBillSendRequestService'
);

const mapper = require(
  '../mappers/smartBillSendRequestMapper'
);

function toBoolean(value) {
  if (typeof value === 'boolean') {
    return value;
  }

  return String(value).toLowerCase() === 'true';
}

/**
 * POST /smart-bill-send
 *
 * Default response: TMF-aligned CustomerBill
 * x-response-format: legacy: compatibility response
 */
async function createSmartBillSendRequest(
  req,
  res
) {
  try {
    const input = {
      ...req.query,
      ...req.body,
    };

    const {
      accountNo,
      billRequestingMonth,
    } = input;

    if (!accountNo || !billRequestingMonth) {
      return failure(res, {
        message:
          'accountNo and billRequestingMonth are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const requestData = {
      tpNo: input.tpNo || '',
      accountNo,
      econtact: input.econtact || '',
      billCode: input.billCode || '',
      isEnableSms:
        toBoolean(input.isEnableSms),
      isAlreadyRegistered:
        toBoolean(input.isAlreadyRegistered),
      isPrestigeCustomer:
        toBoolean(input.isPrestigeCustomer),
      billRequestingMonth,
      requestStatus: 'sent',
    };

    const record =
      await service.sendSmartBill(requestData);

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
      '[SmartBillSendRequest] Failed:',
      error.message
    );

    return failure(res, {
      message:
        'Failed to send Smart Bill request.',
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
  createSmartBillSendRequest,
};