const service = require('../services/getInvoiceDataService');
const mapper = require('../mappers/getInvoiceDataMapper');

async function createGetInvoiceData(req, res, next) {
  try {
    const refNo =
      req.query.REF_NO ||
      req.query.refNo;

    if (!refNo) {
      return res.status(400).json({
        isSuccess: false,
        errorMessege: 'REF_NO is required.',
        exceptionDetail: null,
        dataBundle: null,
        errorShow: 'REF_NO is required.',
        errorCode: 'E400',
      });
    }

    const record = await service.getInvoiceData(refNo);

    if (!record) {
      return res.status(404).json({
        isSuccess: false,
        errorMessege: 'Invoice data not found.',
        exceptionDetail: null,
        dataBundle: null,
        errorShow: 'Invoice data not found.',
        errorCode: 'E404',
      });
    }

    const responseFormat = req.get('x-response-format');

    if (
      responseFormat &&
      responseFormat.toLowerCase() === 'legacy'
    ) {
      return res.status(200).json(
        mapper.toLegacyResponse(record)
      );
    }

    return res.status(200).json(
      mapper.toTmfResponse(record)
    );
  } catch (error) {
    error.status = 500;
    error.publicMessage =
      'Failed to retrieve invoice data.';
    error.code = 'E500';

    return next(error);
  }
}

module.exports = {
  createGetInvoiceData,
};