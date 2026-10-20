const service = require('../services/viewTransactionsHistoryService');
const { success, failure, requiredInput } = require('../../../middleware/response.util');

async function viewTransactionsHistory(req, res) {
  try {
    const input = requiredInput(req.query, ["fromDate", "toDate", "LTESLTNumber"]);
    if (!/^94\d{9}$/.test(input.LTESLTNumber)) {
      const error = new Error('LTESLTNumber must use the 94 prefix followed by 9 digits.'); error.status = 400; throw error;
    }
    for (const field of ['fromDate', 'toDate']) {
      const value = input[field];
      const match = /^(\d{4})(\d{2})(\d{2})$/.exec(value);
      if (!match) {
        const error = new Error(`${field} must be a valid YYYYMMDD date.`); error.status = 400; throw error;
      }
      const year = Number(match[1]), month = Number(match[2]), day = Number(match[3]);
      const date = new Date(Date.UTC(year, month - 1, day));
      if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
        const error = new Error(`${field} must be a valid YYYYMMDD date.`); error.status = 400; throw error;
      }
    }
    if (input.fromDate > input.toDate) {
      const error = new Error('fromDate must not be after toDate.'); error.status = 400; throw error;
    }
    const data = await service.viewTransactionsHistory(input);
    if (data === null) {
      return failure(res, { status: 404, errorCode: 'E404', message: 'No sample is available for this request.' });
    }
    res.set('X-Interim-Mode', 'mock');
    res.set('Cache-Control', 'no-store');
    return res.status(200).json(data);
  } catch (error) {
    const status = error.status || 500;
    return failure(res, { status, errorCode: `E${status}`, message: error.status ? error.message : 'Request failed.' });
  }
}

module.exports = { viewTransactionsHistory };
