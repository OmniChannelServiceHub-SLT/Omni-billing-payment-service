// src/APIs/createBillHistoryRequestV2/mappers/billHistoryV2Mapper.js

const CUSTOMER_BILL_BASE_PATH =
  '/tmf-api/customerBillManagement/v4/customerBill';

/**
 * Convert database records into the exact legacy response
 * from Excel sheet "90".
 */
function toLegacyDataBundle(records) {
  return {
    listofBillHistoryDetail: records.map((record) => ({
      billMonth: record.billMonth,
      billValue: record.billValue,
      payments: record.payments,
      outstanding: record.outstanding,
      eBillAvailability: record.eBillAvailability,
      billCode: record.billCode,
    })),
  };
}

/**
 * Convert a BillHistoryV2 record into a TMF678 CustomerBill resource.
 */
function toTmfCustomerBill(record) {
  const id = String(record._id);

  return {
    id,

    href: `${CUSTOMER_BILL_BASE_PATH}/${id}`,

    billingAccount: {
      id: record.accountNo,
    },

    billDate: record.billMonth,

    amountDue: {
      value: Number(record.billValue || 0),
      unit: 'LKR',
    },

    remainingAmount: {
      value: Number(record.outstanding || 0),
      unit: 'LKR',
    },

    state: 'generated',

    paymentAmount: {
      value: Number(record.payments || 0),
      unit: 'LKR',
    },

    eBillAvailability: record.eBillAvailability,

    billCode: record.billCode,

    '@type': 'CustomerBill',
  };
}

/**
 * Convert all records into a TMF-aligned response.
 */
function toTmfResponse(records) {
  return records.map(toTmfCustomerBill);
}

module.exports = {
  toLegacyDataBundle,
  toTmfCustomerBill,
  toTmfResponse,
};