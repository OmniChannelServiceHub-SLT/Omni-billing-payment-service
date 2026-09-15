// src/APIs/createSMSServiceStatusRequest/mappers/smsServiceStatusMapper.js

const CUSTOMER_BILL_BASE_PATH =
  '/tmf-api/customerBillManagement/v4/customerBill';

/**
 * Exact legacy dataBundle from Excel sheet "23".
 */
function toLegacyDataBundle(record) {
  return {
    isSuccess: true,
    errorMessege: null,
    exceptionDetail: null,
    dataBundle: Boolean(record.serviceAvailable),
    errorShow: null,
    errorCode: null,
  };
}

/**
 * Convert the record into a TMF-aligned CustomerBill resource.
 */
function toTmfCustomerBill(record) {
  const id = String(record._id);

  return {
    id,

    href: `${CUSTOMER_BILL_BASE_PATH}/${id}`,

    billingAccount: {
      id: record.accountNo,
    },

    relatedParty: [
      {
        id: record.tpNo,
        role: 'subscriber',
        '@referredType': 'Individual',
      },
    ],

    characteristic: [
      {
        name: 'smsServiceAvailable',
        value: Boolean(record.serviceAvailable),
      },
    ],

    '@type': 'CustomerBill',
  };
}

module.exports = {
  toLegacyDataBundle,
  toTmfCustomerBill,
};