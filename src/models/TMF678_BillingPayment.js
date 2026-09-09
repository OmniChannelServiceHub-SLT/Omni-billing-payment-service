// src/models/TMF678_BillingPayment.js
//
// One consolidated model file for the whole Billing & Payment Service,
// matching the convention used in Omni-usage-management-service
// (models/TMF635_UsageManagement.js).
//
// This service covers TWO TM Forum APIs:
//   - TMF678 Customer Bill Management  (BillDetail, BillHistory)
//   - TMF676 Payment Management        (BillPayment)
// All schemas for both live here, since the team convention is one model
// file per SERVICE, not per TMF number.
//
// Field names/shapes below are taken directly from the REAL sample
// responses in API_Params_SLTOMNI_V2_0_1.xlsx (sheets "14", "17", "28"),
// per the team leader's instruction to pull as much as possible from that
// response Excel rather than inventing shapes.

const mongoose = require('mongoose');

/* ---------------------------------------------------------------------- */
/* TMF678 - createBillDetailRequest (row 50, sheet "14")                   */
/* ---------------------------------------------------------------------- */

const BillingInquirySchema = new mongoose.Schema(
  {
    billAmount: String,
    lastBillDate: String,
    paymentDueDate: String,
    lastPaymentDate: String,
    lastPaymentAmount: String,
    outstandingBalance: String,
  },
  { _id: false }
);

const ProductDetailSchema = new mongoose.Schema(
  {
    promotionName: String,
    voicePckg: String,
    voiceStatus: String,
    voiceType: String,
    bbPckg: String,
    bbStatus: String,
    bbType: String,
    peoPckg: String,
    peoStatus: String,
    peoType: String,
    subcriberID: String, // spelled this way in the real response - kept as-is
  },
  { _id: false }
);

const UsageDetailSchema = new mongoose.Schema(
  {
    name: String,
    limit: Number,
    remaining: Number,
    used: Number,
    percentage: Number,
    volume_unit: String,
    expiry_date: String,
  },
  { _id: false }
);

const MyPackageInfoSchema = new mongoose.Schema(
  {
    package_name: String,
    package_summary: { type: String, default: null },
    usageDetails: [UsageDetailSchema],
  },
  { _id: false }
);

const BillDetailSchema = new mongoose.Schema(
  {
    telephoneNo: { type: String, required: true, trim: true },
    accountNo: { type: String, required: true, trim: true },
    listofbillingInquiryType: [BillingInquirySchema],
    listofProductDetail: [ProductDetailSchema],
    myPackageInfo: MyPackageInfoSchema,
  },
  { timestamps: true, versionKey: false }
);
BillDetailSchema.index({ telephoneNo: 1, accountNo: 1 });

/* ---------------------------------------------------------------------- */
/* TMF678 - createBillHistoryRequest (row 56, sheet "17")                  */
/* ---------------------------------------------------------------------- */

const BillHistoryItemSchema = new mongoose.Schema(
  {
    telephoneNo: { type: String, required: true, trim: true },
    accountNumber: { type: String, required: true, trim: true },
    invoiceNumber: String,
    version: String,
    billType: String,
    billSequence: String,
    billStatus: String,
    invoiceNet: String,
    invoiceTax: String,
    invoiceTotal: String,
    actualBillDate: String,
    nominalBillDate: String,
    taxPointDate: String,
    maxBilledEventDate: String,
    payments: String,
    failedPayments: String,
    refunds: String,
    adjustments: String,
    balanceForward: String,
    balanceOutstanding: String,
    accountId: String,
  },
  { timestamps: true, versionKey: false }
);
BillHistoryItemSchema.index({ telephoneNo: 1, accountNumber: 1, actualBillDate: -1 });

/* ---------------------------------------------------------------------- */
/* TMF676 - createBillPaymentRequest (row 58, sheet "28")                  */
/* ---------------------------------------------------------------------- */

const BillPaymentSchema = new mongoose.Schema(
  {
    telephoneNo: { type: String, required: true, trim: true },
    accountNo: { type: String, required: true, trim: true },
    billAmount: String,
    lastBillDate: String,
    paymentDueDate: String,
    lastPaymentDate: String,
    lastPaymentAmount: String,
    outstandingBalance: String,
  },
  { timestamps: true, versionKey: false }
);
/* ---------------------------------------------------------------------- */
/* TMF678 - createBillHistoryRequestV2 (row A90, sheet "90")              */
/* ---------------------------------------------------------------------- */

const BillHistoryV2ItemSchema = new mongoose.Schema(
  {
    telephoneNo: {
      type: String,
      required: true,
      trim: true,
    },

    accountNo: {
      type: String,
      required: true,
      trim: true,
    },

    billMonth: String,
    billValue: String,
    payments: String,
    outstanding: String,
    eBillAvailability: String,
    billCode: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BillHistoryV2ItemSchema.index({
  telephoneNo: 1,
  accountNo: 1,
  billMonth: -1,
});
BillPaymentSchema.index({ telephoneNo: 1, accountNo: 1 });

module.exports = {
  BillDetail: mongoose.model(
    'BillDetail',
    BillDetailSchema
  ),

  BillHistoryItem: mongoose.model(
    'BillHistoryItem',
    BillHistoryItemSchema
  ),

  BillHistoryV2Item: mongoose.model(
    'BillHistoryV2Item',
    BillHistoryV2ItemSchema
  ),

  BillPayment: mongoose.model(
    'BillPayment',
    BillPaymentSchema
  ),
};