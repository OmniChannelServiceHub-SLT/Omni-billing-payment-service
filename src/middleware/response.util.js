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

// TMF responses use the resource schema directly; legacy SLT helpers above remain.
function tmfFailure(res, error) {
  const status = error.status || 500;
  const reasons = { 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 405: 'Method Not Allowed', 409: 'Conflict', 412: 'Precondition Failed', 413: 'Payload Too Large', 415: 'Unsupported Media Type', 500: 'Internal Server Error', 503: 'Service Unavailable' };
  return res.status(status).json({ code: String(status), reason: reasons[status] || 'Request failed', message: error.status ? error.message : 'Request failed.', status: String(status) });
}

function tmfAction(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(error => tmfFailure(res, error));
}

function tmfResource(req, path, record, fields) {
  const origin = (process.env.TMF_PUBLIC_ORIGIN || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
  const result = JSON.parse(JSON.stringify(record.data));
  result.id = record.id;
  result.href = `${origin}${req.baseUrl}/${path}/${encodeURIComponent(record.id)}`;
  for (const [key, target] of [['bill', 'customerBill'], ['customerBill', 'customerBill'], ['payment', 'payment']]) {
    if (result[key]?.id) result[key].href = `${origin}${req.baseUrl}/${target}/${encodeURIComponent(result[key].id)}`;
  }
  return fields ? Object.fromEntries(fields.filter(k => result[k] !== undefined).map(k => [k, result[k]])) : result;
}

function tmfList(res, req, resource, result) {
  res.set('X-Total-Count', String(result.total));
  res.set('X-Result-Count', String(result.records.length));
  return res.status(200).json(result.records.map(r => tmfResource(req, resource, r, result.fields)));
}

function tmfOne(res, req, resource, result, status = 200) {
  const record = result.record || result;
  res.set('ETag', '"' + record.revision + '"');
  const body = tmfResource(req, resource, record, result.fields);
  if (status === 201) res.set('Location', body.href);
  return res.status(status).json(body);
}

function tmfRoutes(express, auth, resource, handlers) {
  const router = express.Router();
  const before = [
    (req, res, next) => { req.tmfMode = true; next(); },
    auth,
    (req, res, next) => {
      const parameters = new URL(req.originalUrl, 'http://local.invalid').searchParams;
      for (const key of parameters.keys()) {
        if (key.includes('$') || key.split(/[.\[\]]/).some(k => ['__proto__', 'prototype', 'constructor'].includes(k))) {
          return tmfFailure(res, { status: 400, message: 'Unsafe query parameter.' });
        }
      }
      next();
    },
    (req, res, next) => {
      if (['POST', 'PATCH'].includes(req.method) && !req.is('application/json') && !req.is('application/*+json')) {
        return tmfFailure(res, { status: 415, message: 'Use a JSON request body.' });
      }
      next();
    },
    tmfAction(async (req, res, next) => {
      const authorize = req.app.locals.tmfAuthorizer;
      if (!authorize && process.env.NODE_ENV === 'production') {
        return tmfFailure(res, { status: 503, message: 'TMF account authorization integration is not configured.' });
      }
      if (authorize && await authorize({ identity: req.identity, resource, method: req.method, id: req.params.id, query: req.query, body: req.body }) !== true) {
        return tmfFailure(res, { status: 403, message: 'Access to this resource is not authorized.' });
      }
      next();
    }),
  ];
  const collection = router.route('/' + resource);
  collection.all(...before);
  if (handlers.list) collection.get(tmfAction(handlers.list));
  if (handlers.create) collection.post(tmfAction(handlers.create));
  collection.all((req, res) => {
    res.set('Allow', [handlers.list && 'GET', handlers.create && 'POST'].filter(Boolean).join(', '));
    return tmfFailure(res, { status: 405, message: 'Method is not supported for this resource.' });
  });
  const individual = router.route('/' + resource + '/:id');
  individual.all(...before);
  if (handlers.get) individual.get(tmfAction(handlers.get));
  if (handlers.patch) individual.patch(tmfAction(handlers.patch));
  individual.all((req, res) => {
    res.set('Allow', [handlers.get && 'GET', handlers.patch && 'PATCH'].filter(Boolean).join(', '));
    return tmfFailure(res, { status: 405, message: 'Method is not supported for this resource.' });
  });
  return router;
}

Object.assign(module.exports, { tmfFailure, tmfAction, tmfResource, tmfList, tmfOne, tmfRoutes });
