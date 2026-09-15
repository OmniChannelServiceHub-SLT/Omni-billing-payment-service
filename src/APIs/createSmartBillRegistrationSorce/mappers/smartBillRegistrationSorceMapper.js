// src/APIs/createSmartBillRegistrationSorce/mappers/smartBillRegistrationSorceMapper.js

const CUSTOMER_BILL_BASE_PATH =
  '/tmf-api/customerBillManagement/v4/customerBill';

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

    href: `${CUSTOMER_BILL_BASE_PATH}/${id}`,

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