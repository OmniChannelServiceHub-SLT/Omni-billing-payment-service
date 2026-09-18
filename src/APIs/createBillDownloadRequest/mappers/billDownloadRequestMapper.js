// src/APIs/createBillDownloadRequest/mappers/billDownloadRequestMapper.js

const CUSTOMER_BILL_BASE_PATH =
  '/tmf-api/customerBillManagement/v4/customerBill';

function toLegacyDataBundle() {
  return null;
}

function toTmfCustomerBill(record) {
  const id = String(record._id);

  const response = {
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
        name: 'ebillMonth',
        value: record.ebillMonth,
      },
      {
        name: 'requestType',
        value: 'billDownload',
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