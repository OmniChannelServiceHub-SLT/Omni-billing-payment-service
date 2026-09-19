function toLegacyResponse() {
  return {
    isSuccess: true,
    errorMessege: 'Successfully Saved.',
    exceptionDetail: null,
    dataBundle: null,
    errorShow: 'Successfully Saved.',
    errorCode: null,
  };
}

function toTmfCustomerBill(record) {
  const id = String(record._id);

  return {
  id,
  characteristic: [
      {
        name: 'referenceNumber',
        value: record.refNo,
      },
      {
        name: 'serviceType',
        value: record.serviceType,
      },
      {
        name: 'packageName',
        value: record.packageName,
      },
      {
        name: 'packageCount',
        value: record.packageCount,
      },
      {
        name: 'rental',
        value: record.rental,
      },
      {
        name: 'initialCharge',
        value: record.initialCharge,
      },
      {
        name: 'invoiceStatus',
        value: record.status,
      },
    ],
    state: 'saved',
    '@type': 'SaveInvoice',
  };
}

module.exports = {
  toLegacyResponse,
  toTmfCustomerBill,
};