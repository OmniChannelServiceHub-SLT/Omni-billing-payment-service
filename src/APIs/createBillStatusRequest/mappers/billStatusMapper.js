// src/APIs/createBillStatusRequest/mappers/billStatusMapper.js

const CUSTOMER_BILL_BASE_PATH =
  '/tmf-api/customerBillManagement/v4/customerBill';

/**
 * Exact legacy dataBundle from Excel sheet "147".
 */
function toLegacyDataBundle(record) {
  return {
    bill_code: record.bill_code,
    bill_code_desc: record.bill_code_desc,
    mobile: record.mobile,
    email: record.email,

    possiblebillmodelist: (
      record.possiblebillmodelist || []
    ).map((item) => ({
      bill_code: item.bill_code,
      bill_code_desc: item.bill_code_desc,
    })),
  };
}

/**
 * Convert the bill status record into a
 * TMF678-aligned CustomerBill resource.
 */
function toTmfCustomerBill(record) {
  const id = String(record._id);

  const contactMedium = [];

  if (record.mobile) {
    contactMedium.push({
      mediumType: 'telephone',
      characteristic: {
        phoneNumber: record.mobile,
      },
    });
  }

  if (record.email) {
    contactMedium.push({
      mediumType: 'email',
      characteristic: {
        emailAddress: record.email,
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

    billCode: record.bill_code,
    billCodeDescription: record.bill_code_desc,

    availableBillModes: (
      record.possiblebillmodelist || []
    ).map((item) => ({
      code: item.bill_code,
      description: item.bill_code_desc,
    })),

    '@type': 'CustomerBill',
  };
}

module.exports = {
  toLegacyDataBundle,
  toTmfCustomerBill,
};