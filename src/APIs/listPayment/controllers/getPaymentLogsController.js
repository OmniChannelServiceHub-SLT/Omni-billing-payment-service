const service = require('../services/getPaymentLogsService');
const { success, failure, envelope, requiredInput } = require('../../../middleware/response.util');

async function listPayment(req, res) {
  try {
    const input = requiredInput(req.query, ["orderreff"]);
    const records = await service.getPaymentLogs(input.orderreff);
    const dataBundle = records.map(record => ({
      id: record.logId, order_ref: record.order_ref, nic_no: record.nic_no,
      sys_id: record.sys_id, date_enter: record.date_enter, amount: record.amount,
      epoch_val: record.epoch_val, gw_ref: record.gw_ref, gw_status: record.gw_status,
      refund_sys: record.refund_sys, crm_state: record.crm_state, sys_status: record.sys_status,
      CRNumber: record.CRNumber, AccNo: record.AccNo, refund_ncp: record.refund_ncp,
      passport_no: record.passport_no, lastUpdate: record.lastUpdate, cashierRef: record.cashierRef,
    }));
    // The latest source output stops after errorShow; do not invent errorCode.
    return res.status(200).json({ isSuccess: true, errorMessege: null, exceptionDetail: null, dataBundle, errorShow: null });
  } catch (error) {
    const status = error.status || 500;
    return failure(res, {
      status, errorCode: `E${status}`,
      message: error.status ? error.message : 'Request failed.',
    });
  }
}

module.exports = { listPayment };
