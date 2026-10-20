const service = require('../services/updateSaveInvoiceService');
const { success, failure, requiredInput } = require('../../../middleware/response.util');

async function updateInvoiceData(req, res) {
  try {
    const input = requiredInput(req.query, ["REF_NO"]);
    const data = await service.updateInvoiceData(input);
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

module.exports = { updateInvoiceData };
