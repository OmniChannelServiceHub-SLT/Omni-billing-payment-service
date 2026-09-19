const {
  InvoiceData,
} = require('../../../models/TMF676_Payment');

async function updateSaveInvoice(
  refNo,
  invoiceData
) {
  const record =
    await InvoiceData.findOneAndUpdate(
      {
        refNo,
      },
      {
        $set: {
          invoiceData,
          updateStatus: 'updated',
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    ).lean();

  return record;
}

module.exports = {
  updateSaveInvoice,
};