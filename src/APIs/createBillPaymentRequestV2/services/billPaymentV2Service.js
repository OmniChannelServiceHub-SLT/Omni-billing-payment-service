// src/APIs/createBillPaymentRequestV2/services/billPaymentV2Service.js

const {
  BillPayment,
} = require('../../../models/TMF678_BillingPayment');

/**
 * Retrieve the raw BillPaymentRequestV2 database record.
 *
 * BillPaymentRequestV2 has no separate legacy response in the
 * provided Excel/Postman sources, so it uses the closest existing
 * BillPayment data model and response structure.
 */
async function getBillPaymentV2(
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
  getBillPaymentV2,
};