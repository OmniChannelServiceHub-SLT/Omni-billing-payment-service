const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/updateSaveInvoiceService'
);

const mapper = require(
  '../mappers/updateSaveInvoiceMapper'
);

async function patchSaveInvoice(
  req,
  res
) {
  try {
    const refNo =
      req.body.refNo ||
      req.body.REF_NO ||
      req.query.refNo ||
      req.query.REF_NO;

    if (!refNo) {
      return failure(res, {
        message: 'REF_NO is required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const invoiceData = {
      ...req.body,
    };

    delete invoiceData.refNo;
    delete invoiceData.REF_NO;

    if (!Object.keys(invoiceData).length) {
      return failure(res, {
        message:
          'At least one invoice field is required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const record =
      await service.updateSaveInvoice(
        String(refNo).trim(),
        invoiceData
      );

    const responseFormat = (
      req.get('x-response-format') || ''
    ).toLowerCase();

    if (responseFormat === 'legacy') {
      return res
        .status(200)
        .json(mapper.toLegacyResponse());
    }

    return res
      .status(200)
      .json(mapper.toTmfCustomerBill(record));
  } catch (error) {
    console.error(
      '[UpdateSaveInvoice] Failed:',
      error.message
    );

    return failure(res, {
      message:
        'Failed to update invoice data.',
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
  patchSaveInvoice,
};