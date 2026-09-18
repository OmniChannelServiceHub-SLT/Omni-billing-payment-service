const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/bulkUpdateInvoiceDataService'
);

const mapper = require(
  '../mappers/bulkUpdateInvoiceDataMapper'
);

function normalizeRecord(
  item,
  fallbackRefNo
) {
  const refNo =
    item.refNo ||
    item.REF_NO ||
    fallbackRefNo;

  const invoiceData =
    item.invoiceData &&
    typeof item.invoiceData === 'object' &&
    !Array.isArray(item.invoiceData)
      ? { ...item.invoiceData }
      : { ...item };

  delete invoiceData.refNo;
  delete invoiceData.REF_NO;
  delete invoiceData.invoiceData;

  return {
    refNo: refNo
      ? String(refNo).trim()
      : '',
    invoiceData,
  };
}

async function createBulkUpdateInvoiceData(
  req,
  res
) {
  try {
    const fallbackRefNo =
      req.query.refNo ||
      req.query.REF_NO ||
      req.body.refNo ||
      req.body.REF_NO;

    let inputRecords;

    if (Array.isArray(req.body)) {
      inputRecords = req.body;
    } else if (
      Array.isArray(req.body.invoices)
    ) {
      inputRecords = req.body.invoices;
    } else {
      inputRecords = [req.body];
    }

    if (!inputRecords.length) {
      return failure(res, {
        message:
          'At least one invoice record is required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const records = inputRecords.map(
      (item) =>
        normalizeRecord(
          item,
          inputRecords.length === 1
            ? fallbackRefNo
            : null
        )
    );

    const invalidRecord = records.find(
      (record) =>
        !record.refNo ||
        !Object.keys(
          record.invoiceData
        ).length
    );

    if (invalidRecord) {
      return failure(res, {
        message:
          'Each invoice record requires REF_NO and at least one invoice field.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const updateResult =
      await service.bulkUpdateInvoiceData(
        records
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
      .json(
        mapper.toTmfCustomerBills(
          updateResult.records
        )
      );
  } catch (error) {
    console.error(
      '[BulkUpdateInvoiceData] Failed:',
      error.message
    );

    return failure(res, {
      message:
        'Failed to bulk update invoice data.',
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
  createBulkUpdateInvoiceData,
};