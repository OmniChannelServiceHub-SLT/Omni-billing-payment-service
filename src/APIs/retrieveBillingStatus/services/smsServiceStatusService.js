const { EBillRegistration, SMSServiceStatus } = require('../../../models/TMF678_BillingPayment');

async function getSMSServiceStatus(accountNo, tpNo) {
  const registration = await EBillRegistration.findOne({ accountNumber: accountNo, eventSource: tpNo }).lean();
  if (registration) return registration.isEnableSms;
  const status = await SMSServiceStatus.findOne({ accountNo, tpNo }).lean();
  return status ? status.serviceAvailable : null;
}
module.exports = { getSMSServiceStatus };


const { sltType }=require('../../../middleware/response.util');
module.exports.statusResource=async(accountNo,tpNo)=>{
 const active=await getSMSServiceStatus(accountNo,tpNo);if(active===null)return null;
 return {id:accountNo+':'+tpNo,...sltType('SLTBillDeliveryStatus'),href:'/tmf-api/customerBillManagement/v4/sms-service-status?accountNo='+encodeURIComponent(accountNo)+'&tpNo='+encodeURIComponent(tpNo),billingAccount:{id:accountNo,'@referredType':'BillingAccount'},serviceId:tpNo,smsEnabled:active};
};

