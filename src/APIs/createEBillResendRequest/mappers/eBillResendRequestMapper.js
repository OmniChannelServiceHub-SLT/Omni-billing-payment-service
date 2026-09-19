// src/APIs/createEBillResendRequest/mappers/eBillResendRequestMapper.js

function toLegacyDataBundle() {
  return null;
}

function toTmfCustomerBill(record) {
  const id = String(record._id);
  const isEmail = record.eContact.includes('@');

  return {
    id,

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