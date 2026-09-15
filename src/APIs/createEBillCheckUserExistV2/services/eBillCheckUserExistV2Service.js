// src/APIs/createEBillCheckUserExistV2/services/eBillCheckUserExistV2Service.js

const {
  EBillUserCheck,
} = require('../../../models/TMF678_BillingPayment');

/**
 * Check whether an eBill user exists using the V2 endpoint.
 */
async function checkEBillUserExistV2(
  accountNo,
  tpNo,
  econtact,
  econtactType
) {
  const record = await EBillUserCheck.findOne({
    accountNo,
    tpNo,
    econtact,
    econtactType: econtactType.toUpperCase(),
  }).lean();

  if (!record) {
    return null;
  }

  return record;
}

module.exports = {
  checkEBillUserExistV2,
};