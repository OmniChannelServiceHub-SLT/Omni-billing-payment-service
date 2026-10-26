const { BillDetail } = require('../../../models/TMF678_BillingPayment');

async function getBillDetail(telephoneNo, accountNo) {
  return BillDetail.findOne({ telephoneNo, accountNo })
    .select('listofbillingInquiryType listofProductDetail myPackageInfo -_id').lean();
}
module.exports = { getBillDetail };


const { TmfAppliedCustomerBillingRate } = require('../../../models/TMF678_BillingPayment');
module.exports.listTmfAppliedCustomerBillingRate = query => TmfAppliedCustomerBillingRate.listTmf(query);
module.exports.getTmfAppliedCustomerBillingRate = (id, query) => TmfAppliedCustomerBillingRate.getTmf(id, query);
