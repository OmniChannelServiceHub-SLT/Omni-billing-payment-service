// src/models/TMF678_BillingPayment.js
//
// Models for TMF678 Customer Bill Management.
// Source response fields follow the latest ominichannelapiList.xlsx.

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
    billViewMonth: String,
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

BillHistoryV2ItemSchema.index({ telephoneNo: 1, accountNo: 1, billViewMonth: -1 });

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
      trim: true,
    },
    econtact: {
      type: String,
      trim: true,
    },
    econtactType: {
      type: String,
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

// Shared resource persistence, compiled against the published v4 definitions.
// Kept in the existing model module; no mapper or extra runtime helper file.
const TmfAjv = require('ajv');
const addTmfFormats = require('ajv-formats');
const { randomUUID: tmfUUID } = require('crypto');

function tmfProblem(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function tmfCheckKeys(value) {
  if (!value || typeof value !== 'object') return;
  for (const key of Object.keys(value)) {
    if (key.startsWith('$') || key.includes('.') || ['__proto__', 'prototype', 'constructor'].includes(key)) {
      throw tmfProblem(400, 'Unsafe property name.');
    }
    tmfCheckKeys(value[key]);
  }
}

function tmfSchemaPaths(definitions, name, prefix = '', depth = 0) {
  if (depth > 7) return {};
  const definition = definitions[name] || {};
  const result = {};
  for (const [key, property] of Object.entries(definition.properties || {})) {
    const field = prefix + key;
    const effective = property.$ref ? definitions[property.$ref.split('/').pop()] : property;
    if (effective && ['string', 'boolean', 'number', 'integer'].includes(effective.type)) result[field] = effective;
    const ref = property.$ref || property.items && property.items.$ref;
    if (ref && definitions[ref.split('/').pop()]?.type === 'object') {
      Object.assign(result, tmfSchemaPaths(definitions, ref.split('/').pop(), field + '.', depth + 1));
    }
  }
  return result;
}

function tmfCanonicalDates(value, schema, definitions) {
  if (schema.$ref) schema = definitions[schema.$ref.split('/').pop()];
  if (value === null || value === undefined) return value;
  if (schema.format === 'date-time') return new Date(value).toISOString();
  if (Array.isArray(value) && schema.items) return value.map(v => tmfCanonicalDates(v, schema.items, definitions));
  if (typeof value === 'object' && schema.properties) {
    for (const key of Object.keys(value)) {
      if (Object.hasOwn(schema.properties, key)) value[key] = tmfCanonicalDates(value[key], schema.properties[key], definitions);
    }
  }
  return value;
}

function defineTmfResourceModel(name, definitions, options) {
  const ajv = new TmfAjv({ strict: false, allErrors: true, validateFormats: true });
  addTmfFormats(ajv);
  const validators = {};
  for (const definition of [options.resource, options.create, options.patch].filter(Boolean)) {
    validators[definition] = ajv.compile({ $ref: '#/definitions/' + definition, definitions });
  }
  const paths = tmfSchemaPaths(definitions, options.resource);
  const properties = definitions[options.resource].properties;
  const schema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    revision: { type: Number, default: 0 },
    createdBy: String,
  }, { timestamps: true, versionKey: false });
  for (const field of ['billingAccount.id', 'account.id', 'bill.id', 'payment.id', 'billDate', 'paymentDate', 'refundDate']) {
    if (paths[field]) schema.index({ ['data.' + field]: 1 });
  }

  function validate(definition, data, input = false) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw tmfProblem(400, 'A JSON object is required.');
    tmfCheckKeys(data);
    if (input) {
      const allowed = definitions[definition].properties;
      for (const key of Object.keys(data)) if (!Object.hasOwn(allowed, key)) throw tmfProblem(400, key + ' cannot be supplied for this operation.');
    }
    if (!validators[definition](data)) {
      const errors = validators[definition].errors.slice(0, 4).map(e => (e.instancePath || '/') + ' ' + e.message).join('; ');
      throw tmfProblem(input ? 400 : 500, input ? errors : 'Stored resource validation failed.');
    }
  }

  function scalar(raw, definition) {
    if (typeof raw !== 'string' || raw.length > 1024) throw tmfProblem(400, 'Invalid filter value.');
    if (definition.type === 'boolean') {
      if (!['true', 'false'].includes(raw)) throw tmfProblem(400, 'Boolean filters must be true or false.');
      return raw === 'true';
    }
    if (['number', 'integer'].includes(definition.type)) {
      if (raw.trim() === '' || !Number.isFinite(Number(raw)) || definition.type === 'integer' && !Number.isSafeInteger(Number(raw))) throw tmfProblem(400, 'Invalid numeric filter.');
      return Number(raw);
    }
    if (definition.format === 'date-time') {
      const check = ajv.compile({ type: 'string', format: 'date-time' });
      if (!check(raw)) throw tmfProblem(400, 'Date filters must use ISO 8601 date-time.');
      return new Date(raw).toISOString();
    }
    if (definition.enum && !definition.enum.includes(raw)) throw tmfProblem(400, 'Invalid enumerated filter value.');
    return raw;
  }

  schema.statics.validateTmf = validate;
  schema.statics.tmfResourceName = options.resource;
  schema.statics.listTmf = async function (query) {
    const filters = {};
    let fields;
    const integer = (value, fallback, maximum) => {
      if (value === undefined) return fallback;
      if (typeof value !== 'string' || !/^\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) > maximum) throw tmfProblem(400, 'Invalid pagination value.');
      return Number(value);
    };
    const offset = integer(query.offset, 0, Number.MAX_SAFE_INTEGER);
    const limit = integer(query.limit, 100, 1000);
    if (query.fields !== undefined) {
      if (typeof query.fields !== 'string' || !query.fields.trim()) throw tmfProblem(400, 'fields must be a comma-separated attribute list.');
      fields = [...new Set(['id', 'href', ...query.fields.split(',').map(x => x.trim())])];
      if (fields.some(k => !Object.hasOwn(properties, k))) throw tmfProblem(400, 'Unknown field in attribute selection.');
    }
    for (const [key, raw] of Object.entries(query)) {
      if (['fields', 'offset', 'limit'].includes(key)) continue;
      if (key.includes('$') || ['__proto__', 'constructor', 'prototype'].some(k => key.split('.').includes(k))) throw tmfProblem(400, 'Unsafe query parameter.');
      const match = /^(.*)\.(gt|gte|lt|lte)$/.exec(key);
      const field = match ? match[1] : key;
      if (!Object.hasOwn(paths, field) || field === 'href') throw tmfProblem(400, 'Unsupported filter: ' + key);
      if (match && !['number', 'integer'].includes(paths[field].type) && paths[field].format !== 'date-time') throw tmfProblem(400, 'Range filter requires a number or date-time.');
      const converted = scalar(raw, paths[field]);
      const storageKey = field === 'id' ? 'id' : 'data.' + field;
      if (match) {
        if (Object.hasOwn(filters, storageKey) && typeof filters[storageKey] !== 'object') throw tmfProblem(400, 'Conflicting filters.');
        filters[storageKey] = { ...(filters[storageKey] || {}), ['$' + match[2]]: converted };
      } else {
        if (Object.hasOwn(filters, storageKey)) throw tmfProblem(400, 'Conflicting filters.');
        filters[storageKey] = converted;
      }
    }
    const total = await this.countDocuments(filters);
    const records = limit === 0 ? [] : await this.find(filters).sort({ id: 1 }).skip(offset).limit(limit).lean();
    for (const record of records) validate(options.resource, record.data);
    return { records, total, fields };
  };
  schema.statics.getTmf = async function (id, query = {}) {
    if (typeof id !== 'string' || !id || id.length > 256) throw tmfProblem(400, 'Invalid resource identifier.');
    const unsupported = Object.keys(query).filter(k => k !== 'fields');
    if (unsupported.length) throw tmfProblem(400, 'Unsupported query parameter.');
    const result = await this.listTmf({ ...query, id, limit: '1' });
    if (!result.records[0]) throw tmfProblem(404, 'Resource not found.');
    return { record: result.records[0], fields: result.fields };
  };
  schema.statics.createTmf = async function (input, identity) {
    if (!options.create) throw tmfProblem(405, 'Creation is not supported.');
    validate(options.create, input, true);
    const data = tmfCanonicalDates(JSON.parse(JSON.stringify(input)), definitions[options.create], definitions);
    const id = tmfUUID();
    data.id = id;
    data['@type'] = data['@type'] || options.resource;
    if (options.resource === 'CustomerBillOnDemand') {
      if (!data.billingAccount?.id) throw tmfProblem(400, 'billingAccount.id is required.');
      if (data.state && data.state !== 'inProgress') throw tmfProblem(400, 'New bill requests must start inProgress.');
      data.state = 'inProgress';
      data.lastUpdate = new Date().toISOString();
      // A request is recorded; completed billing is not fabricated.
    }
    if (['Payment', 'Refund'].includes(options.resource)) {
      for (const key of ['amount', 'totalAmount', 'taxAmount']) {
        if (data[key] && (typeof data[key].value !== 'number' || !Number.isFinite(data[key].value) || data[key].value < 0 || !/^[A-Z]{3}$/.test(data[key].unit || ''))) throw tmfProblem(400, key + ' requires a non-negative value and a three-letter currency unit.');
      }
      data.status = 'received';
      data.statusDate = new Date().toISOString();
      data[options.resource === 'Payment' ? 'paymentDate' : 'refundDate'] = data.refundDate ? new Date(data.refundDate).toISOString() : data.statusDate;
    }
    validate(options.resource, data);
    const saved = await this.create({ id, data, createdBy: identity?.userId });
    return saved.toObject();
  };
  schema.statics.patchTmf = async function (id, input, ifMatch) {
    if (!options.patch) throw tmfProblem(405, 'Updates are not supported.');
    validate(options.patch, input, true);
    if (!Object.keys(input).length) throw tmfProblem(400, 'At least one update attribute is required.');
    for (const key of ['@type', '@baseType', '@schemaLocation']) {
      if (Object.hasOwn(input, key)) throw tmfProblem(400, 'Resource type metadata is immutable.');
    }
    const { record } = await this.getTmf(id);
    if (ifMatch !== undefined && ifMatch !== '*' && ifMatch !== '"' + record.revision + '"') throw tmfProblem(412, 'The resource version has changed.');
    const data = { ...record.data, ...input, lastUpdate: new Date().toISOString() };
    validate(options.resource, data);
    const saved = await this.findOneAndUpdate({ id, revision: record.revision }, { $set: { data }, $inc: { revision: 1 } }, { new: true, runValidators: true }).lean();
    if (!saved) throw tmfProblem(409, 'Concurrent update. Retrieve the resource and retry.');
    return saved;
  };
  return mongoose.model(name, schema, options.collection);
}


// Published TM Forum Apache-2.0 v4 definitions (descriptions omitted).
// Source: https://github.com/tmforum-apis/TMF678_CustomerBill/blob/main/TMF678-CustomerBill-v4.0.0.swagger.json
// Normalized source JSON SHA256: 7d2ad9389de674bd903c8e1a16d1f4d7f583467f4d63ac04e576671e2767ef66
const tmf678Definitions = {
  "AccountBalance": {
    "type": "object",
    "required": [
      "amount",
      "balanceType",
      "validFor"
    ],
    "properties": {
      "balanceType": {
        "type": "string"
      },
      "amount": {
        "$ref": "#/definitions/Money"
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
  "Any": {},
  "AppliedBillingRateCharacteristic": {
    "type": "object",
    "required": [
      "name",
      "value"
    ],
    "properties": {
      "name": {
        "type": "string"
      },
      "valueType": {
        "type": "string"
      },
      "value": {
        "$ref": "#/definitions/Any"
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
  "AppliedBillingTaxRate": {
    "type": "object",
    "properties": {
      "taxCategory": {
        "type": "string"
      },
      "taxRate": {
        "type": "number",
        "format": "float"
      },
      "taxAmount": {
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
  "AppliedCustomerBillingRate": {
    "type": "object",
    "required": [
      "id"
    ],
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "date": {
        "type": "string",
        "format": "date-time"
      },
      "description": {
        "type": "string"
      },
      "isBilled": {
        "type": "boolean"
      },
      "name": {
        "type": "string"
      },
      "type": {
        "type": "string"
      },
      "appliedTax": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/AppliedBillingTaxRate"
        }
      },
      "bill": {
        "$ref": "#/definitions/BillRef"
      },
      "billingAccount": {
        "$ref": "#/definitions/BillingAccountRef"
      },
      "characteristic": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/AppliedBillingRateCharacteristic"
        }
      },
      "periodCoverage": {
        "$ref": "#/definitions/TimePeriod"
      },
      "product": {
        "$ref": "#/definitions/ProductRef"
      },
      "taxExcludedAmount": {
        "$ref": "#/definitions/Money"
      },
      "taxIncludedAmount": {
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
  "AppliedPayment": {
    "type": "object",
    "properties": {
      "appliedAmount": {
        "$ref": "#/definitions/Money"
      },
      "payment": {
        "$ref": "#/definitions/PaymentRef"
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
  "Attachment": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "attachmentType": {
        "type": "string"
      },
      "content": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "mimeType": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "url": {
        "type": "string"
      },
      "size": {
        "$ref": "#/definitions/Quantity"
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
  "AttachmentRef": {
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
      "url": {
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
  "AttachmentRefOrValue": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "attachmentType": {
        "type": "string"
      },
      "content": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "mimeType": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "url": {
        "type": "string"
      },
      "size": {
        "$ref": "#/definitions/Quantity"
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
  "BillRef": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
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
  "BillingAccountRef": {
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
  "Characteristic": {
    "type": "object",
    "required": [
      "name",
      "value"
    ],
    "properties": {
      "name": {
        "type": "string"
      },
      "valueType": {
        "type": "string"
      },
      "value": {
        "$ref": "#/definitions/Any"
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
  "CustomerBill": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
        "type": "string"
      },
      "billDate": {
        "type": "string",
        "format": "date-time"
      },
      "billNo": {
        "type": "string"
      },
      "category": {
        "type": "string"
      },
      "lastUpdate": {
        "type": "string",
        "format": "date-time"
      },
      "nextBillDate": {
        "type": "string",
        "format": "date-time"
      },
      "paymentDueDate": {
        "type": "string",
        "format": "date-time"
      },
      "runType": {
        "type": "string"
      },
      "amountDue": {
        "$ref": "#/definitions/Money"
      },
      "appliedPayment": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/AppliedPayment"
        }
      },
      "billDocument": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/AttachmentRefOrValue"
        }
      },
      "billingAccount": {
        "$ref": "#/definitions/BillingAccountRef"
      },
      "billingPeriod": {
        "$ref": "#/definitions/TimePeriod"
      },
      "financialAccount": {
        "$ref": "#/definitions/FinancialAccountRef"
      },
      "paymentMethod": {
        "$ref": "#/definitions/PaymentMethodRef"
      },
      "relatedParty": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/RelatedPartyRef"
        }
      },
      "remainingAmount": {
        "$ref": "#/definitions/Money"
      },
      "state": {
        "$ref": "#/definitions/stateValue"
      },
      "taxExcludedAmount": {
        "$ref": "#/definitions/Money"
      },
      "taxIncludedAmount": {
        "$ref": "#/definitions/Money"
      },
      "taxItem": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/TaxItem"
        }
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
  "CustomerBill_Update": {
    "type": "object",
    "properties": {
      "state": {
        "$ref": "#/definitions/stateValue"
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
  "CustomerBillOnDemand": {
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
      "lastUpdate": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "billingAccount": {
        "$ref": "#/definitions/BillingAccountRef"
      },
      "customerBill": {
        "$ref": "#/definitions/BillRef"
      },
      "relatedParty": {
        "$ref": "#/definitions/RelatedPartyRef"
      },
      "state": {
        "$ref": "#/definitions/StateValues"
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
  "CustomerBillOnDemand_Create": {
    "type": "object",
    "properties": {
      "description": {
        "type": "string"
      },
      "lastUpdate": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "billingAccount": {
        "$ref": "#/definitions/BillingAccountRef"
      },
      "customerBill": {
        "$ref": "#/definitions/BillRef"
      },
      "relatedParty": {
        "$ref": "#/definitions/RelatedPartyRef"
      },
      "state": {
        "$ref": "#/definitions/StateValues"
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
  "FinancialAccountRef": {
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
      "accountBalance": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/AccountBalance"
        }
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
  "ProductRef": {
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
  "Quantity": {
    "type": "object",
    "properties": {
      "amount": {
        "default": 1,
        "type": "number",
        "format": "float"
      },
      "units": {
        "type": "string"
      }
    }
  },
  "Reference": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "href": {
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
  "RelatedPartyRef": {
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
    },
    "required": [
      "id"
    ]
  },
  "StateValues": {
    "type": "string",
    "enum": [
      "inProgress",
      "rejected",
      "done",
      "terminatedWithError"
    ]
  },
  "TaxItem": {
    "type": "object",
    "properties": {
      "taxCategory": {
        "type": "string"
      },
      "taxRate": {
        "type": "number",
        "format": "float"
      },
      "taxAmount": {
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
  "stateValue": {
    "type": "string",
    "enum": [
      "new",
      "onHold",
      "validated",
      "sent",
      "partiallyPaid",
      "settled"
    ]
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
module.exports.TmfCustomerBill = defineTmfResourceModel("TmfCustomerBill", tmf678Definitions, {"resource": "CustomerBill", "create": null, "patch": "CustomerBill_Update", "collection": "tmf678_customerbills"});
module.exports.TmfCustomerBillOnDemand = defineTmfResourceModel("TmfCustomerBillOnDemand", tmf678Definitions, {"resource": "CustomerBillOnDemand", "create": "CustomerBillOnDemand_Create", "patch": null, "collection": "tmf678_customerbillonrequests"});
module.exports.TmfAppliedCustomerBillingRate = defineTmfResourceModel("TmfAppliedCustomerBillingRate", tmf678Definitions, {"resource": "AppliedCustomerBillingRate", "create": null, "patch": null, "collection": "tmf678_appliedbillingrates"});
Object.defineProperty(module.exports, 'tmfSupport', { value: { defineTmfResourceModel } });
