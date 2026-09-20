// src/models/TMF678_BillingPayment.js
//
// Models for TMF678 Customer Bill Management.
// Legacy response fields follow API_Params_SLTOMNI_V2_0_1.xlsx.

const mongoose = require('mongoose');

/* ------------------------------------------------------------------ */
/* Bill Detail Request                                                */
/* Row 50 / Response sheet 14                                         */
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

    // Spelling used in the original response.
    subcriberID: String,
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
    package_summary: {
      type: String,
      default: null,
    },
    usageDetails: [UsageDetailSchema],
  },
  { _id: false }
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
    state: {
      type: String,
      default: 'generated',
      trim: true,
    },
    listofbillingInquiryType: [BillingInquirySchema],
    listofProductDetail: [ProductDetailSchema],
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
/* Bill History Request                                               */
/* Row 56 / Response sheet 17                                         */
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
/* Bill History Request V2                                            */
/* Row A90 / Response sheet 90                                        */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* eBill Status Request                                               */
/* Row A22 / Response sheet 22                                        */
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
/* Bill Status Request                                                */
/* Row A147 / Response sheet 147                                      */
/* ------------------------------------------------------------------ */

const BillStatusSchema = new mongoose.Schema(
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
    bill_code: String,
    bill_code_desc: String,
    mobile: String,
    email: String,
    possiblebillmodelist: [
      {
        _id: false,
        bill_code: String,
        bill_code_desc: String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BillStatusSchema.index({
  accountNo: 1,
  tpNo: 1,
});

/* ------------------------------------------------------------------ */
/* SMS Service Status Request                                         */
/* Response sheet 23                                                  */
/* ------------------------------------------------------------------ */

const SMSServiceStatusSchema = new mongoose.Schema(
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
    serviceAvailable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

SMSServiceStatusSchema.index({
  accountNo: 1,
  tpNo: 1,
});

/* ------------------------------------------------------------------ */
/* eBill Check User Exist                                             */
/* Response sheet 24                                                  */
/* ------------------------------------------------------------------ */

const EBillUserCheckSchema = new mongoose.Schema(
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
    econtact: {
      type: String,
      required: true,
      trim: true,
    },
    econtactType: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    userexist: {
      type: String,
      default: 'N',
    },
    referenceNumber: {
      type: String,
      default: null,
    },
    responseMessage: {
      type: String,
      default: 'New User,OTP Sent',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

EBillUserCheckSchema.index({
  accountNo: 1,
  tpNo: 1,
  econtact: 1,
  econtactType: 1,
});

/* ------------------------------------------------------------------ */
/* eBill Registration                                                 */
/* Response sheet 21                                                  */
/* ------------------------------------------------------------------ */

const EBillRegistrationSchema = new mongoose.Schema(
  {
    eventSource: {
      type: String,
      required: true,
      trim: true,
    },
    newEmailAddress: {
      type: String,
      default: '',
      trim: true,
    },
    newContactNumber: {
      type: String,
      default: '',
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    isEnableSms: {
      type: Boolean,
      default: false,
    },
    isAlreadyRegistered: {
      type: Boolean,
      default: false,
    },
    isPrestigeCustomer: {
      type: Boolean,
      default: false,
    },
    registrationStatus: {
      type: String,
      default: 'updated',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

EBillRegistrationSchema.index({
  accountNumber: 1,
  eventSource: 1,
});

/* ------------------------------------------------------------------ */
/* Smart Bill Registration Sorce                                      */
/* Mapping row 77                                                    */
/* ------------------------------------------------------------------ */

const SmartBillRegistrationSorceSchema =
  new mongoose.Schema(
    {
      eventSource: {
        type: String,
        required: true,
        trim: true,
      },
      accountNumber: {
        type: String,
        required: true,
        trim: true,
      },
      billingContact: {
        type: String,
        required: true,
        trim: true,
      },
      billHandingCode: {
        type: String,
        required: true,
        trim: true,
      },
      sourceTypeId: {
        type: String,
        required: true,
        trim: true,
      },
      isCustomerConfirmed: {
        type: Boolean,
        default: false,
      },
      isPrestigeCustomer: {
        type: Boolean,
        default: false,
      },
      registrationStatus: {
        type: String,
        default: 'updated',
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

SmartBillRegistrationSorceSchema.index({
  accountNumber: 1,
  eventSource: 1,
});

/* ------------------------------------------------------------------ */
/* Smart Bill Registration                                            */
/* ------------------------------------------------------------------ */

const SmartBillRegistrationSchema =
  new mongoose.Schema(
    {
      tpNo: {
        type: String,
        required: true,
        trim: true,
      },
      accountNo: {
        type: String,
        required: true,
        trim: true,
      },
      econtact: {
        type: String,
        required: true,
        trim: true,
      },
      billCode: {
        type: String,
        required: true,
        trim: true,
      },
      registrationStatus: {
        type: String,
        default: 'updated',
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

SmartBillRegistrationSchema.index({
  accountNo: 1,
  tpNo: 1,
});

/* ------------------------------------------------------------------ */
/* Smart Bill Send Request                                            */
/* ------------------------------------------------------------------ */

const SmartBillSendRequestSchema =
  new mongoose.Schema(
    {
      tpNo: {
        type: String,
        default: '',
        trim: true,
      },
      accountNo: {
        type: String,
        required: true,
        trim: true,
      },
      econtact: {
        type: String,
        default: '',
        trim: true,
      },
      billCode: {
        type: String,
        default: '',
        trim: true,
      },
      isEnableSms: {
        type: Boolean,
        default: false,
      },
      isAlreadyRegistered: {
        type: Boolean,
        default: false,
      },
      isPrestigeCustomer: {
        type: Boolean,
        default: false,
      },
      billRequestingMonth: {
        type: String,
        required: true,
        trim: true,
      },
      requestStatus: {
        type: String,
        default: 'sent',
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

SmartBillSendRequestSchema.index({
  accountNo: 1,
  billRequestingMonth: 1,
});

/* ------------------------------------------------------------------ */
/* E-Bill Resend Request                                              */
/* ------------------------------------------------------------------ */

const EBillResendRequestSchema =
  new mongoose.Schema(
    {
      eContact: {
        type: String,
        required: true,
        trim: true,
      },
      accountNo: {
        type: String,
        required: true,
        trim: true,
      },
      ebillMonth: {
        type: String,
        required: true,
        trim: true,
      },
      tpNo: {
        type: String,
        required: true,
        trim: true,
      },
      resendStatus: {
        type: String,
        default: 'sent',
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

EBillResendRequestSchema.index({
  accountNo: 1,
  ebillMonth: 1,
  tpNo: 1,
});

/* ------------------------------------------------------------------ */
/* E-Bill Download Request                                            */
/* ------------------------------------------------------------------ */

const EBillDownloadRequestSchema =
  new mongoose.Schema(
    {
      eContact: {
        type: String,
        default: '',
        trim: true,
      },
      accountNo: {
        type: String,
        required: true,
        trim: true,
      },
      ebillMonth: {
        type: String,
        required: true,
        trim: true,
      },
      tpNo: {
        type: String,
        required: true,
        trim: true,
      },
      downloadStatus: {
        type: String,
        default: 'requested',
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

EBillDownloadRequestSchema.index({
  accountNo: 1,
  ebillMonth: 1,
  tpNo: 1,
});

/* ------------------------------------------------------------------ */
/* Bill Download Request                                              */
/* ------------------------------------------------------------------ */

const BillDownloadRequestSchema =
  new mongoose.Schema(
    {
      eContact: {
        type: String,
        default: '',
        trim: true,
      },
      accountNo: {
        type: String,
        required: true,
        trim: true,
      },
      ebillMonth: {
        type: String,
        required: true,
        trim: true,
      },
      tpNo: {
        type: String,
        required: true,
        trim: true,
      },
      downloadStatus: {
        type: String,
        default: 'requested',
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

BillDownloadRequestSchema.index({
  accountNo: 1,
  ebillMonth: 1,
  tpNo: 1,
});

/* ------------------------------------------------------------------ */
/* Bill Codes                                                         */
/* ------------------------------------------------------------------ */

const BillCodeSchema = new mongoose.Schema(
  {
    billCode: {
      type: String,
      required: true,
      trim: true,
    },
    billCodeName: {
      type: String,
      trim: true,
    },
    billCodeDescription: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BillCodeSchema.index(
  { billCode: 1 },
  { unique: true }
);

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

  EBillStatus: mongoose.model(
    'EBillStatus',
    EBillStatusSchema
  ),

  BillStatus: mongoose.model(
    'BillStatus',
    BillStatusSchema
  ),

  SMSServiceStatus: mongoose.model(
    'SMSServiceStatus',
    SMSServiceStatusSchema
  ),

  EBillUserCheck: mongoose.model(
    'EBillUserCheck',
    EBillUserCheckSchema
  ),

  EBillRegistration: mongoose.model(
    'EBillRegistration',
    EBillRegistrationSchema
  ),

  SmartBillRegistrationSorce: mongoose.model(
    'SmartBillRegistrationSorce',
    SmartBillRegistrationSorceSchema
  ),

  SmartBillRegistration: mongoose.model(
    'SmartBillRegistration',
    SmartBillRegistrationSchema
  ),

  SmartBillSendRequest: mongoose.model(
    'SmartBillSendRequest',
    SmartBillSendRequestSchema
  ),

  EBillResendRequest: mongoose.model(
    'EBillResendRequest',
    EBillResendRequestSchema
  ),

  EBillDownloadRequest: mongoose.model(
    'EBillDownloadRequest',
    EBillDownloadRequestSchema
  ),

  BillDownloadRequest: mongoose.model(
    'BillDownloadRequest',
    BillDownloadRequestSchema
  ),

  BillCode: mongoose.model(
    'BillCode',
    BillCodeSchema
  ),
};
