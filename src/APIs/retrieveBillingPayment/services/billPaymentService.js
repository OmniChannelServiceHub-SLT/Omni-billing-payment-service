const { BillPayment } = require('../../../models/TMF676_Payment');

// Source method is GET: this operation retrieves balances and never creates a payment.
async function getBillPayment(telephoneNo, accountNo) {
  return BillPayment.findOne({ telephoneNo, accountNo })
    .select('billAmount lastBillDate paymentDueDate lastPaymentDate lastPaymentAmount outstandingBalance -_id').lean();
}
module.exports = { getBillPayment };
