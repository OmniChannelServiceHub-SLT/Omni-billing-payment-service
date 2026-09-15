// src/APIs/createEBillStatusRequest/mappers/eBillStatusMapper.js

const CUSTOMER_BILL_BASE_PATH =
  '/tmf-api/customerBillManagement/v4/customerBill';

/**
 * Exact legacy dataBundle from Excel sheet "22".
 */
function toLegacyDataBundle(record) {
  return [
    {
      mobileno: record.mobileno,
      emailaddress: record.emailaddress,
    },
  ];
}

/**
 * Convert the eBill status record into a
 * TMF678-aligned CustomerBill resource.
 */
function toTmfCustomerBill(record) {
  const id = String(record._id);

  const contactMedium = [];

  if (record.mobileno) {
    contactMedium.push({
      mediumType: 'telephone',
      characteristic: {
        phoneNumber: record.mobileno,
      },
    });
  }

  if (record.emailaddress) {
    contactMedium.push({
      mediumType: 'email',
      characteristic: {
        emailAddress: record.emailaddress,
      },
    });
  }

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

    contactMedium,

    '@type': 'CustomerBill',
  };
}

module.exports = {
  toLegacyDataBundle,
  toTmfCustomerBill,
};