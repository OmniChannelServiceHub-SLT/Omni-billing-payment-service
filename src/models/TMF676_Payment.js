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
      default: null,
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

// Published TM Forum Apache-2.0 v4 definitions (descriptions omitted).
// Source: https://github.com/tmforum-apis/TMF676_PaymentManagement/blob/main/TMF676-Payment-v4.0.0.swagger.json
// Normalized source JSON SHA256: 1f68644c97e1c6bd1b77680a5724666095ecccc096d376d8b0f80d68589ea9b8
const { defineTmfResourceModel } = require('./TMF678_BillingPayment').tmfSupport;
const tmf676Definitions = {
  "AccountRef": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "@baseType": {
        "type": "string"
      },
      "@schemaLocation": {
        "type": "string",
        "format": "uri"
      },
      "@type": {
        "type": "string"
      },
      "@referredType": {
        "type": "string"
      }
    },
    "required": [
      "id"
    ]
  },
  "ChannelRef": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "@baseType": {
        "type": "string"
      },
      "@schemaLocation": {
        "type": "string",
        "format": "uri"
      },
      "@type": {
        "type": "string"
      },
      "@referredType": {
        "type": "string"
      }
    },
    "required": [
      "id"
    ]
  },
  "EntityRef": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "@baseType": {
        "type": "string"
      },
      "@schemaLocation": {
        "type": "string",
        "format": "uri"
      },
      "@type": {
        "type": "string"
      },
      "@referredType": {
        "type": "string"
      }
    },
    "required": [
      "id"
    ]
  },
  "Money": {
    "type": "object",
    "properties": {
      "unit": {
        "type": "string"
      },
      "value": {
        "type": "number",
        "format": "float"
      }
    }
  },
  "Payment": {
    "type": "object",
    "required": [
      "account",
      "paymentMethod"
    ],
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "authorizationCode": {
        "type": "string"
      },
      "correlatorId": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "paymentDate": {
        "type": "string",
        "format": "date-time"
      },
      "status": {
        "type": "string"
      },
      "statusDate": {
        "type": "string",
        "format": "date-time"
      },
      "account": {
        "$ref": "#/definitions/AccountRef"
      },
      "amount": {
        "$ref": "#/definitions/Money"
      },
      "channel": {
        "$ref": "#/definitions/ChannelRef"
      },
      "payer": {
        "$ref": "#/definitions/RelatedParty"
      },
      "paymentItem": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/PaymentItem"
        }
      },
      "paymentMethod": {
        "$ref": "#/definitions/PaymentMethodRefOrValue"
      },
      "taxAmount": {
        "$ref": "#/definitions/Money"
      },
      "totalAmount": {
        "$ref": "#/definitions/Money"
      },
      "@baseType": {
        "type": "string"
      },
      "@schemaLocation": {
        "type": "string",
        "format": "uri"
      },
      "@type": {
        "type": "string"
      }
    }
  },
  "Payment_Create": {
    "type": "object",
    "required": [
      "account",
      "paymentMethod",
      "totalAmount"
    ],
    "properties": {
      "authorizationCode": {
        "type": "string"
      },
      "correlatorId": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "account": {
        "$ref": "#/definitions/AccountRef"
      },
      "amount": {
        "$ref": "#/definitions/Money"
      },
      "channel": {
        "$ref": "#/definitions/ChannelRef"
      },
      "payer": {
        "$ref": "#/definitions/RelatedParty"
      },
      "paymentItem": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/PaymentItem"
        }
      },
      "paymentMethod": {
        "$ref": "#/definitions/PaymentMethodRefOrValue"
      },
      "taxAmount": {
        "$ref": "#/definitions/Money"
      },
      "totalAmount": {
        "$ref": "#/definitions/Money"
      },
      "@baseType": {
        "type": "string"
      },
      "@schemaLocation": {
        "type": "string",
        "format": "uri"
      },
      "@type": {
        "type": "string"
      }
    }
  },
  "PaymentItem": {
    "type": "object",
    "required": [
      "item"
    ],
    "properties": {
      "id": {
        "type": "string"
      },
      "amount": {
        "$ref": "#/definitions/Money"
      },
      "item": {
        "$ref": "#/definitions/EntityRef"
      },
      "taxAmount": {
        "$ref": "#/definitions/Money"
      },
      "totalAmount": {
        "$ref": "#/definitions/Money"
      },
      "@baseType": {
        "type": "string"
      },
      "@schemaLocation": {
        "type": "string",
        "format": "uri"
      },
      "@type": {
        "type": "string"
      }
    }
  },
  "PaymentMethod": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "isPreferred": {
        "type": "boolean"
      },
      "name": {
        "type": "string"
      },
      "status": {
        "type": "string"
      },
      "statusDate": {
        "type": "string",
        "format": "date-time"
      },
      "account": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/AccountRef"
        }
      },
      "relatedParty": {
        "$ref": "#/definitions/RelatedParty"
      },
      "validFor": {
        "$ref": "#/definitions/TimePeriod"
      },
      "@baseType": {
        "type": "string"
      },
      "@schemaLocation": {
        "type": "string",
        "format": "uri"
      },
      "@type": {
        "type": "string"
      }
    }
  },
  "PaymentMethodRef": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "@baseType": {
        "type": "string"
      },
      "@schemaLocation": {
        "type": "string",
        "format": "uri"
      },
      "@type": {
        "type": "string"
      },
      "@referredType": {
        "type": "string"
      }
    },
    "required": [
      "id"
    ]
  },
  "PaymentMethodRefOrValue": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "isPreferred": {
        "type": "boolean"
      },
      "name": {
        "type": "string"
      },
      "status": {
        "type": "string"
      },
      "statusDate": {
        "type": "string",
        "format": "date-time"
      },
      "account": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/AccountRef"
        }
      },
      "relatedParty": {
        "$ref": "#/definitions/RelatedParty"
      },
      "validFor": {
        "$ref": "#/definitions/TimePeriod"
      },
      "@baseType": {
        "type": "string"
      },
      "@schemaLocation": {
        "type": "string",
        "format": "uri"
      },
      "@type": {
        "type": "string"
      },
      "@referredType": {
        "type": "string"
      }
    }
  },
  "PaymentRef": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "@baseType": {
        "type": "string"
      },
      "@schemaLocation": {
        "type": "string",
        "format": "uri"
      },
      "@type": {
        "type": "string"
      },
      "@referredType": {
        "type": "string"
      }
    },
    "required": [
      "id"
    ]
  },
  "PaymentStatusExampleType": {
    "type": "string",
    "enum": [
      "pendingAuthorization",
      "authorized",
      "captured",
      "failed",
      "canceled",
      "denied",
      "done"
    ]
  },
  "Refund": {
    "type": "object",
    "required": [
      "account",
      "paymentMethod"
    ],
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "authorizationCode": {
        "type": "string"
      },
      "correlatorId": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "refundDate": {
        "type": "string",
        "format": "date-time"
      },
      "status": {
        "type": "string"
      },
      "statusDate": {
        "type": "string",
        "format": "date-time"
      },
      "account": {
        "$ref": "#/definitions/AccountRef"
      },
      "amount": {
        "$ref": "#/definitions/Money"
      },
      "channel": {
        "$ref": "#/definitions/ChannelRef"
      },
      "payment": {
        "$ref": "#/definitions/PaymentRef"
      },
      "paymentMethod": {
        "$ref": "#/definitions/PaymentMethodRefOrValue"
      },
      "requestor": {
        "$ref": "#/definitions/RelatedParty"
      },
      "taxAmount": {
        "$ref": "#/definitions/Money"
      },
      "totalAmount": {
        "$ref": "#/definitions/Money"
      },
      "@baseType": {
        "type": "string"
      },
      "@schemaLocation": {
        "type": "string",
        "format": "uri"
      },
      "@type": {
        "type": "string"
      }
    }
  },
  "Refund_Create": {
    "type": "object",
    "required": [
      "account",
      "paymentMethod",
      "totalAmount"
    ],
    "properties": {
      "authorizationCode": {
        "type": "string"
      },
      "correlatorId": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "refundDate": {
        "type": "string",
        "format": "date-time"
      },
      "account": {
        "$ref": "#/definitions/AccountRef"
      },
      "amount": {
        "$ref": "#/definitions/Money"
      },
      "channel": {
        "$ref": "#/definitions/ChannelRef"
      },
      "payment": {
        "$ref": "#/definitions/PaymentRef"
      },
      "paymentMethod": {
        "$ref": "#/definitions/PaymentMethodRefOrValue"
      },
      "requestor": {
        "$ref": "#/definitions/RelatedParty"
      },
      "taxAmount": {
        "$ref": "#/definitions/Money"
      },
      "totalAmount": {
        "$ref": "#/definitions/Money"
      },
      "@baseType": {
        "type": "string"
      },
      "@schemaLocation": {
        "type": "string",
        "format": "uri"
      },
      "@type": {
        "type": "string"
      }
    }
  },
  "RefundStatusExampleType": {
    "type": "string",
    "enum": [
      "pendingAuthorization",
      "authorized",
      "captured",
      "failed",
      "canceled",
      "denied",
      "done"
    ]
  },
  "RelatedParty": {
    "type": "object",
    "required": [
      "@referredType",
      "id"
    ],
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "role": {
        "type": "string"
      },
      "@baseType": {
        "type": "string"
      },
      "@schemaLocation": {
        "type": "string",
        "format": "uri"
      },
      "@type": {
        "type": "string"
      },
      "@referredType": {
        "type": "string"
      }
    }
  },
  "TimePeriod": {
    "type": "object",
    "properties": {
      "endDateTime": {
        "type": "string",
        "format": "date-time"
      },
      "startDateTime": {
        "type": "string",
        "format": "date-time"
      }
    }
  },
  "EventSubscription": {
    "type": "object",
    "required": [
      "id",
      "callback"
    ],
    "properties": {
      "id": {
        "type": "string"
      },
      "callback": {
        "type": "string"
      },
      "query": {
        "type": "string"
      }
    }
  },
  "EventSubscriptionInput": {
    "type": "object",
    "required": [
      "callback"
    ],
    "properties": {
      "callback": {
        "type": "string"
      },
      "query": {
        "type": "string"
      }
    }
  },
  "PaymentCreateEvent": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "eventId": {
        "type": "string"
      },
      "eventTime": {
        "type": "string",
        "format": "date-time"
      },
      "eventType": {
        "type": "string"
      },
      "correlationId": {
        "type": "string"
      },
      "domain": {
        "type": "string"
      },
      "title": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "priority": {
        "type": "string"
      },
      "timeOcurred": {
        "type": "string",
        "format": "date-time"
      },
      "event": {
        "$ref": "#/definitions/PaymentCreateEventPayload"
      }
    }
  },
  "PaymentCreateEventPayload": {
    "type": "object",
    "properties": {
      "payment": {
        "$ref": "#/definitions/Payment"
      }
    }
  },
  "PaymentAttributeValueChangeEvent": {
    "type": "object",
    "properties": {
      "eventId": {
        "type": "string"
      },
      "eventTime": {
        "type": "string",
        "format": "date-time"
      },
      "eventType": {
        "type": "string"
      },
      "correlationId": {
        "type": "string"
      },
      "domain": {
        "type": "string"
      },
      "title": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "priority": {
        "type": "string"
      },
      "timeOcurred": {
        "type": "string",
        "format": "date-time"
      },
      "fieldPath": {
        "type": "string"
      },
      "event": {
        "$ref": "#/definitions/PaymentAttributeValueChangeEventPayload"
      }
    }
  },
  "PaymentAttributeValueChangeEventPayload": {
    "type": "object",
    "properties": {
      "payment": {
        "$ref": "#/definitions/Payment"
      }
    }
  },
  "PaymentStateChangeEvent": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "eventId": {
        "type": "string"
      },
      "eventTime": {
        "type": "string",
        "format": "date-time"
      },
      "eventType": {
        "type": "string"
      },
      "correlationId": {
        "type": "string"
      },
      "domain": {
        "type": "string"
      },
      "title": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "priority": {
        "type": "string"
      },
      "timeOcurred": {
        "type": "string",
        "format": "date-time"
      },
      "event": {
        "$ref": "#/definitions/PaymentStateChangeEventPayload"
      }
    }
  },
  "PaymentStateChangeEventPayload": {
    "type": "object",
    "properties": {
      "payment": {
        "$ref": "#/definitions/Payment"
      }
    }
  },
  "PaymentDeleteEvent": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "eventId": {
        "type": "string"
      },
      "eventTime": {
        "type": "string",
        "format": "date-time"
      },
      "eventType": {
        "type": "string"
      },
      "correlationId": {
        "type": "string"
      },
      "domain": {
        "type": "string"
      },
      "title": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "priority": {
        "type": "string"
      },
      "timeOcurred": {
        "type": "string",
        "format": "date-time"
      },
      "event": {
        "$ref": "#/definitions/PaymentDeleteEventPayload"
      }
    }
  },
  "PaymentDeleteEventPayload": {
    "type": "object",
    "properties": {
      "payment": {
        "$ref": "#/definitions/Payment"
      }
    }
  },
  "RefundCreateEvent": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "eventId": {
        "type": "string"
      },
      "eventTime": {
        "type": "string",
        "format": "date-time"
      },
      "eventType": {
        "type": "string"
      },
      "correlationId": {
        "type": "string"
      },
      "domain": {
        "type": "string"
      },
      "title": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "priority": {
        "type": "string"
      },
      "timeOcurred": {
        "type": "string",
        "format": "date-time"
      },
      "event": {
        "$ref": "#/definitions/RefundCreateEventPayload"
      }
    }
  },
  "RefundCreateEventPayload": {
    "type": "object",
    "properties": {
      "refund": {
        "$ref": "#/definitions/Refund"
      }
    }
  },
  "RefundAttributeValueChangeEvent": {
    "type": "object",
    "properties": {
      "eventId": {
        "type": "string"
      },
      "eventTime": {
        "type": "string",
        "format": "date-time"
      },
      "eventType": {
        "type": "string"
      },
      "correlationId": {
        "type": "string"
      },
      "domain": {
        "type": "string"
      },
      "title": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "priority": {
        "type": "string"
      },
      "timeOcurred": {
        "type": "string",
        "format": "date-time"
      },
      "fieldPath": {
        "type": "string"
      },
      "event": {
        "$ref": "#/definitions/RefundAttributeValueChangeEventPayload"
      }
    }
  },
  "RefundAttributeValueChangeEventPayload": {
    "type": "object",
    "properties": {
      "refund": {
        "$ref": "#/definitions/Refund"
      }
    }
  },
  "RefundStateChangeEvent": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "eventId": {
        "type": "string"
      },
      "eventTime": {
        "type": "string",
        "format": "date-time"
      },
      "eventType": {
        "type": "string"
      },
      "correlationId": {
        "type": "string"
      },
      "domain": {
        "type": "string"
      },
      "title": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "priority": {
        "type": "string"
      },
      "timeOcurred": {
        "type": "string",
        "format": "date-time"
      },
      "event": {
        "$ref": "#/definitions/RefundStateChangeEventPayload"
      }
    }
  },
  "RefundStateChangeEventPayload": {
    "type": "object",
    "properties": {
      "refund": {
        "$ref": "#/definitions/Refund"
      }
    }
  },
  "RefundDeleteEvent": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "eventId": {
        "type": "string"
      },
      "eventTime": {
        "type": "string",
        "format": "date-time"
      },
      "eventType": {
        "type": "string"
      },
      "correlationId": {
        "type": "string"
      },
      "domain": {
        "type": "string"
      },
      "title": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "priority": {
        "type": "string"
      },
      "timeOcurred": {
        "type": "string",
        "format": "date-time"
      },
      "event": {
        "$ref": "#/definitions/RefundDeleteEventPayload"
      }
    }
  },
  "RefundDeleteEventPayload": {
    "type": "object",
    "properties": {
      "refund": {
        "$ref": "#/definitions/Refund"
      }
    }
  },
  "Error": {
    "type": "object",
    "required": [
      "code",
      "reason"
    ],
    "properties": {
      "code": {
        "type": "string"
      },
      "reason": {
        "type": "string"
      },
      "message": {
        "type": "string"
      },
      "status": {
        "type": "string"
      },
      "referenceError": {
        "type": "string",
        "format": "uri"
      },
      "@baseType": {
        "type": "string"
      },
      "@schemaLocation": {
        "type": "string",
        "format": "uri"
      },
      "@type": {
        "type": "string"
      }
    }
  }
};
module.exports.TmfPayment = defineTmfResourceModel("TmfPayment", tmf676Definitions, {"resource": "Payment", "create": "Payment_Create", "patch": null, "collection": "tmf676_payments"});
module.exports.TmfRefund = defineTmfResourceModel("TmfRefund", tmf676Definitions, {"resource": "Refund", "create": "Refund_Create", "patch": null, "collection": "tmf676_refunds"});
