const {
  InvoiceData,
} = require('../../../models/TMF678_BillingPayment');

async function getInvoiceData(refNo) {
  return InvoiceData.findOne({
    refNo,
  }).lean();
}

module.exports = {
  getInvoiceData,
};