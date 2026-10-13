const { BillStatus } = require('../../../models/TMF678_BillingPayment');

async function getBillStatus(accountNo, tpNo) {
  return BillStatus.findOne({ accountNo, tpNo })
    .select('bill_code bill_code_desc mobile email possiblebillmodelist -_id').lean();
}
module.exports = { getBillStatus };
