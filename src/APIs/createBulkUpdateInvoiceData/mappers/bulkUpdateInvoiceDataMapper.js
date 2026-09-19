function toLegacyResponse() {
  return {
    isSuccess: true,
    errorMessege:
      'Successfully Bulk Updated.',
    exceptionDetail: null,
    dataBundle: null,
    errorShow:
      'Successfully Bulk Updated.',
    errorCode: null,
  };
}

function toCamelCase(value) {
  return value
    .toLowerCase()
    .replace(
      /_([a-z])/g,
      (_, letter) => letter.toUpperCase()
    );
}

function toTmfCustomerBill(record) {
  const id = String(record._id);
  const data = record.invoiceData || {};

  const partyId =
    data.NIC ||
    data.SLTNIC ||
    data.nic ||
    data.sltnic ||
    '';

  const email =
    data.EMAIL || data.email || '';

  const phone =
    data.MOBILENO ||
    data.mobileNo ||
    data.mobileno ||
    '';

  const excludedKeys = new Set([
    'EMAIL',
    'email',
    'MOBILENO',
    'mobileNo',
    'mobileno',
  ]);

  const response = {
    id,
    href: `/tmf-api/paymentManagement/v4/invoice-data?REF_NO=${encodeURIComponent(record.refNo)}`,
    characteristic: [
      {
        name: 'referenceNumber',
        value: record.refNo,
      },
      ...Object.entries(data)
        .filter(
          ([key, value]) =>
            !excludedKeys.has(key) &&
            value !== undefined &&
            value !== null &&
            value !== ''
        )
        .map(([key, value]) => ({
          name: toCamelCase(key),
          value,
        })),
    ],
    state: record.updateStatus,
    '@type': 'InvoiceData',
  };

  if (partyId) {
    response.relatedParty = [
      {
        id: String(partyId),
        role: 'customer',
        '@referredType': 'Individual',
      },
    ];
  }

  if (email || phone) {
    response.contactMedium = [
      {
        mediumType: email ? 'EMAIL' : 'PHONE',
        characteristic: {
          emailAddress: email,
          phoneNumber: phone,
        },
      },
    ];
  }

  return response;
}

function toTmfCustomerBills(records) {
  return records.map(toTmfCustomerBill);
}

module.exports = {
  toLegacyResponse,
  toTmfCustomerBills,
};