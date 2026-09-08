// src/APIs/createBillHistoryRequest/services/billHistoryService.js

// Row #56 in Omni-Channel-API-Mapping-By-Service.xlsx
// Legacy source: AccountOMNI/BillHistoryRequest (GET)

const {
  BillHistoryItem,
} = require('../../../models/TMF678_BillingPayment');

/**
 * Convert the legacy MM/DD/YYYY date format
 * into a sortable timestamp.
 */
function parseLegacyDate(dateValue) {
  if (
    !dateValue ||
    typeof dateValue !== 'string'
  ) {
    return 0;
  }

  const [month, day, year] =
    dateValue.split('/').map(Number);

  if (!month || !day || !year) {
    return 0;
  }

  return new Date(
    year,
    month - 1,
    day
  ).getTime();
}

/**
 * Retrieve Bill History database records
 * using telephone number and account number.
 */
async function getBillHistory(
  telephoneNo,
  accountNo
) {
  const items = await BillHistoryItem.find({
    telephoneNo,
    accountNumber: accountNo,
  }).lean();

  if (!items || items.length === 0) {
    return null;
  }

  /*
   * actualBillDate is stored using the
   * legacy MM/DD/YYYY string format.
   */
  items.sort(
    (first, second) =>
      parseLegacyDate(
        second.actualBillDate
      ) -
      parseLegacyDate(
        first.actualBillDate
      )
  );

  return items;
}

module.exports = {
  getBillHistory,
};