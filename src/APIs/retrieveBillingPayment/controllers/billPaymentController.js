const service = require('../services/billPaymentService');
const { success, failure, envelope, requiredInput } = require('../../../middleware/response.util');

async function retrieveBillingPayment(req, res) {
  try {
    const input = requiredInput(req.query, ["telephoneNo", "accountNo"]);
    const data = await service.getBillPayment(input.telephoneNo, input.accountNo);
    if (!data) return failure(res, { status: 404, errorCode: 'E404', message: 'No matching payment inquiry was found.' });
    return success(res, { dataBundle: { listofbillingInquiryType: [data] } });
  } catch (error) {
    const status = error.status || 500;
    return failure(res, {
      status, errorCode: `E${status}`,
      message: error.status ? error.message : 'Request failed.',
    });
  }
}

module.exports = { retrieveBillingPayment };
