// src/APIs/createSmartBillSendRequest/services/smartBillSendRequestService.js

const {
  SmartBillSendRequest,
} = require('../../../models/TMF678_BillingPayment');

async function sendSmartBill(requestData) {
  const record =
    await SmartBillSendRequest.findOneAndUpdate(
      {
        accountNo: requestData.accountNo,
        billRequestingMonth:
          requestData.billRequestingMonth,
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
  sendSmartBill,
};