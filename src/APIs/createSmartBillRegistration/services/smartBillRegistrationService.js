// src/APIs/createSmartBillRegistration/services/smartBillRegistrationService.js

const {
  SmartBillRegistration,
} = require('../../../models/TMF678_BillingPayment');

async function registerSmartBill(registrationData) {
  const record =
    await SmartBillRegistration.findOneAndUpdate(
      {
        accountNo: registrationData.accountNo,
        tpNo: registrationData.tpNo,
      },
      {
        $set: registrationData,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    ).lean();

  return record;
}

module.exports = {
  registerSmartBill,
};