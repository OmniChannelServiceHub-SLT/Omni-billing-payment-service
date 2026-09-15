// src/APIs/createEBillRegistration/services/eBillRegistrationService.js

const {
  EBillRegistration,
} = require('../../../models/TMF678_BillingPayment');

/**
 * Create or update an eBill registration record.
 */
async function registerEBill(registrationData) {
  const record =
    await EBillRegistration.findOneAndUpdate(
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
  registerEBill,
};