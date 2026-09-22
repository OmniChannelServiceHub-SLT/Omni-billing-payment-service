const {
  InvoiceData,
} = require('../../../models/TMF676_Payment');

async function getInvoiceData(refNo) {
  return InvoiceData.findOne({
    refNo,
  }).lean();
}

module.exports = {
  getInvoiceData,
};