const {
  SaveInvoice,
} = require('../../../models/TMF678_BillingPayment');

async function saveInvoice(invoiceData) {
  const record = await SaveInvoice.findOneAndUpdate(
    {
      refNo: invoiceData.refNo,
      serviceType: invoiceData.serviceType,
      packageName: invoiceData.packageName,
    },
    {
      $set: invoiceData,
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
  saveInvoice,
};