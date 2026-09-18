// src/APIs/createEBillDownloadRequest/services/eBillDownloadRequestService.js

const {
  EBillDownloadRequest,
} = require('../../../models/TMF678_BillingPayment');

async function getEBillDownloadRequest(
  accountNo,
  ebillMonth,
  tpNo
) {
  const record =
    await EBillDownloadRequest.findOne({
      accountNo,
      ebillMonth,
      tpNo,
    }).lean();

  return record;
}

module.exports = {
  getEBillDownloadRequest,
};