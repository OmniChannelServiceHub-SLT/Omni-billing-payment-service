// Row #56 in Omni-Channel-API-Mapping-By-Service.xlsx ("Billing and Payment Service" sheet)
// Legacy source: [AccountOMNI] "BillHistoryRequest" (GET)
const { BillHistoryItem } = require('../../../models/TMF678_BillingPayment');

async function getBillHistory(telephoneNo, accountNo) {
  const items = await BillHistoryItem.find({ telephoneNo, accountNumber: accountNo }).sort({ actualBillDate: -1 });
  if (!items || items.length === 0) return null;

  // Matches real dataBundle shape from API_Params_SLTOMNI_V2_0_1.xlsx sheet "17"
  return {
    listOfSLTBillDetailsResponseIo: items.map((i) => ({
      accountNumber: i.accountNumber,
      invoiceNumber: i.invoiceNumber,
      version: i.version,
      billType: i.billType,
      billSequence: i.billSequence,
      billStatus: i.billStatus,
      invoiceNet: i.invoiceNet,
      invoiceTax: i.invoiceTax,
      actualBillDate: i.actualBillDate,
      nominalBillDate: i.nominalBillDate,
      taxPointDate: i.taxPointDate,
      payments: i.payments,
      failedPayments: i.failedPayments,
      refunds: i.refunds,
      adjustments: i.adjustments,
      balanceForward: i.balanceForward,
      balanceOutstanding: i.balanceOutstanding,
      maxBilledEventDate: i.maxBilledEventDate,
      invoiceTotal: i.invoiceTotal,
      accountId: i.accountId,
    })),
  };
}

module.exports = { getBillHistory };
