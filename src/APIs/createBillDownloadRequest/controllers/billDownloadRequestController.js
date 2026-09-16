// src/APIs/createBillDownloadRequest/controllers/billDownloadRequestController.js

const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/billDownloadRequestService'
);

const mapper = require(
  '../mappers/billDownloadRequestMapper'
);

/**
 * GET /bill-download
 *
 * Default response: TMF-aligned CustomerBill
 * x-response-format: legacy: compatibility response
 */
async function createBillDownloadRequest(
  req,
  res
) {
  try {
    const {
      accountNo,
      ebillMonth,
      tpNo,
    } = req.query;

    if (!accountNo || !ebillMonth || !tpNo) {
      return failure(res, {
        message:
          'accountNo, ebillMonth and tpNo are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const record =
      await service.getBillDownloadRequest(
        accountNo,
        ebillMonth,
        tpNo
      );

    if (!record) {
      return failure(res, {
        message:
          `No bill download record found for accountNo '${accountNo}' and month '${ebillMonth}'.`,
        errorCode: 'E404',
        status: 404,
      });
    }

    const responseFormat = (
      req.get('x-response-format') || ''
    ).toLowerCase();

    if (responseFormat === 'legacy') {
      const message = 'Successfully Retrieved.';

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
      '[BillDownloadRequest] Failed:',
      error.message
    );

    return failure(res, {
      message:
        'Failed to retrieve the bill download request.',
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
  createBillDownloadRequest,
};