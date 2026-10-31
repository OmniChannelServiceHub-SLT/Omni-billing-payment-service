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



const { money,sltType }=require('../../../middleware/response.util');
function historyResource(row){const id=String(row._id);return {id,...sltType('SLTCustomerBillHistory'),'@baseType':'CustomerBill',href:'/tmf-api/customerBillManagement/v4/bill-history-v2/'+id,billingAccount:{id:row.accountNo,'@referredType':'BillingAccount'},amountDue:money(row.billValue),lastUpdate:row.updatedAt?new Date(row.updatedAt).toISOString():undefined,
 sltBillingHistory:{billMonth:row.billMonth,billViewMonth:row.billViewMonth,billCode:row.billCode,eBillAvailability:row.eBillAvailability,telephoneNo:row.telephoneNo,sourcePayments:money(row.payments),sourceOutstanding:money(row.outstanding)}};}
module.exports.historyList=async(telephoneNo,accountNo)=>(await BillHistoryV2Item.find({telephoneNo,accountNo}).sort({billViewMonth:-1,billMonth:-1,_id:-1}).lean()).map(historyResource);
module.exports.historyGet=async id=>{if(!/^[a-f0-9]{24}$/i.test(id))return null;const row=await BillHistoryV2Item.findById(id).lean();return row?historyResource(row):null;};
