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
