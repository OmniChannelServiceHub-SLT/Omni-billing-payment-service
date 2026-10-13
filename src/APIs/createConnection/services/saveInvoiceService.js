const { SaveInvoice } = require('../../../models/TMF676_Payment');

async function saveInvoice(input) {
  const invoiceData = {
    refNo: input.REF_NO, serviceType: input.SERVICE_TYPE,
    packageName: input.PACKAGE_NAME, packageCount: input.PACKAGE_COUNT,
    rental: input.RENTAL, initialCharge: input.INI_CHARGE, status: input.STATUS,
  };
  return SaveInvoice.findOneAndUpdate(
    { refNo: invoiceData.refNo, serviceType: invoiceData.serviceType, packageName: invoiceData.packageName },
    { $set: invoiceData },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  ).lean();
}
module.exports = { saveInvoice };
