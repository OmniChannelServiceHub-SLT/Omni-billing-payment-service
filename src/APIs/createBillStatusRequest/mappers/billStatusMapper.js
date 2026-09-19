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

function toContactMedium(record) {
  const contactMedium = [];

  const values = [
    record.mobile,
    record.email,
  ].filter(Boolean);

  for (const value of values) {
    if (String(value).includes('@')) {
      contactMedium.push({
        mediumType: 'email',
        characteristic: {
          emailAddress: value,
        },
      });
    } else {
      contactMedium.push({
        mediumType: 'telephone',
        characteristic: {
          phoneNumber: value,
        },
      });
    }
  }

  return contactMedium;
}

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

    contactMedium: toContactMedium(record),

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