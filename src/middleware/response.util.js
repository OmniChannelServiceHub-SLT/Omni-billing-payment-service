// src/middleware/response.util.js
// Legacy SLT OMNI response envelope, confirmed against real sample
// responses in API_Params_SLTOMNI_V2_0_1.xlsx.
function envelope({ isSuccess, message = null, dataBundle = null, errorCode = null, exceptionDetail = null }) {
  return {
    isSuccess,
    errorMessege: message, // (sic) matches legacy spelling on purpose
    exceptionDetail,
    dataBundle,
    errorShow: message,
    errorCode,
  };
}

function success(res, { message = null, dataBundle = null, status = 200 } = {}) {
  return res.status(status).json(envelope({ isSuccess: true, message, dataBundle }));
}

function failure(res, { message = 'Request failed.', errorCode = 'E000', exceptionDetail = null, status = 400 } = {}) {
  return res.status(status).json(envelope({ isSuccess: false, message, errorCode, exceptionDetail }));
}

function requiredInput(source, fields) {
  const input = {};
  for (const field of fields) {
    const value = source && source[field];
    if (!['string', 'number', 'boolean'].includes(typeof value) || String(value).trim() === '') {
      const error = new Error(`${field} is required.`);
      error.status = 400;
      throw error;
    }
    input[field] = String(value).trim();
  }
  return input;
}

module.exports = { envelope, success, failure, requiredInput };
