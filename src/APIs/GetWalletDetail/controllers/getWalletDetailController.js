const service = require('../services/getWalletDetailService');
const { success, failure, requiredInput } = require('../../../middleware/response.util');

async function getWalletDetail(req, res) {
  try {
    const input = requiredInput(req.query, ["LTESLTNumber"]);
    if (!/^94\d{9}$/.test(input.LTESLTNumber)) {
      const error = new Error('LTESLTNumber must use the 94 prefix followed by 9 digits.'); error.status = 400; throw error;
    }
    const data = await service.getWalletDetail(input);
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

module.exports = { getWalletDetail };
