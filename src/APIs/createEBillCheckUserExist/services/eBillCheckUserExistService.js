// src/APIs/createEBillCheckUserExist/services/eBillCheckUserExistService.js

const {
  EBillUserCheck,
} = require('../../../models/TMF678_BillingPayment');

/**
 * Check whether an eBill user exists using the supplied
 * account and electronic-contact details.
 */
async function checkEBillUserExist(
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
  checkEBillUserExist,
};