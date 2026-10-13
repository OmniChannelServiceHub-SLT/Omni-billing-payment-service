const { EBillRegistration, SMSServiceStatus } = require('../../../models/TMF678_BillingPayment');

async function getSMSServiceStatus(accountNo, tpNo) {
  const registration = await EBillRegistration.findOne({ accountNumber: accountNo, eventSource: tpNo }).lean();
  if (registration) return registration.isEnableSms;
  const status = await SMSServiceStatus.findOne({ accountNo, tpNo }).lean();
  return status ? status.serviceAvailable : null;
}
module.exports = { getSMSServiceStatus };
