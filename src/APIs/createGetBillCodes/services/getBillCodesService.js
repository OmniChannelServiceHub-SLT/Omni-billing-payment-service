// src/APIs/createGetBillCodes/services/getBillCodesService.js

const {
  BillCode,
} = require('../../../models/TMF678_BillingPayment');

async function getBillCodes() {
  const records = await BillCode.find({
    isActive: true,
  })
    .sort({
      displayOrder: 1,
      billCode: 1,
    })
    .lean();

  return records;
}

module.exports = {
  getBillCodes,
};