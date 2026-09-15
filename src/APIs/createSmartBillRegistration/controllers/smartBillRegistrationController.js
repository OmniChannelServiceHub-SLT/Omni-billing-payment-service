// src/APIs/createSmartBillRegistration/controllers/smartBillRegistrationController.js

const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/smartBillRegistrationService'
);

const mapper = require(
  '../mappers/smartBillRegistrationMapper'
);

/**
 * POST /smart-bill-registration
 *
 * Default response: TMF-aligned CustomerBill
 * x-response-format: legacy: compatibility response
 */
async function createSmartBillRegistration(
  req,
  res
) {
  try {
    const input = {
      ...req.query,
      ...req.body,
    };

    const {
      tpNo,
      accountNo,
      econtact,
      billCode,
    } = input;

    if (
      !tpNo ||
      !accountNo ||
      !econtact ||
      !billCode
    ) {
      return failure(res, {
        message:
          'tpNo, accountNo, econtact and billCode are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const record =
      await service.registerSmartBill({
        tpNo,
        accountNo,
        econtact,
        billCode,
        registrationStatus: 'updated',
      });

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
      '[SmartBillRegistration] Failed:',
      error.message
    );

    return failure(res, {
      message:
        'Failed to update Smart Bill registration.',
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
  createSmartBillRegistration,
};