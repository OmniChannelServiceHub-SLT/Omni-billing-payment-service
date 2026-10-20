const service = require('../services/reloadSubscriberService');
const { success, failure, requiredInput } = require('../../../middleware/response.util');

async function reloadSubscriber(req, res) {
  try {
    const body = req.body || {};
    if (typeof body !== 'object' || Array.isArray(body)) {
      const error = new Error('Request body must be a JSON object.'); error.status = 400; throw error;
    }
    const fields = ["LTESLTNumber", "transactionId", "channelCode", "amount"];
    for (const field of fields) {
      if (Object.prototype.hasOwnProperty.call(body, field) && Object.prototype.hasOwnProperty.call(req.query, field)
        && String(body[field]) !== String(req.query[field])) {
        const error = new Error(`${field} differs between query and body.`); error.status = 400; throw error;
      }
    }
    const rawInput = { ...req.query, ...body };
    if (typeof rawInput.transactionId === 'number' && !Number.isSafeInteger(rawInput.transactionId)) {
      const error = new Error('transactionId must be supplied as a string to preserve all digits.'); error.status = 400; throw error;
    }
    const input = requiredInput(rawInput, fields);
    if (!/^94\d{9}$/.test(input.LTESLTNumber)) {
      const error = new Error('LTESLTNumber must use the 94 prefix followed by 9 digits.'); error.status = 400; throw error;
    }
    if (!/^\d+$/.test(input.transactionId)) {
      const error = new Error('transactionId must contain digits only.'); error.status = 400; throw error;
    }
    if (!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(input.amount) || !Number.isFinite(Number(input.amount)) || Number(input.amount) <= 0) {
      const error = new Error('amount must be a positive number.'); error.status = 400; throw error;
    }
    const data = await service.reloadSubscriber(input);
    if (data === null) {
      return failure(res, { status: 404, errorCode: 'E404', message: 'No sample is available for this request.' });
    }
    res.set('X-Interim-Mode', 'mock');
    res.set('Cache-Control', 'no-store');
    return success(res, { dataBundle: data });
  } catch (error) {
    const status = error.status || 500;
    return failure(res, { status, errorCode: `E${status}`, message: error.status ? error.message : 'Request failed.' });
  }
}

module.exports = { reloadSubscriber };
