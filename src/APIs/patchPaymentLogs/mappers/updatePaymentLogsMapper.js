const {
  toTmfPayment,
} = require('../../listPaymentLogs/mappers/getPaymentLogsMapper');

function toLegacyResponse() {
  return {
    isSuccess: true,
    errorMessege: 'Successfully Updated.',
    exceptionDetail: null,
    dataBundle: null,
    errorShow: 'Successfully Updated.',
    errorCode: null,
  };
}

function toTmfResponse(records) {
  return records.map(toTmfPayment);
}

module.exports = {
  toLegacyResponse,
  toTmfResponse,
};