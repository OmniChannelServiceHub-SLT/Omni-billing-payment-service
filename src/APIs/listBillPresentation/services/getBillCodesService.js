const { BillCode } = require('../../../models/TMF678_BillingPayment');

async function getBillCodes() {
  return BillCode.find({ isActive: true }).sort({ displayOrder: 1, billCode: 1 }).lean();
}
module.exports = { getBillCodes };
