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
    href:
      `/tmf-api/customerBillManagement/v4/customerBill/` +
      record._id.toString(),
    characteristic: toCharacteristics(record),
    state: record.updateStatus || 'updated',
    '@type': 'CustomerBill',
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