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


const { sltType }=require('../../../middleware/response.util');
module.exports.validateDelivery=async (accountNo,provider)=>{
 const row=await checkEBillUserExistV2(accountNo,provider);if(!row)return null;
 return {...sltType('SLTBillDeliveryValidation'),billingAccount:{id:accountNo,'@referredType':'BillingAccount'},registered:row.userexist==='Y',reference:row.referenceNumber,
 otpDelivery:row.userexist==='N' ? (provider?'sent':'mock-not-sent'):'not-required'};
};

