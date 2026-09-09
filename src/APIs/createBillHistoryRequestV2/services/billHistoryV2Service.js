// src/APIs/createBillHistoryRequestV2/services/billHistoryV2Service.js

const {
  BillHistoryV2Item,
} = require('../../../models/TMF678_BillingPayment');

/**
 * Convert MM/DD/YYYY into a sortable timestamp.
 */
function parseLegacyDate(dateValue) {
  if (!dateValue || typeof dateValue !== 'string') {
    return 0;
  }

  const [month, day, year] = dateValue
    .split('/')
    .map(Number);

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
 * Retrieve Bill History V2 records.
 */
async function getBillHistoryV2(
  telephoneNo,
  accountNo
) {
  const records = await BillHistoryV2Item.find({
    telephoneNo,
    accountNo,
  }).lean();

  if (!records || records.length === 0) {
    return null;
  }

  // billMonth is stored as MM/DD/YYYY.
  // Return newest records first.
  records.sort(
    (first, second) =>
      parseLegacyDate(second.billMonth) -
      parseLegacyDate(first.billMonth)
  );

  return records;
}

module.exports = {
  getBillHistoryV2,
};