const service = require('../services/eBillCheckUserExistV2Service');
const { success, failure, envelope, requiredInput } = require('../../../middleware/response.util');

async function validateBillDelivery(req, res) {
  try {
    const input = requiredInput(req.query, ["accountNo"]);
    const provider = req.app.locals.otpProvider;
    const record = await service.checkEBillUserExistV2(input.accountNo, provider);
    if (!record) return failure(res, { status: 404, errorCode: 'E404', message: 'No matching eBill account was found.' });
    if (record.userexist === 'N' && (!provider && process.env.OTP_MODE === 'mock' || provider && provider.mode === 'mock')) res.set('x-otp-mode', 'mock');
    return success(res, {
      message: record.responseMessage,
      dataBundle: { userexist: record.userexist, referenceNumber: record.referenceNumber },
    });
  } catch (error) {
    const status = error.status || 500;
    return failure(res, {
      status, errorCode: `E${status}`,
      message: error.status ? error.message : 'Request failed.',
    });
  }
}

module.exports = { validateBillDelivery };
