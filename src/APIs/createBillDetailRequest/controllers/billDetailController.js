// src/APIs/createBillDetailRequest/controllers/billDetailController.js

const {
  failure,
} = require('../../../middleware/response.util');

const service = require(
  '../services/billDetailService'
);

const mapper = require(
  '../mappers/billDetailMapper'
);

/**
 * Check whether the client requested the
 * original SLTOMNI response format.
 */
function isLegacyResponse(req) {
  return String(
    req.headers['x-response-format'] || ''
  )
    .trim()
    .toLowerCase() === 'legacy';
}

/**
 * Existing Bill Detail Request endpoint.
 *
 * GET /bill-detail
 */
async function createBillDetailRequest(req, res) {
  try {
    const { telephoneNo, accountNo } = req.query;

    if (!telephoneNo || !accountNo) {
      return failure(res, {
        message:
          'telephoneNo and accountNo are required.',
        errorCode: 'E400',
        status: 400,
      });
    }

    const billDetailRecord =
      await service.getBillDetail(
        telephoneNo,
        accountNo
      );

    if (!billDetailRecord) {
      return failure(res, {
        message:
          `No bill found for accountNo '${accountNo}'.`,
        errorCode: 'E404',
        status: 404,
      });
    }

    /*
     * Original response from
     * API_Params_SLTOMNI_V2_0_1.xlsx sheet "14".
     */
    if (isLegacyResponse(req)) {
      return res.status(200).json({
        isSuccess: true,
        errorMessege: null,
        exceptionDetail: null,

        dataBundle:
          mapper.mapToLegacyResponse(
            billDetailRecord
          ),

        errorShow: null,
        errorCode: null,
      });
    }

    /*
     * Default TMF678 response.
     * CTK requests must not include
     * x-response-format: legacy.
     */
    const customerBill =
      mapper.mapToCustomerBill(
        billDetailRecord
      );

    return res.status(200).json([
      customerBill,
    ]);
  } catch (error) {
    console.error(
      '[BillDetail] Failed to retrieve bill details:',
      error.message
    );

    return failure(res, {
      message: 'Failed to retrieve bill details.',
      errorCode: 'E500',
      exceptionDetail:
        process.env.NODE_ENV === 'production'
          ? null
          : error.message,
      status: 500,
    });
  }
}

/**
 * Retrieve a list of CustomerBill resources.
 *
 * GET /customerBill
 * GET /customerBill?fields=href
 * GET /customerBill?fields=id
 * GET /customerBill?id=<id>
 */
async function listCustomerBills(req, res) {
  try {
    const records =
      await service.getCustomerBills(
        req.query.id
      );

    const response = records.map((record) => {
      const customerBill =
        mapper.mapToCustomerBill(record);

      return mapper.selectCustomerBillFields(
        customerBill,
        req.query.fields
      );
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(
      '[CustomerBill] Failed to retrieve bills:',
      error.message
    );

    return res.status(500).json({
      code: '500',
      reason: 'Internal Server Error',
      message:
        'Failed to retrieve customer bills.',
    });
  }
}

/**
 * Retrieve one CustomerBill resource by ID.
 *
 * GET /customerBill/:id
 */
async function getCustomerBillById(req, res) {
  try {
    const record =
      await service.getCustomerBillById(
        req.params.id
      );

    if (!record) {
      return res.status(404).json({
        code: '404',
        reason: 'Not Found',
        message:
          `CustomerBill '${req.params.id}' was not found.`,
      });
    }

    const customerBill =
      mapper.mapToCustomerBill(record);

    const response =
      mapper.selectCustomerBillFields(
        customerBill,
        req.query.fields
      );

    return res.status(200).json(response);
  } catch (error) {
    console.error(
      '[CustomerBill] Failed to retrieve bill:',
      error.message
    );

    return res.status(500).json({
      code: '500',
      reason: 'Internal Server Error',
      message:
        'Failed to retrieve the customer bill.',
    });
  }
}

/**
 * Update a CustomerBill resource.
 *
 * PATCH /customerBill/:id
 */
async function updateCustomerBill(req, res) {
  try {
    const { state } = req.body;

    if (
      typeof state !== 'string' ||
      !state.trim()
    ) {
      return res.status(400).json({
        code: '400',
        reason: 'Bad Request',
        message:
          'A valid state value is required.',
      });
    }

    const updatedRecord =
      await service.updateCustomerBillState(
        req.params.id,
        state.trim()
      );

    if (!updatedRecord) {
      return res.status(404).json({
        code: '404',
        reason: 'Not Found',
        message:
          `CustomerBill '${req.params.id}' was not found.`,
      });
    }

    const customerBill =
      mapper.mapToCustomerBill(
        updatedRecord
      );

    return res
      .status(200)
      .json(customerBill);
  } catch (error) {
    console.error(
      '[CustomerBill] Failed to update bill:',
      error.message
    );

    return res.status(500).json({
      code: '500',
      reason: 'Internal Server Error',
      message:
        'Failed to update the customer bill.',
    });
  }
}

module.exports = {
  createBillDetailRequest,
  listCustomerBills,
  getCustomerBillById,
  updateCustomerBill,
};