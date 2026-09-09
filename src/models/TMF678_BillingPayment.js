// src/models/TMF678_BillingPayment.js
//
// Consolidated model file for the Billing & Payment Service.
//
// TM Forum APIs:
// - TMF678 Customer Bill Management
// - TMF676 Payment Management
//
// Legacy response fields are based on the sample responses in
// API_Params_SLTOMNI_V2_0_1.xlsx.

const mongoose = require('mongoose');

/* ------------------------------------------------------------------ */
/* TMF678 - Bill Detail Request                                       */
/* Row 50 / Response sheet 14                                        */
/* ------------------------------------------------------------------ */

const BillingInquirySchema = new mongoose.Schema(
  {
    billAmount: String,
    lastBillDate: String,
    paymentDueDate: String,
    lastPaymentDate: String,
    lastPaymentAmount: String,
    outstandingBalance: String,
  },
  {
    _id: false,
  }
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

    // This spelling is used in the original response.
    subcriberID: String,
  },
  {
    _id: false,
  }
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
  {
    _id: false,
  }
);

const MyPackageInfoSchema = new mongoose.Schema(
  {
    package_name: String,

    package_summary: {
      type: String,
      default: null,
    },

    usageDetails: [
      UsageDetailSchema,
    ],
  },
  {
    _id: false,
  }
);

const BillDetailSchema = new mongoose.Schema(
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

    /*
     * TMF678 CustomerBill state.
     *
     * This field supports the CTK PATCH operation:
     * PATCH /customerBill/:id
     */
    state: {
      type: String,
      default: 'generated',
      trim: true,
    },

    listofbillingInquiryType: [
      BillingInquirySchema,
    ],

    listofProductDetail: [
      ProductDetailSchema,
    ],

    myPackageInfo: MyPackageInfoSchema,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BillDetailSchema.index({
  telephoneNo: 1,
  accountNo: 1,
});

/* ------------------------------------------------------------------ */
/* TMF678 - Bill History Request                                      */
/* Row 56 / Response sheet 17                                        */
/* ------------------------------------------------------------------ */

const BillHistoryItemSchema = new mongoose.Schema(
  {
    telephoneNo: {
      type: String,
      required: true,
      trim: true,
    },

    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },

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
  {
    timestamps: true,
    versionKey: false,
  }
);

BillHistoryItemSchema.index({
  telephoneNo: 1,
  accountNumber: 1,
  actualBillDate: -1,
});

/* ------------------------------------------------------------------ */
/* TMF676 - Bill Payment Request                                      */
/* Row 58 / Response sheet 28                                        */
/* ------------------------------------------------------------------ */

const BillPaymentSchema = new mongoose.Schema(
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

    billAmount: String,
    lastBillDate: String,
    paymentDueDate: String,
    lastPaymentDate: String,
    lastPaymentAmount: String,
    outstandingBalance: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
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


BillPaymentSchema.index({
  telephoneNo: 1,
  accountNo: 1,
});
/* ------------------------------------------------------------------ */
/* TMF678 - createEBillStatusRequest (row A22, sheet "22")            */
/* ------------------------------------------------------------------ */

const EBillStatusSchema = new mongoose.Schema(
  {
    accountNo: {
      type: String,
      required: true,
      trim: true,
    },

    tpNo: {
      type: String,
      required: true,
      trim: true,
    },

    mobileno: {
      type: String,
      default: null,
    },

    emailaddress: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

EBillStatusSchema.index({
  accountNo: 1,
  tpNo: 1,
});
/* ------------------------------------------------------------------ */
/* Model exports                                                      */
/* ------------------------------------------------------------------ */

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

  EBillStatus: mongoose.model(
    'EBillStatus',
    EBillStatusSchema
  ),
};