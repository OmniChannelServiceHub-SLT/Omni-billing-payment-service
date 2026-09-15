// src/APIs/createBillPaymentRequest/mappers/billPaymentMapper.js

const PAYMENT_BASE_PATH =
  '/tmf-api/paymentManagement/v4/payment';

/**
 * Exact legacy dataBundle from Excel sheet "28".
 */
function toLegacyDataBundle(record) {
  return {
    listofbillingInquiryType: [
      {
        billAmount: record.billAmount,
        lastBillDate: record.lastBillDate,
        paymentDueDate: record.paymentDueDate,
        lastPaymentDate: record.lastPaymentDate,
        lastPaymentAmount: record.lastPaymentAmount,
        outstandingBalance:
          record.outstandingBalance,
      },
    ],
  };
}

/**
 * Convert the record into a TMF676 Payment resource.
 */
function toTmfPayment(record) {
  const id = String(record._id);

  return {
    id,

    href: `${PAYMENT_BASE_PATH}/${id}`,

    paymentDate: record.lastPaymentDate,

    amount: {
      value: Number(record.lastPaymentAmount || 0),
      unit: 'LKR',
    },

    status: 'done',

    account: {
      id: record.accountNo,
      '@referredType': 'BillingAccount',
    },

    billAmount: {
      value: Number(record.billAmount || 0),
      unit: 'LKR',
    },

    outstandingBalance: {
      value: Number(
        record.outstandingBalance || 0
      ),
      unit: 'LKR',
    },

    lastBillDate: record.lastBillDate,
    paymentDueDate: record.paymentDueDate,

    '@type': 'Payment',
  };
}

module.exports = {
  toLegacyDataBundle,
  toTmfPayment,
};