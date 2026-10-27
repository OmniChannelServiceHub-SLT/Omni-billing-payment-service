const { EBillRegistration, EBillStatus } = require('../../../models/TMF678_BillingPayment');

async function getEBillStatus(accountNo, tpNo) {
  const registration = await EBillRegistration.findOne({ accountNumber: accountNo, eventSource: tpNo }).lean();
  if (registration) return { mobileno: registration.newContactNumber, emailaddress: registration.newEmailAddress };
  return EBillStatus.findOne({ accountNo, tpNo }).select('mobileno emailaddress -_id').lean();
}
module.exports = { getEBillStatus };


const { sltType }=require('../../../middleware/response.util');
module.exports.preference=async(accountNo,tpNo)=>{
 const d=await getEBillStatus(accountNo,tpNo);if(!d)return null;
 return {id:accountNo+':'+tpNo,...sltType('SLTBillDeliveryPreference'),href:'/tmf-api/customerBillManagement/v4/ebill-status?accountNo='+encodeURIComponent(accountNo)+'&tpNo='+encodeURIComponent(tpNo),billingAccount:{id:accountNo,'@referredType':'BillingAccount'},serviceId:tpNo,
 contact:[{contactType:'billing',validFor:{},contactMedium:[...(d.emailaddress?[{mediumType:'email',characteristic:{emailAddress:d.emailaddress}}]:[]),...(d.mobileno?[{mediumType:'telephone',characteristic:{phoneNumber:d.mobileno}}]:[])]}]};
};

