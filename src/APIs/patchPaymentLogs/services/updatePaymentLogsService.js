const {
  PaymentLog,
} = require('../../../models/TMF676_Payment');

async function updatePaymentLogs(orderreff, refund_ncp) {
  const result = await PaymentLog.updateMany(
    { order_ref: orderreff },
    { $set: { refund_ncp } }
  );

  if (result.matchedCount === 0) {
    return null;
  }

  const records = await PaymentLog.find({
    order_ref: orderreff,
  }).lean();

  return {
    matchedCount: result.matchedCount,
    modifiedCount: result.modifiedCount,
    records,
  };
}

module.exports = {
  updatePaymentLogs,
};