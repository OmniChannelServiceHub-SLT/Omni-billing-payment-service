const { BillStatus } = require('../../../models/TMF678_BillingPayment');

async function getBillStatus(accountNo, tpNo) {
  return BillStatus.findOne({ accountNo, tpNo })
    .select('bill_code bill_code_desc mobile email possiblebillmodelist -_id').lean();
}
module.exports = { getBillStatus };


const { sltType }=require('../../../middleware/response.util');
module.exports.deliveryResource=async(accountNo,tpNo)=>{
 const d=await getBillStatus(accountNo,tpNo);if(!d)return null;
 const values=[d.email,d.mobile].filter(Boolean);
 const email=values.find(v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)),phone=values.find(v=>/^[+\d\s()-]+$/.test(v));
 return {id:accountNo+':'+tpNo,...sltType('SLTBillDeliveryPreference'),href:'/tmf-api/customerBillManagement/v4/bill-status?accountNo='+encodeURIComponent(accountNo)+'&tpNo='+encodeURIComponent(tpNo),billingAccount:{id:accountNo,'@referredType':'BillingAccount'},serviceId:tpNo,
 billStructure:{presentationMedia:[{id:d.bill_code,name:d.bill_code_desc,href:'/tmf-api/customerBillManagement/v4/bill-codes/'+encodeURIComponent(d.bill_code)}]},availablePresentationMedia:(d.possiblebillmodelist||[]).map(x=>({id:x.bill_code,name:x.bill_code_desc,href:'/tmf-api/customerBillManagement/v4/bill-codes/'+encodeURIComponent(x.bill_code)})),
 contact:[{contactType:'billing',validFor:{},contactMedium:[...(email?[{mediumType:'email',characteristic:{emailAddress:email}}]:[]),...(phone?[{mediumType:'telephone',characteristic:{phoneNumber:phone}}]:[])]}]};
};

