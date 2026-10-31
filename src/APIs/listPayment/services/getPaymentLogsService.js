const { PaymentLog } = require('../../../models/TMF676_Payment');

async function getPaymentLogs(orderreff) {
  return PaymentLog.find({ order_ref: orderreff }).sort({ _id: 1 }).lean();
}
module.exports = { getPaymentLogs };


const { TmfPayment, TmfRefund } = require('../../../models/TMF676_Payment');
module.exports.listTmfPayment = query => TmfPayment.listTmf(query);
module.exports.getTmfPayment = (id, query) => TmfPayment.getTmf(id, query);
module.exports.createTmfPayment = (body, identity) => TmfPayment.createTmf(body, identity);
module.exports.listTmfRefund = query => TmfRefund.listTmf(query);
module.exports.getTmfRefund = (id, query) => TmfRefund.getTmf(id, query);
module.exports.createTmfRefund = (body, identity) => TmfRefund.createTmf(body, identity);


const { money,sltType }=require('../../../middleware/response.util');
function auditEvent(row){
 const id=String(row._id);
 return {id,...sltType('SLTPaymentAudit'),href:'/tmf-api/paymentManagement/v4/payment-logs/'+id,correlatorId:row.order_ref,reportedAmount:money(row.amount),sourceLogId:row.logId,
 auditMetadata:Object.fromEntries(['nic_no','sys_id','date_enter','epoch_val','gw_ref','gw_status','refund_sys','crm_state','sys_status','CRNumber','AccNo','refund_ncp','passport_no','lastUpdate','cashierRef'].filter(k=>row[k]!==undefined).map(k=>[k,row[k]]))};
}
module.exports.listAudit=async order=> (await getPaymentLogs(order)).map(auditEvent);
module.exports.getAudit=async id=> /^[a-f0-9]{24}$/i.test(id) ? ((await PaymentLog.findById(id).lean())||null) : null;
module.exports.auditEvent=auditEvent;

