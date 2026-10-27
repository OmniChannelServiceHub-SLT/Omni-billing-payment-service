const { BillCode } = require('../../../models/TMF678_BillingPayment');

async function getBillCodes() {
  return BillCode.find({ isActive: true }).sort({ displayOrder: 1, billCode: 1 }).lean();
}
module.exports = { getBillCodes };


function mediaResource(row){return {id:row.billCode,href:'/tmf-api/customerBillManagement/v4/bill-codes/'+encodeURIComponent(row.billCode),'@type':'BillPresentationMedia',name:row.billCodeName||row.billCodeDescription,description:row.billCodeDescription};}
module.exports.mediaList=async()=>(await getBillCodes()).map(mediaResource);
module.exports.mediaGet=async id=>{const row=await BillCode.findOne({billCode:id,isActive:true}).lean();return row?mediaResource(row):null;};

