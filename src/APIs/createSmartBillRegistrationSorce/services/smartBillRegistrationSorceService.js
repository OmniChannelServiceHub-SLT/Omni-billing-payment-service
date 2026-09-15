// src/APIs/createSmartBillRegistrationSorce/services/smartBillRegistrationSorceService.js

const {
  SmartBillRegistrationSorce,
} = require('../../../models/TMF678_BillingPayment');

/**
 * Create or update a Smart Bill registration source record.
 */
async function registerSmartBillSorce(
  registrationData
) {
  const record =
    await SmartBillRegistrationSorce.findOneAndUpdate(
      {
        accountNumber:
          registrationData.accountNumber,
        eventSource:
          registrationData.eventSource,
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
  registerSmartBillSorce,
};