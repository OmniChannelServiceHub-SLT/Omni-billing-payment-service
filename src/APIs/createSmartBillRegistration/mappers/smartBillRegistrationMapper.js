// src/APIs/createSmartBillRegistration/mappers/smartBillRegistrationMapper.js

function toLegacyDataBundle() {
  return null;
}

function toTmfCustomerBill(record) {
  const id = String(record._id);

  const isEmail = String(record.econtact)
    .includes('@');

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
              emailAddress: record.econtact,
            }
          : {
              phoneNumber: record.econtact,
            },
      },
    ],

    characteristic: [
      {
        name: 'billCode',
        value: record.billCode,
      },
    ],

    state: record.registrationStatus,

    '@type': 'CustomerBill',
  };
}

module.exports = {
  toLegacyDataBundle,
  toTmfCustomerBill,
};