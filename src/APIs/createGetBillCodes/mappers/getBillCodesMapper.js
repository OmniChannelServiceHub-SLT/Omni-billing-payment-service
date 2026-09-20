// src/APIs/createGetBillCodes/mappers/getBillCodesMapper.js

function toLegacyDataBundle(records) {
  return records.map((record) => ({
    bilL_HANDLING_CODE: record.billCode,
    bilL_HANDLING_CODE_NAME:
      record.billCodeName ?? record.billCodeDescription,
    bilL_HANDLING_CODE_DESC: record.billCodeDescription,
  }));
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
