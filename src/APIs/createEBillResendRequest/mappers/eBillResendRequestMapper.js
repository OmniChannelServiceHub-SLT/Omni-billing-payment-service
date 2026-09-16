// src/APIs/createEBillResendRequest/mappers/eBillResendRequestMapper.js

const CUSTOMER_BILL_BASE_PATH =
  '/tmf-api/customerBillManagement/v4/customerBill';

function toLegacyDataBundle() {
  return null;
}

function toTmfCustomerBill(record) {
  const id = String(record._id);
  const isEmail = record.eContact.includes('@');

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

    contactMedium: [
      {
        mediumType: isEmail ? 'EMAIL' : 'PHONE',
        characteristic: isEmail
          ? {
              emailAddress: record.eContact,
            }
          : {
              phoneNumber: record.eContact,
            },
      },
    ],

    characteristic: [
      {
        name: 'ebillMonth',
        value: record.ebillMonth,
      },
      {
        name: 'requestType',
        value: 'resend',
      },
    ],

    state: record.resendStatus,

    '@type': 'CustomerBill',
  };
}

module.exports = {
  toLegacyDataBundle,
  toTmfCustomerBill,
};