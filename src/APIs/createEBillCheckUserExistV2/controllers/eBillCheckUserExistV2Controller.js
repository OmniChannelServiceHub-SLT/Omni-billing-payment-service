// src/APIs/createEBillCheckUserExistV2/controllers/eBillCheckUserExistV2Controller.js

const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/eBillCheckUserExistV2Service'
);

const mapper = require(
  '../mappers/eBillCheckUserExistV2Mapper'
);

/**
 * GET /ebill-check-user-exist-v2
 *
 * Default response: TMF-aligned CustomerBill
 * x-response-format: legacy: Excel sheet 24 response
 */
async function createEBillCheckUserExistV2(req, res) {
  try {
    const {
      accountNo,
      tpNo,
      econtact,
      econtactType,
    } = req.query;

    if (
      !accountNo ||
      !tpNo ||
      !econtact ||
      !econtactType
    ) {
      return failure(res, {
        message:
          'accountNo, tpNo, econtact and econtactType are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const record =
      await service.checkEBillUserExistV2(
        accountNo,
        tpNo,
        econtact,
        econtactType
      );

    if (!record) {
      return failure(res, {
        message:
          `No eBill V2 user-check record found for accountNo '${accountNo}'.`,
        errorCode: 'E404',
        status: 404,
      });
    }

    const responseFormat = (
      req.get('x-response-format') || ''
    ).toLowerCase();

    if (responseFormat === 'legacy') {
      const message =
        record.responseMessage ||
        'New User,OTP Sent';

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
      '[EBillCheckUserExistV2] Failed to check user:',
      error.message
    );

    return failure(res, {
      message: 'Failed to check eBill V2 user.',
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
  createEBillCheckUserExistV2,
};