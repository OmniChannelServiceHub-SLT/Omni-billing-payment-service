const service = require('../services/getPaymentLogsService');
const mapper = require('../mappers/getPaymentLogsMapper');

async function listPaymentLogs(req, res, next) {
  try {
    const orderreff =
      typeof req.query.orderreff === 'string'
        ? req.query.orderreff.trim()
        : '';

    if (!orderreff) {
      return res.status(400).json({
        isSuccess: false,
        errorMessege: 'orderreff is required.',
        exceptionDetail: null,
        dataBundle: null,
        errorShow: 'orderreff is required.',
        errorCode: 'E400',
      });
    }

    const records = await service.getPaymentLogs(orderreff);

    if (records.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        errorMessege: 'Payment logs not found.',
        exceptionDetail: null,
        dataBundle: null,
        errorShow: 'Payment logs not found.',
        errorCode: 'E404',
      });
    }

    const format = (
      req.get('x-response-format') || ''
    ).toLowerCase();

    if (format === 'legacy') {
      return res.status(200).json(
        mapper.toLegacyResponse(records)
      );
    }

    return res.status(200).json(
      records.map(mapper.toTmfPayment)
    );
  } catch (error) {
    error.status = 500;
    error.publicMessage = 'Failed to retrieve payment logs.';
    error.code = 'E500';
    return next(error);
  }
}

module.exports = {
  listPaymentLogs,
};