// Row #50 in Omni-Channel-API-Mapping-By-Service.xlsx ("Billing and Payment Service" sheet)
// Legacy source: [AccountOMNI] "BillDetailRequest" (GET)
const { BillDetail } = require('../../../models/TMF678_BillingPayment');

async function getBillDetail(telephoneNo, accountNo) {
  const record = await BillDetail.findOne({ telephoneNo, accountNo });
  if (!record) return null;

  // Matches real dataBundle shape from API_Params_SLTOMNI_V2_0_1.xlsx sheet "14"
  return {
    listofbillingInquiryType: record.listofbillingInquiryType,
    listofProductDetail: record.listofProductDetail,
    myPackageInfo: record.myPackageInfo,
  };
}

module.exports = { getBillDetail };
