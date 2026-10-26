const service = require('../services/eBillRegistrationService');
const { success, failure, envelope, requiredInput } = require('../../../middleware/response.util');

async function patchBillingAccount(req, res) {
  try {
    const input = requiredInput(req.query, ["eventSource", "newEmailAddress", "newContactNumber", "accountNumber", "isEnableSms", "isAlreadyRegistered", "isPrestigeCustomer"]);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.newEmailAddress)) {
      const error = new Error('newEmailAddress is invalid.'); error.status = 400; throw error;
    }
    for (const key of ['isEnableSms', 'isAlreadyRegistered', 'isPrestigeCustomer']) {
      if (!/^(true|false)$/i.test(input[key])) {
        const error = new Error(`${key} must be True or False.`); error.status = 400; throw error;
      }
      input[key] = input[key].toLowerCase() === 'true';
    }
    const guard = req.app.locals.billDeliveryGuard;
    if (guard) {
      if (await guard({ identity: req.identity, input, request: req }) !== true) {
        const error = new Error('Account ownership or OTP verification failed.'); error.status = 403; throw error;
      }
    } else if (['development', 'test'].includes(process.env.NODE_ENV) && process.env.OTP_MODE === 'mock') {
      res.set('X-Bill-Delivery-Verification', 'mock');
    } else {
      const error = new Error('Account ownership and OTP verification integration is not configured.'); error.status = 503; throw error;
    }
    const record = await service.registerEBill(input);
    if (!record) throw new Error('Registration was not saved.');
    return success(res, { message: 'Successfully Updated.' });
  } catch (error) {
    const status = error.status || 500;
    return failure(res, {
      status, errorCode: `E${status}`,
      message: error.status ? error.message : 'Request failed.',
    });
  }
}

module.exports = { patchBillingAccount };
