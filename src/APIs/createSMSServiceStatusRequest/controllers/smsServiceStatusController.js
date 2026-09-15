// src/APIs/createSMSServiceStatusRequest/controllers/smsServiceStatusController.js

const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/smsServiceStatusService'
);

const mapper = require(
  '../mappers/smsServiceStatusMapper'
);

/**
 * GET /sms-service-status
 *
 * Default response: TMF-aligned CustomerBill
 * x-response-format: legacy: Excel sheet 23 response
 */
async function createSMSServiceStatusRequest(req, res) {
  try {
    const { accountNo, tpNo } = req.query;

    if (!accountNo || !tpNo) {
      return failure(res, {
        message: 'accountNo and tpNo are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const record = await service.getSMSServiceStatus(
      accountNo,
      tpNo
    );

    if (!record) {
      return failure(res, {
        message:
          `No SMS service status found for accountNo '${accountNo}'.`,
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
        dataBundle: mapper.toLegacyDataBundle(record),
        errorShow: null,
        errorCode: null,
      });
    }

    return res
      .status(200)
      .json(mapper.toTmfCustomerBill(record));
  } catch (error) {
    console.error(
      '[SMSServiceStatus] Failed to retrieve status:',
      error.message
    );

    return failure(res, {
      message: 'Failed to retrieve SMS service status.',
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
  createSMSServiceStatusRequest,
};