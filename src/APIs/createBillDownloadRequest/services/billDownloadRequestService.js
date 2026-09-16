// src/APIs/createBillDownloadRequest/services/billDownloadRequestService.js

const {
  BillDownloadRequest,
} = require('../../../models/TMF678_BillingPayment');

async function getBillDownloadRequest(
  accountNo,
  ebillMonth,
  tpNo
) {
  const record =
    await BillDownloadRequest.findOne({
      accountNo,
      ebillMonth,
      tpNo,
    }).lean();

  return record;
}

module.exports = {
  getBillDownloadRequest,
};