function toCharacteristics(record) {
  const data = record.invoiceData || {};

  return [
    {
      name: 'referenceNumber',
      value: record.refNo,
    },
    ...Object.entries(data).map(([name, value]) => ({
      name,
      value,
    })),
  ];
}

function toTmfResponse(record) {
  return {
    id: record._id.toString(),
    href: `/tmf-api/paymentManagement/v4/invoice-data?REF_NO=${encodeURIComponent(record.refNo)}`,
    characteristic: toCharacteristics(record),
    state: record.updateStatus || 'updated',
    '@type': 'InvoiceData',
  };
}
function toLegacyResponse(record) {
  return {
    isSuccess: true,
    errorMessege: 'Successfully Retrieved.',
    exceptionDetail: null,
    dataBundle: {
      REF_NO: record.refNo,
      ...(record.invoiceData || {}),
    },
    errorShow: 'Successfully Retrieved.',
    errorCode: null,
  };
}

module.exports = {
  toTmfResponse,
  toLegacyResponse,
};