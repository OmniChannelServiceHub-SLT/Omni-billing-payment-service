const {
  InvoiceData,
} = require('../../../models/TMF678_BillingPayment');

async function bulkUpdateInvoiceData(records) {
  const operations = records.map((record) => ({
    updateOne: {
      filter: {
        refNo: record.refNo,
      },
      update: {
        $set: {
          invoiceData: record.invoiceData,
          updateStatus: 'bulk-updated',
        },
      },
      upsert: true,
    },
  }));

  const result =
    await InvoiceData.bulkWrite(
      operations,
      {
        ordered: false,
      }
    );

  const refNumbers = records.map(
    (record) => record.refNo
  );

  const updatedRecords =
    await InvoiceData.find({
      refNo: {
        $in: refNumbers,
      },
    }).lean();

  return {
    result,
    records: updatedRecords,
  };
}

module.exports = {
  bulkUpdateInvoiceData,
};