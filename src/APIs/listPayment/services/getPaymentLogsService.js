const { PaymentLog } = require('../../../models/TMF676_Payment');

async function getPaymentLogs(orderreff) {
  return PaymentLog.find({ order_ref: orderreff }).sort({ _id: 1 }).lean();
}
module.exports = { getPaymentLogs };
