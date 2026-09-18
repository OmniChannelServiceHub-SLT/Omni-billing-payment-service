// src/APIs/createSMSServiceStatusRequest/services/smsServiceStatusService.js

const {
  SMSServiceStatus,
} = require('../../../models/TMF678_BillingPayment');

/**
 * Retrieve SMS service status using accountNo and tpNo.
 */
async function getSMSServiceStatus(accountNo, tpNo) {
  const record = await SMSServiceStatus.findOne({
    accountNo,
    tpNo,
  }).lean();

  if (!record) {
    return null;
  }

  return record;
}

module.exports = {
  getSMSServiceStatus,
};