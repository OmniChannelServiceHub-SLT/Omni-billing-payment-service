// src/APIs/createBillDetailRequest/services/billDetailService.js

const mongoose = require('mongoose');

const {
  BillDetail,
} = require('../../../models/TMF678_BillingPayment');

/**
 * Retrieve one bill using telephone number
 * and account number.
 */
async function getBillDetail(
  telephoneNo,
  accountNo
) {
  return BillDetail.findOne({
    telephoneNo,
    accountNo,
  }).lean();
}

/**
 * Retrieve CustomerBill database records.
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

  return BillDetail.find(filter)
    .sort({
      createdAt: -1,
    })
    .lean();
}

/**
 * Retrieve one CustomerBill record by ID.
 */
async function getCustomerBillById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return BillDetail.findById(id).lean();
}

/**
 * Update the state of a CustomerBill record.
 */
async function updateCustomerBillState(
  id,
  state
) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return BillDetail.findByIdAndUpdate(
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
}

module.exports = {
  getBillDetail,
  getCustomerBills,
  getCustomerBillById,
  updateCustomerBillState,
};