// src/APIs/createEBillCheckUserExist/mappers/eBillCheckUserExistMapper.js

/**
 * Exact legacy dataBundle from Excel sheet "24".
 */
function toLegacyDataBundle(record) {
  return {
    userexist: record.userexist,
    referenceNumber: record.referenceNumber,
  };
}

/**
 * Convert the record into a TMF-aligned CustomerBill resource.
 */
function toTmfCustomerBill(record) {
  const id = String(record._id);

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
        mediumType: record.econtactType,
        characteristic: {
          contactType: record.econtactType,
          emailAddress:
            record.econtactType === 'EMAIL'
              ? record.econtact
              : undefined,
          phoneNumber:
            record.econtactType !== 'EMAIL'
              ? record.econtact
              : undefined,
        },
      },
    ],

    characteristic: [
      {
        name: 'userExists',
        value: record.userexist === 'Y',
      },
      {
        name: 'referenceNumber',
        value: record.referenceNumber,
      },
    ],

    '@type': 'CustomerBill',
  };
}

module.exports = {
  toLegacyDataBundle,
  toTmfCustomerBill,
};