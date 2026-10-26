const service = require('../services/billHistoryV2Service');
const { success, failure, requiredInput } = require('../../../middleware/response.util');

async function listCustomerBill(req, res) {
  try {
    // Local contract: require both identifiers until upstream requiredness is confirmed.
    const input = requiredInput(req.query, ['telephoneNo', 'accountNo']);
    const records = await service.getBillHistoryV2(input.telephoneNo, input.accountNo);
    return success(res, { dataBundle: { listofBillHistoryDetail: records } });
  } catch (error) {
    const status = error.status || 500;
    return failure(res, {
      status,
      errorCode: `E${status}`,
      message: error.status ? error.message : 'Request failed.',
    });
  }
}

module.exports = { listCustomerBill };


const { tmfList, tmfOne } = require('../../../middleware/response.util');
module.exports.listTmfCustomerBill = async (req, res) => tmfList(res, req, 'customerBill', await service.listTmfCustomerBill(req.query));
module.exports.getTmfCustomerBill = async (req, res) => tmfOne(res, req, 'customerBill', await service.getTmfCustomerBill(req.params.id, req.query));
module.exports.patchTmfCustomerBill = async (req, res) => tmfOne(res, req, 'customerBill', await service.patchTmfCustomerBill(req.params.id, req.body, req.get('If-Match')));
