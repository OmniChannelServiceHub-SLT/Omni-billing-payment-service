// src/APIs/createSmartBillRegistrationSorce/controllers/smartBillRegistrationSorceController.js

const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/smartBillRegistrationSorceService'
);

const mapper = require(
  '../mappers/smartBillRegistrationSorceMapper'
);

function toBoolean(value) {
  if (typeof value === 'boolean') {
    return value;
  }

  return String(value).toLowerCase() === 'true';
}

/**
 * POST /smart-bill-registration-sorce
 *
 * Supports form-urlencoded and JSON request bodies.
 * Default response: TMF-aligned CustomerBill
 * x-response-format: legacy: compatibility response
 */
async function createSmartBillRegistrationSorce(
  req,
  res
) {
  try {
    const input = {
      ...req.query,
      ...req.body,
    };

    const {
      eventSource,
      accountNumber,
      billingContact,
      billHandingCode,
      sourceTypeId,
    } = input;

    if (
      !eventSource ||
      !accountNumber ||
      !billingContact ||
      !billHandingCode ||
      !sourceTypeId
    ) {
      return failure(res, {
        message:
          'eventSource, accountNumber, billingContact, billHandingCode and sourceTypeId are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const registrationData = {
      eventSource,
      accountNumber,
      billingContact,
      billHandingCode,
      sourceTypeId,
      isCustomerConfirmed:
        toBoolean(input.isCustomerConfirmed),
      isPrestigeCustomer:
        toBoolean(input.isPrestigeCustomer),
      registrationStatus: 'updated',
    };

    const record =
      await service.registerSmartBillSorce(
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
      '[SmartBillRegistrationSorce] Failed:',
      error.message
    );

    return failure(res, {
      message:
        'Failed to update Smart Bill registration source.',
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
  createSmartBillRegistrationSorce,
};