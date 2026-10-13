const { EBillRegistration, EBillStatus } = require('../../../models/TMF678_BillingPayment');

async function getEBillStatus(accountNo, tpNo) {
  const registration = await EBillRegistration.findOne({ accountNumber: accountNo, eventSource: tpNo }).lean();
  if (registration) return { mobileno: registration.newContactNumber, emailaddress: registration.newEmailAddress };
  return EBillStatus.findOne({ accountNo, tpNo }).select('mobileno emailaddress -_id').lean();
}
module.exports = { getEBillStatus };
