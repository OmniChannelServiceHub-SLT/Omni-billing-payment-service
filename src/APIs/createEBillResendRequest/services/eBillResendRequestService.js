// src/APIs/createEBillResendRequest/services/eBillResendRequestService.js

const {
  EBillResendRequest,
} = require('../../../models/TMF678_BillingPayment');

async function resendEBill(requestData) {
  const record =
    await EBillResendRequest.findOneAndUpdate(
      {
        accountNo: requestData.accountNo,
        ebillMonth: requestData.ebillMonth,
        tpNo: requestData.tpNo,
      },
      {
        $set: requestData,
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
  resendEBill,
};