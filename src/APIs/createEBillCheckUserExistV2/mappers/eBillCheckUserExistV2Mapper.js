// src/APIs/createEBillCheckUserExistV2/mappers/eBillCheckUserExistV2Mapper.js

const baseMapper = require(
  '../../createEBillCheckUserExist/mappers/eBillCheckUserExistMapper'
);

/**
 * V2 uses the same legacy response defined in Excel sheet "24".
 */
function toLegacyDataBundle(record) {
  return baseMapper.toLegacyDataBundle(record);
}

/**
 * V2 uses the same TMF-aligned CustomerBill representation.
 */
function toTmfCustomerBill(record) {
  return baseMapper.toTmfCustomerBill(record);
}

module.exports = {
  toLegacyDataBundle,
  toTmfCustomerBill,
};