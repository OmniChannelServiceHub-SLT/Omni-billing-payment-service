// src/APIs/createBillPaymentRequest/services/billPaymentService.js

const {
  BillPayment,
} = require('../../../models/TMF678_BillingPayment');

/**
 * Retrieve the raw billing/payment database record.
 * Response formatting is handled by the mapper.
 */
async function getBillPayment(
  telephoneNo,
  accountNo
) {
  const record = await BillPayment.findOne({
    telephoneNo,
    accountNo,
  }).lean();

  if (!record) {
    return null;
  }

  return record;
}

module.exports = {
  getBillPayment,
};