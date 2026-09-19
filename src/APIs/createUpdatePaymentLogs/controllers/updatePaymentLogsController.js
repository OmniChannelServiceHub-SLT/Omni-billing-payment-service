const {
  failure,
} = require('../../../middleware/response.util');

const service = require('../services/updatePaymentLogsService');
const mapper = require('../mappers/updatePaymentLogsMapper');

async function createUpdatePaymentLogs(req, res) {
  try {
    const { orderreff, refund_ncp } = req.query;

    if (
      typeof orderreff !== 'string' ||
      !orderreff.trim() ||
      typeof refund_ncp !== 'string' ||
      !refund_ncp.trim()
    ) {
      return failure(res, {
        message: 'orderreff and refund_ncp are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const updated = await service.updatePaymentLogs(
      orderreff.trim(),
      refund_ncp.trim()
    );

    if (!updated) {
      return failure(res, {
        message: 'Payment logs not found.',
        errorCode: 'E404',
        status: 404,
      });
    }

    const responseFormat = (
      req.get('x-response-format') || ''
    ).toLowerCase();

    if (responseFormat === 'legacy') {
      return res.status(200).json(
        mapper.toLegacyResponse()
      );
    }

    return res.status(200).json(
      mapper.toTmfResponse(updated.records)
    );
  } catch (error) {
    console.error(
      '[UpdatePaymentLogs] Failed to update payment logs:',
      error
    );

    return failure(res, {
      message: 'Failed to update payment logs.',
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
  createUpdatePaymentLogs,
};