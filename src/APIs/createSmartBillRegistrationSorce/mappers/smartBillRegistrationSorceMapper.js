// src/APIs/createSmartBillRegistrationSorce/mappers/smartBillRegistrationSorceMapper.js

/**
 * No separate legacy response sample is available
 * for this source operation.
 */
function toLegacyDataBundle() {
  return null;
}

/**
 * Convert the registration source record into a
 * TMF-aligned CustomerBill resource.
 */
function toTmfCustomerBill(record) {
  const id = String(record._id);

  return {
    id,

    billingAccount: {
      id: record.accountNumber,
    },

    relatedParty: [
      {
        id: record.eventSource,
        role: 'subscriber',
        '@referredType': 'Individual',
      },
    ],

    contactMedium: [
      {
        mediumType: 'PHONE',
        characteristic: {
          phoneNumber: record.billingContact,
        },
      },
    ],

    characteristic: [
      {
        name: 'billHandingCode',
        value: record.billHandingCode,
      },
      {
        name: 'sourceTypeId',
        value: record.sourceTypeId,
      },
      {
        name: 'customerConfirmed',
        value: record.isCustomerConfirmed,
      },
      {
        name: 'prestigeCustomer',
        value: record.isPrestigeCustomer,
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