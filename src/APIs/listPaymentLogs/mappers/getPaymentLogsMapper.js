function toLegacyItem(record) {
  return {
    id: record.logId ?? String(record._id),
    order_ref: record.order_ref ?? null,
    nic_no: record.nic_no ?? null,
    sys_id: record.sys_id ?? null,
    date_enter: record.date_enter ?? null,
    amount: record.amount ?? null,
    epoch_val: record.epoch_val ?? null,
    gw_ref: record.gw_ref ?? null,
    gw_status: record.gw_status ?? null,
    refund_sys: record.refund_sys ?? null,
    crm_state: record.crm_state ?? null,
    sys_status: record.sys_status ?? null,
    CRNumber: record.CRNumber ?? null,
    AccNo: record.AccNo ?? null,
    refund_ncp: record.refund_ncp ?? null,
    passport_no: record.passport_no ?? null,
    lastUpdate: record.lastUpdate ?? null,
    cashierRef: record.cashierRef ?? null,
  };
}

function toLegacyResponse(records) {
  return {
    isSuccess: true,
    errorMessege: null,
    exceptionDetail: null,
    dataBundle: records.map(toLegacyItem),
    errorShow: null,
    errorCode: null,
  };
}

// Interpret timezone-free date_enter values as Sri Lanka local time.
function toSriLankaPaymentDate(value) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const match =
    /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.exec(value);
  if (!match) {
    return undefined;
  }

  const [, year, month, day, hour, minute, second] = match;
  const date = new Date(
    Date.UTC(+year, +month - 1, +day, +hour, +minute, +second)
  );
  if (
    date.getUTCFullYear() !== +year ||
    date.getUTCMonth() + 1 !== +month ||
    date.getUTCDate() !== +day ||
    date.getUTCHours() !== +hour ||
    date.getUTCMinutes() !== +minute ||
    date.getUTCSeconds() !== +second
  ) {
    return undefined;
  }

  return `${year}-${month}-${day}T${hour}:${minute}:${second}+05:30`;
}

function toTmfPayment(record) {
  const id = String(record._id);

  return {
    id,
    amount: {
      unit: 'LKR',
      value: Number(record.amount),
    },
    paymentDate: toSriLankaPaymentDate(record.date_enter),
    characteristic: [
      { name: 'orderReference', value: record.order_ref },
      { name: 'gatewayReference', value: record.gw_ref },
      { name: 'gatewayStatus', value: record.gw_status },
      { name: 'refundNcp', value: record.refund_ncp },
    ],
    '@type': 'Payment',
  };
}

module.exports = {
  toLegacyResponse,
  toTmfPayment,
};
