// src/APIs/createBillStatusRequest/services/billStatusService.js

const {
  BillStatus,
} = require('../../../models/TMF678_BillingPayment');

/**
 * Retrieve the raw bill status record using accountNo and tpNo.
 * Response formatting is handled by the mapper.
 */
async function getBillStatus(
  accountNo,
  tpNo
) {
  const record = await BillStatus.findOne({
    accountNo,
    tpNo,
  }).lean();

  if (!record) {
    return null;
  }

  return record;
}

module.exports = {
  getBillStatus,
};