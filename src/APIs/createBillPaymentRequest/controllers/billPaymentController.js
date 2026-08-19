// Row #58 in Omni-Channel-API-Mapping-By-Service.xlsx ("Billing and Payment Service" sheet)
// Legacy source: [AccountOMNI] "BillPaymentRequest" (GET)
// Proposed TMF-Aligned Method Name: createBillPaymentRequest
// NOTE: despite the "create" verb, the source API is a GET (payment lookup),
// so this returns billing/payment summary data, not a new payment.
const { success, failure } = require('../../../middleware/response.util');
const service = require('../services/billPaymentService');

async function createBillPaymentRequest(req, res) {
  try {
    const { telephoneNo, accountNo } = req.query;

    if (!telephoneNo || !accountNo) {
      return failure(res, { message: 'telephoneNo and accountNo are required.', errorCode: 'E400', status: 400 });
    }

    const dataBundle = await service.getBillPayment(telephoneNo, accountNo);

    if (!dataBundle) {
      return failure(res, { message: `No payment/billing record found for accountNo '${accountNo}'`, errorCode: 'E404', status: 404 });
    }

    return success(res, { message: 'createBillPaymentRequest OK', dataBundle });
  } catch (err) {
    return failure(res, { message: err.message, errorCode: 'E500', status: 500 });
  }
}

module.exports = { createBillPaymentRequest };
