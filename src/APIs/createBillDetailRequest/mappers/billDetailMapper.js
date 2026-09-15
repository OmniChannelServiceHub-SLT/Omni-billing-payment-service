// src/APIs/createBillDetailRequest/mappers/billDetailMapper.js

const CUSTOMER_BILL_BASE_PATH =
  '/tmf-api/customerBillManagement/v4/customerBill';

/**
 * Convert a Mongoose value into a plain object.
 */
function toPlainObject(value) {
  if (!value) {
    return value;
  }

  if (typeof value.toObject === 'function') {
    return value.toObject();
  }

  return value;
}

/**
 * Map a BillDetail database record to the original
 * SLTOMNI dataBundle structure.
 *
 * Source:
 * API_Params_SLTOMNI_V2_0_1.xlsx - sheet "14"
 */
function mapToLegacyResponse(record) {
  return {
    listofbillingInquiryType:
      toPlainObject(
        record.listofbillingInquiryType
      ) || [],

    listofProductDetail:
      toPlainObject(
        record.listofProductDetail
      ) || [],

    myPackageInfo:
      toPlainObject(
        record.myPackageInfo
      ) || {},
  };
}

/**
 * Map a BillDetail database record to a
 * TMF678 CustomerBill resource.
 */
function mapToCustomerBill(record) {
  const id = String(
    record.id ||
    record._id
  );

  return {
    id,

    href:
      `${CUSTOMER_BILL_BASE_PATH}/${id}`,

    billDocument: [
      {
        id: `${id}-document`,
      },
    ],

    billingAccount: {
      id: record.accountNo,
    },

    state:
      record.state || 'generated',

    listofbillingInquiryType:
      toPlainObject(
        record.listofbillingInquiryType
      ) || [],

    listofProductDetail:
      toPlainObject(
        record.listofProductDetail
      ) || [],

    myPackageInfo:
      toPlainObject(
        record.myPackageInfo
      ) || {},

    '@type': 'CustomerBill',
  };
}

/**
 * Apply TMF fields query filtering.
 *
 * id and href are always retained.
 */
function selectCustomerBillFields(
  customerBill,
  fields
) {
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
        selected[field] =
          customerBill[field];
      }
    });

  return selected;
}

module.exports = {
  mapToLegacyResponse,
  mapToCustomerBill,
  selectCustomerBillFields,
};