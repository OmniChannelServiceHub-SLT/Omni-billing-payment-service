// src/APIs/createGetBillCodes/mappers/getBillCodesMapper.js

function toLegacyDataBundle(records) {
  return {
    possiblebillmodelist: records.map(
      (record) => ({
        bill_code: record.billCode,
        bill_code_desc:
          record.billCodeDescription,
      })
    ),
  };
}

function toTmfBillCodes(records) {
  return records.map((record) => ({
    id: String(record._id),

    name: 'billCode',

    value: record.billCode,

    description:
      record.billCodeDescription,

    status: record.isActive
      ? 'active'
      : 'inactive',

    '@type': 'Characteristic',
  }));
}

module.exports = {
  toLegacyDataBundle,
  toTmfBillCodes,
};