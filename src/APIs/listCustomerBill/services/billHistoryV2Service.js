const { BillHistoryV2Item } = require('../../../models/TMF678_BillingPayment');

async function getBillHistoryV2(telephoneNo, accountNo) {
  return BillHistoryV2Item.find({ telephoneNo, accountNo })
    .select('billMonth billValue payments outstanding eBillAvailability billCode billViewMonth -_id')
    .sort({ billViewMonth: -1, billMonth: -1, _id: -1 })
    .lean();
}

module.exports = { getBillHistoryV2 };


const { TmfCustomerBill } = require('../../../models/TMF678_BillingPayment');
module.exports.listTmfCustomerBill = query => TmfCustomerBill.listTmf(query);
module.exports.getTmfCustomerBill = (id, query) => TmfCustomerBill.getTmf(id, query);
module.exports.patchTmfCustomerBill = (id, body, ifMatch) => TmfCustomerBill.patchTmf(id, body, ifMatch);
