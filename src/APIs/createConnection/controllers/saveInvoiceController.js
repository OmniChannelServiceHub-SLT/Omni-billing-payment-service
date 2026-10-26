const service = require('../services/saveInvoiceService');
const { success, failure, envelope, requiredInput } = require('../../../middleware/response.util');

async function createConnection(req, res) {
  try {
    const input = requiredInput(req.body, ["REF_NO", "SERVICE_TYPE", "PACKAGE_NAME", "PACKAGE_COUNT", "RENTAL", "STATUS"]);
    for (const key of ['PACKAGE_COUNT', 'RENTAL', 'INI_CHARGE']) {
      const value = key === 'INI_CHARGE' ? req.body.INI_CHARGE : input[key];
      if (key === 'INI_CHARGE' && (value === undefined || value === null || value === '')) { input[key] = null; continue; }
      if (!['number', 'string'].includes(typeof value) || String(value).trim() === '' || !Number.isFinite(Number(value)) || Number(value) < 0 || key === 'PACKAGE_COUNT' && (!Number.isInteger(Number(value)) || Number(value) < 1)) {
        const error = new Error(`${key} is invalid.`); error.status = 400; throw error;
      }
      input[key] = Number(value);
    }
    const record = await service.saveInvoice(input);
    if (!record) throw new Error('Invoice was not saved.');
    return success(res);
  } catch (error) {
    const status = error.status || 500;
    return failure(res, {
      status, errorCode: `E${status}`,
      message: error.status ? error.message : 'Request failed.',
    });
  }
}

module.exports = { createConnection };


const { tmfList, tmfOne } = require('../../../middleware/response.util');
module.exports.listTmfCustomerBillOnDemand = async (req, res) => tmfList(res, req, 'customerBillOnDemand', await service.listTmfCustomerBillOnDemand(req.query));
module.exports.getTmfCustomerBillOnDemand = async (req, res) => tmfOne(res, req, 'customerBillOnDemand', await service.getTmfCustomerBillOnDemand(req.params.id, req.query));
module.exports.createTmfCustomerBillOnDemand = async (req, res) => tmfOne(res, req, 'customerBillOnDemand', await service.createTmfCustomerBillOnDemand(req.body, req.identity), 201);
