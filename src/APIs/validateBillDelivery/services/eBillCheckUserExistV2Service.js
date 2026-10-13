const { EBillUserCheck } = require('../../../models/TMF678_BillingPayment');

async function checkEBillUserExistV2(accountNo, otpProvider) {
  const record = await EBillUserCheck.findOne({ accountNo }).sort({ updatedAt: -1 }).lean();
  if (!record) return null;
  if (record.userexist === 'N') {
    if (otpProvider) {
      await otpProvider.send({ accountNo, recipient: record.referenceNumber });
    } else if (process.env.OTP_MODE !== 'mock' || process.env.NODE_ENV === 'production') {
      const error = new Error('OTP provider is not configured. No OTP was sent.');
      error.status = 501;
      throw error;
    }
  }
  return record;
}
module.exports = { checkEBillUserExistV2 };
