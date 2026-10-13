const { EBillRegistration } = require('../../../models/TMF678_BillingPayment');

async function registerEBill(input) {
  return EBillRegistration.findOneAndUpdate(
    { accountNumber: input.accountNumber, eventSource: input.eventSource },
    { $set: input },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  ).lean();
}
module.exports = { registerEBill };
