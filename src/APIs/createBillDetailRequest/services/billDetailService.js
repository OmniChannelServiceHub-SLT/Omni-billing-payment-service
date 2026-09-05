// src/APIs/createBillDetailRequest/services/billDetailService.js

const mongoose = require('mongoose');

const {
  BillDetail,
} = require('../../../models/TMF678_BillingPayment');

const CUSTOMER_BILL_BASE_PATH =
  '/tmf-api/customerBillManagement/v4/customerBill';

/**
 * Map a BillDetail database record to a TMF678 CustomerBill.
 */
function mapToCustomerBill(record) {
  const id = record._id.toString();

  return {
    id,

    href: `${CUSTOMER_BILL_BASE_PATH}/${id}`,

    billDocument: [
      {
        id: `${id}-document`,
      },
    ],

    billingAccount: {
      id: record.accountNo,
    },

    state: record.state || 'generated',

    listofbillingInquiryType:
      record.listofbillingInquiryType || [],

    listofProductDetail:
      record.listofProductDetail || [],

    myPackageInfo:
      record.myPackageInfo || {},
  };
}

/**
 * Retrieve the original Excel-based Bill Detail response.
 */
async function getBillDetail(
  telephoneNo,
  accountNo
) {
  const record = await BillDetail.findOne({
    telephoneNo,
    accountNo,
  }).lean();

  if (!record) {
    return null;
  }

  return {
    listofbillingInquiryType:
      record.listofbillingInquiryType || [],

    listofProductDetail:
      record.listofProductDetail || [],

    myPackageInfo:
      record.myPackageInfo || {},
  };
}

/**
 * Retrieve CustomerBill resources.
 *
 * Supports:
 * GET /customerBill
 * GET /customerBill?id=<id>
 */
async function getCustomerBills(id) {
  const filter = {};

  if (id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return [];
    }

    filter._id = id;
  }

  const records = await BillDetail.find(filter)
    .sort({ createdAt: -1 })
    .lean();

  return records.map(mapToCustomerBill);
}

/**
 * Retrieve one CustomerBill by ID.
 */
async function getCustomerBillById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const record = await BillDetail.findById(id)
    .lean();

  if (!record) {
    return null;
  }

  return mapToCustomerBill(record);
}

/**
 * Update the state of a CustomerBill.
 *
 * Supports:
 * PATCH /customerBill/:id
 */
async function updateCustomerBillState(
  id,
  state
) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const updatedRecord =
    await BillDetail.findByIdAndUpdate(
      id,
      {
        $set: {
          state,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

  if (!updatedRecord) {
    return null;
  }

  return mapToCustomerBill(updatedRecord);
}

module.exports = {
  getBillDetail,
  getCustomerBills,
  getCustomerBillById,
  updateCustomerBillState,
};