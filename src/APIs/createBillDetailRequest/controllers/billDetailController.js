// src/APIs/createBillDetailRequest/controllers/billDetailController.js

const { success, failure } = require(
  '../../../middleware/response.util'
);

const service = require(
  '../services/billDetailService'
);

/**
 * Select the requested CustomerBill fields.
 *
 * TMF filtering keeps id and href as standard identifying fields.
 */
function selectCustomerBillFields(customerBill, fields) {
  if (!fields) {
    return customerBill;
  }

  const selected = {
    id: customerBill.id,
    href: customerBill.href,
  };

  fields
    .split(',')
    .map((field) => field.trim())
    .filter(Boolean)
    .forEach((field) => {
      if (
        field !== 'id' &&
        field !== 'href' &&
        Object.prototype.hasOwnProperty.call(
          customerBill,
          field
        )
      ) {
        selected[field] = customerBill[field];
      }
    });

  return selected;
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

    const dataBundle = await service.getBillDetail(
      telephoneNo,
      accountNo
    );

    if (!dataBundle) {
      return failure(res, {
        message:
          `No bill found for accountNo '${accountNo}'.`,
        errorCode: 'E404',
        status: 404,
      });
    }

    return success(res, {
      message:
        'Bill details retrieved successfully.',
      dataBundle,
      status: 200,
    });
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
 * Supports:
 * GET /customerBill
 * GET /customerBill?fields=href
 * GET /customerBill?fields=id
 * GET /customerBill?id=<id>
 */
async function listCustomerBills(req, res) {
  try {
    const customerBills =
      await service.getCustomerBills(req.query.id);

    const response = customerBills.map(
      (customerBill) =>
        selectCustomerBillFields(
          customerBill,
          req.query.fields
        )
    );

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
    const customerBill =
      await service.getCustomerBillById(
        req.params.id
      );

    if (!customerBill) {
      return res.status(404).json({
        code: '404',
        reason: 'Not Found',
        message:
          `CustomerBill '${req.params.id}' was not found.`,
      });
    }

    const response = selectCustomerBillFields(
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

    const customerBill =
      await service.updateCustomerBillState(
        req.params.id,
        state.trim()
      );

    if (!customerBill) {
      return res.status(404).json({
        code: '404',
        reason: 'Not Found',
        message:
          `CustomerBill '${req.params.id}' was not found.`,
      });
    }

    return res.status(200).json(customerBill);
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