// src/APIs/createSmartBillSendRequest/mappers/smartBillSendRequestMapper.js

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

    characteristic: [
      {
        name: 'billRequestingMonth',
        value: record.billRequestingMonth,
      },
      {
        name: 'billCode',
        value: record.billCode,
      },
      {
        name: 'smsEnabled',
        value: record.isEnableSms,
      },
      {
        name: 'alreadyRegistered',
        value: record.isAlreadyRegistered,
      },
      {
        name: 'prestigeCustomer',
        value: record.isPrestigeCustomer,
      },
    ],

    state: record.requestStatus,

    '@type': 'CustomerBill',
  };

  if (record.tpNo) {
    response.relatedParty = [
      {
        id: record.tpNo,
        role: 'subscriber',
        '@referredType': 'Individual',
      },
    ];
  }

  if (record.econtact) {
    const isEmail = record.econtact.includes('@');

    response.contactMedium = [
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
    ];
  }

  return response;
}

module.exports = {
  toLegacyDataBundle,
  toTmfCustomerBill,
};