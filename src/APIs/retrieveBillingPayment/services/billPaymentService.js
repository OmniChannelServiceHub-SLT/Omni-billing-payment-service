const { BillPayment } = require('../../../models/TMF676_Payment');

// Source method is GET: this operation retrieves balances and never creates a payment.
async function getBillPayment(telephoneNo, accountNo) {
  return BillPayment.findOne({ telephoneNo, accountNo })
    .select('billAmount lastBillDate paymentDueDate lastPaymentDate lastPaymentAmount outstandingBalance -_id').lean();
}
module.exports = { getBillPayment };


const { money,sltType }=require('../../../middleware/response.util');
module.exports.getPaymentSummary=async (telephoneNo,accountNo)=>{
 const d=await getBillPayment(telephoneNo,accountNo);if(!d)return null;
 return {id:accountNo+':'+telephoneNo,...sltType('SLTBillPaymentSummary'),href:'/tmf-api/paymentManagement/v4/bill-payment/'+encodeURIComponent(accountNo+':'+telephoneNo),billingAccount:{id:accountNo,'@referredType':'BillingAccount'},serviceId:telephoneNo,
 billAmount:money(d.billAmount),lastBillDate:d.lastBillDate,paymentDueDate:d.paymentDueDate,lastPaymentDate:d.lastPaymentDate,lastPaymentAmount:money(d.lastPaymentAmount),accountOutstandingBalance:money(d.outstandingBalance)};
};

