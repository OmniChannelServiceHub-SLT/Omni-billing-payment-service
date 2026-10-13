const { BillDetail } = require('../../../models/TMF678_BillingPayment');

async function getBillDetail(telephoneNo, accountNo) {
  return BillDetail.findOne({ telephoneNo, accountNo })
    .select('listofbillingInquiryType listofProductDetail myPackageInfo -_id').lean();
}
module.exports = { getBillDetail };
