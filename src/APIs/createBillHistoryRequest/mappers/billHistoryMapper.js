// src/APIs/createBillHistoryRequest/mappers/billHistoryMapper.js

const CUSTOMER_BILL_BASE_PATH =
  '/tmf-api/customerBillManagement/v4/customerBill';

/**
 * Create a TMF Money object from a legacy
 * string amount.
 */
function mapMoney(amount) {
  const value = Number(amount);

  return {
    unit: 'LKR',
    value: Number.isFinite(value)
      ? value
      : 0,
  };
}

/**
 * Map one MongoDB BillHistoryItem record to
 * the original Excel response item.
 */
function mapToLegacyItem(item) {
  return {
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
    balanceOutstanding:
      item.balanceOutstanding,
    maxBilledEventDate:
      item.maxBilledEventDate,
    invoiceTotal: item.invoiceTotal,
    accountId: item.accountId,
  };
}

/**
 * Map Bill History records to the original
 * SLTOMNI dataBundle from Excel sheet "17".
 */
function mapToLegacyResponse(items) {
  return {
    listOfSLTBillDetailsResponseIo:
      items.map(mapToLegacyItem),
  };
}

/**
 * Map one MongoDB BillHistoryItem record to
 * a TMF678 CustomerBill resource.
 */
function mapToCustomerBill(item) {
  const id = String(item._id);

  return {
    id,

    href:
      `${CUSTOMER_BILL_BASE_PATH}/${id}`,

    billNo: item.invoiceNumber,

    billingAccount: {
      id: item.accountNumber,
    },

    billDate: item.actualBillDate,

    state:
      item.billStatus || 'generated',

    taxExcludedAmount:
      mapMoney(item.invoiceNet),

    taxIncludedAmount:
      mapMoney(item.invoiceTotal),

    remainingAmount:
      mapMoney(item.balanceOutstanding),

    paymentAmount:
      mapMoney(item.payments),

    billType: item.billType,

    billSequence: item.billSequence,

    nominalBillDate:
      item.nominalBillDate,

    taxPointDate:
      item.taxPointDate,

    '@type': 'CustomerBill',
  };
}

/**
 * Map all Bill History records to
 * TMF678 CustomerBill resources.
 */
function mapToTmfResponse(items) {
  return items.map(mapToCustomerBill);
}

module.exports = {
  mapToLegacyResponse,
  mapToCustomerBill,
  mapToTmfResponse,
};