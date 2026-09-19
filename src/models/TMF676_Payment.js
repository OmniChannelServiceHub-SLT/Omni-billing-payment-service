const mongoose = require('mongoose');

/* TMF676 - Bill Payment Request */
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

BillPaymentSchema.index({
  telephoneNo: 1,
  accountNo: 1,
});

/* Save Invoice */
const SaveInvoiceSchema = new mongoose.Schema(
  {
    refNo: {
      type: String,
      required: true,
      trim: true,
    },
    serviceType: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    packageCount: {
      type: Number,
      required: true,
      min: 1,
    },
    rental: {
      type: Number,
      required: true,
      min: 0,
    },
    initialCharge: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      default: '1',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

SaveInvoiceSchema.index({
  refNo: 1,
  serviceType: 1,
  packageName: 1,
});

/* Invoice Data */
const InvoiceDataSchema = new mongoose.Schema(
  {
    refNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    invoiceData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
    updateStatus: {
      type: String,
      default: 'updated',
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
/* GetPaymentLogs - Excel sheet 114 */
const PaymentLogSchema = new mongoose.Schema(
  {
    logId: String,
    order_ref: {
      type: String,
      required: true,
      trim: true,
    },
    nic_no: String,
    sys_id: String,
    date_enter: String,
    amount: String,
    epoch_val: String,
    gw_ref: String,
    gw_status: String,
    refund_sys: String,
    crm_state: String,
    sys_status: String,
    CRNumber: String,
    AccNo: String,
    refund_ncp: String,
    passport_no: String,
    lastUpdate: String,
    cashierRef: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PaymentLogSchema.index({ order_ref: 1 });
module.exports = {
  BillPayment: mongoose.model('BillPayment', BillPaymentSchema),
  SaveInvoice: mongoose.model('SaveInvoice', SaveInvoiceSchema),
  InvoiceData: mongoose.model('InvoiceData', InvoiceDataSchema),
  PaymentLog: mongoose.model('PaymentLog', PaymentLogSchema),
};