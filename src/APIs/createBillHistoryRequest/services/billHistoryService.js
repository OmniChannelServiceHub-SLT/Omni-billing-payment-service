// Row #56 in Omni-Channel-API-Mapping-By-Service.xlsx
// Legacy source: AccountOMNI/BillHistoryRequest (GET)

const {
  BillHistoryItem,
} = require('../../../models/TMF678_BillingPayment');

/**
 * Convert the legacy MM/DD/YYYY date format into a sortable timestamp.
 */
function parseLegacyDate(dateValue) {
  if (!dateValue || typeof dateValue !== 'string') {
    return 0;
  }

  const [month, day, year] = dateValue.split('/').map(Number);

  if (!month || !day || !year) {
    return 0;
  }

  return new Date(year, month - 1, day).getTime();
}

/**
 * Retrieve bill-history records using telephone number and account number.
 */
async function getBillHistory(telephoneNo, accountNo) {
  const items = await BillHistoryItem.find({
    telephoneNo,
    accountNumber: accountNo,
  }).lean();

  if (!items || items.length === 0) {
    return null;
  }

  // actualBillDate is stored in legacy MM/DD/YYYY string format.
  // Sort it in JavaScript to return the newest bill first.
  items.sort(
    (first, second) =>
      parseLegacyDate(second.actualBillDate) -
      parseLegacyDate(first.actualBillDate)
  );

  // Response fields are based on the real response in
  // API_Params_SLTOMNI_V2.0, sheet "17".
  return {
    listOfSLTBillDetailsResponseIo: items.map((item) => ({
      accountNumber: item.accountNumber,
      invoiceNumber: item.invoiceNumber,
      version: item.version,
      billType: item.billType,
      billSequence: item.billSequence,
      billStatus: item.billStatus,
      invoiceNet: item.invoiceNet,
      invoiceTax: item.invoiceTax,
      actualBillDate: item.actualBillDate,
      nominalBillDate: item.nominalBillDate,
      taxPointDate: item.taxPointDate,
      payments: item.payments,
      failedPayments: item.failedPayments,
      refunds: item.refunds,
      adjustments: item.adjustments,
      balanceForward: item.balanceForward,
      balanceOutstanding: item.balanceOutstanding,
      maxBilledEventDate: item.maxBilledEventDate,
      invoiceTotal: item.invoiceTotal,
      accountId: item.accountId,
    })),
  };
}

module.exports = {
  getBillHistory,
};