const {
  PaymentLog,
} = require('../../../models/TMF676_Payment');

async function getPaymentLogs(orderreff) {
  return PaymentLog.find({
    order_ref: orderreff,
  }).lean();
}

module.exports = {
  getPaymentLogs,
};