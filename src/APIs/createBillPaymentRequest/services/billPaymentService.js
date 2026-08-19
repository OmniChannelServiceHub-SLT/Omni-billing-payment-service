// Row #58 in Omni-Channel-API-Mapping-By-Service.xlsx ("Billing and Payment Service" sheet)
// Legacy source: [AccountOMNI] "BillPaymentRequest" (GET)
const { BillPayment } = require('../../../models/TMF678_BillingPayment');

async function getBillPayment(telephoneNo, accountNo) {
  const record = await BillPayment.findOne({ telephoneNo, accountNo });
  if (!record) return null;

  // Matches real dataBundle shape from API_Params_SLTOMNI_V2_0_1.xlsx sheet "28"
  return {
    listofbillingInquiryType: [
      {
        billAmount: record.billAmount,
        lastBillDate: record.lastBillDate,
        paymentDueDate: record.paymentDueDate,
        lastPaymentDate: record.lastPaymentDate,
        lastPaymentAmount: record.lastPaymentAmount,
        outstandingBalance: record.outstandingBalance,
      },
    ],
  };
}

module.exports = { getBillPayment };
