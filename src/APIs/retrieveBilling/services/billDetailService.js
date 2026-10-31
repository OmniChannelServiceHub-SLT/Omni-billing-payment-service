const { BillDetail } = require('../../../models/TMF678_BillingPayment');

async function getBillDetail(telephoneNo, accountNo) {
  return BillDetail.findOne({ telephoneNo, accountNo })
    .select('listofbillingInquiryType listofProductDetail myPackageInfo -_id').lean();
}
module.exports = { getBillDetail };


const { TmfAppliedCustomerBillingRate } = require('../../../models/TMF678_BillingPayment');
module.exports.listTmfAppliedCustomerBillingRate = query => TmfAppliedCustomerBillingRate.listTmf(query);
module.exports.getTmfAppliedCustomerBillingRate = (id, query) => TmfAppliedCustomerBillingRate.getTmf(id, query);


const { money, sltType }=require('../../../middleware/response.util');
module.exports.getBillingSummary=async (telephoneNo,accountNo)=>{
  const d=await getBillDetail(telephoneNo,accountNo);if(!d)return null;
  return {id:accountNo+':'+telephoneNo,...sltType('SLTBillingSummary'),href:'/tmf-api/customerBillManagement/v4/bill-detail/'+encodeURIComponent(accountNo+':'+telephoneNo),
    billingAccount:{id:accountNo,'@referredType':'BillingAccount'},serviceId:telephoneNo,
    billingInquiry:(d.listofbillingInquiryType||[]).map(x=>({billAmount:money(x.billAmount),lastBillDate:x.lastBillDate,paymentDueDate:x.paymentDueDate,lastPaymentDate:x.lastPaymentDate,lastPaymentAmount:money(x.lastPaymentAmount),accountOutstandingBalance:money(x.outstandingBalance)})),
    installedServicePackages:d.listofProductDetail||[],packageUsage:d.myPackageInfo||null};
};

