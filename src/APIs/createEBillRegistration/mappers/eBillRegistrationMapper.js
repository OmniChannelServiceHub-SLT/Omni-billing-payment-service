// src/APIs/createEBillRegistration/mappers/eBillRegistrationMapper.js

const CUSTOMER_BILL_BASE_PATH =
  '/tmf-api/customerBillManagement/v4/customerBill';

/**
 * Exact legacy dataBundle from Excel sheet "21".
 */
function toLegacyDataBundle() {
  return null;
}

/**
 * Convert the registration record into a
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
        mediumType: 'EMAIL',
        characteristic: {
          emailAddress: record.newEmailAddress,
          phoneNumber: record.newContactNumber,
        },
      },
    ],

    characteristic: [
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

    state: record.registrationStatus,

    '@type': 'CustomerBill',
  };
}

module.exports = {
  toLegacyDataBundle,
  toTmfCustomerBill,
};