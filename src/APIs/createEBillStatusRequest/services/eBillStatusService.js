// src/APIs/createEBillStatusRequest/services/eBillStatusService.js

const {
  EBillStatus,
} = require('../../../models/TMF678_BillingPayment');

/**
 * Retrieve the raw eBill status record using accountNo and tpNo.
 * Response formatting is handled by the mapper.
 */
async function getEBillStatus(
  accountNo,
  tpNo
) {
  const record = await EBillStatus.findOne({
    accountNo,
    tpNo,
  }).lean();

  if (!record) {
    return null;
  }

  return record;
}

module.exports = {
  getEBillStatus,
};