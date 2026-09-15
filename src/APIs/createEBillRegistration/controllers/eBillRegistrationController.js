// src/APIs/createEBillRegistration/controllers/eBillRegistrationController.js

const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/eBillRegistrationService'
);

const mapper = require(
  '../mappers/eBillRegistrationMapper'
);

function toBoolean(value) {
  if (typeof value === 'boolean') {
    return value;
  }

  return String(value).toLowerCase() === 'true';
}

/**
 * POST /ebill-registration
 *
 * Supports query parameters and JSON request bodies.
 * Default response: TMF-aligned CustomerBill
 * x-response-format: legacy: Excel sheet 21 response
 */
async function createEBillRegistration(req, res) {
  try {
    const input = {
      ...req.query,
      ...req.body,
    };

    const {
      eventSource,
      accountNumber,
    } = input;

    if (!eventSource || !accountNumber) {
      return failure(res, {
        message:
          'eventSource and accountNumber are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const registrationData = {
      eventSource,
      newEmailAddress:
        input.newEmailAddress || '',
      newContactNumber:
        input.newContactNumber || '',
      accountNumber,
      isEnableSms:
        toBoolean(input.isEnableSms),
      isAlreadyRegistered:
        toBoolean(input.isAlreadyRegistered),
      isPrestigeCustomer:
        toBoolean(input.isPrestigeCustomer),
      registrationStatus: 'updated',
    };

    const record = await service.registerEBill(
      registrationData
    );

    const responseFormat = (
      req.get('x-response-format') || ''
    ).toLowerCase();

    if (responseFormat === 'legacy') {
      const message = 'Successfully Updated.';

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
      '[EBillRegistration] Failed to register:',
      error.message
    );

    return failure(res, {
      message: 'Failed to update eBill registration.',
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
  createEBillRegistration,
};