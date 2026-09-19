// src/APIs/createEBillDownloadRequest/mappers/eBillDownloadRequestMapper.js

function toLegacyDataBundle() {
  return null;
}

function toTmfCustomerBill(record) {
  const id = String(record._id);

  const response = {
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

    characteristic: [
      {
        name: 'ebillMonth',
        value: record.ebillMonth,
      },
      {
        name: 'requestType',
        value: 'download',
      },
    ],

    state: record.downloadStatus,

    '@type': 'CustomerBill',
  };

  if (record.eContact) {
    const isEmail = record.eContact.includes('@');

    response.contactMedium = [
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
    ];
  }

  return response;
}

module.exports = {
  toLegacyDataBundle,
  toTmfCustomerBill,
};