// src/APIs/createBillDetailRequest/services/billDetailService.js

const {
  BillDetail,
} = require('../../../models/TMF678_BillingPayment');

/**
 * Retrieve bill details using telephone number and account number.
 *
 * Row #50 in Omni-Channel-API-Mapping-By-Service.xlsx
 * Legacy API: AccountOMNI/BillDetailRequest
 * TMF API: TMF678 Customer Bill Management v4
 */
async function getBillDetail(telephoneNo, accountNo) {
  const record = await BillDetail.findOne({
    telephoneNo,
    accountNo,
  }).lean();

  if (!record) {
    return null;
  }

  return {
    listofbillingInquiryType:
      record.listofbillingInquiryType || [],

    listofProductDetail:
      record.listofProductDetail || [],

    myPackageInfo:
      record.myPackageInfo || {},
  };
}

module.exports = {
  getBillDetail,
};