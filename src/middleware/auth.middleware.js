// src/middleware/auth.middleware.js
// Verifies the JWT directly (defense-in-depth), or trusts Gateway-forwarded
// x-user-id header if the request already passed through the API Gateway.
const jwt = require('jsonwebtoken');
const { failure } = require('./response.util');

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.identity = { userId: decoded.sub, roles: decoded.roles || [] };
      return next();
    } catch (err) {
      return failure(res, { message: 'Token is invalid or expired.', errorCode: 'E401', status: 401 });
    }
  }

  const gatewayUserId = req.headers['x-user-id'];
  if (gatewayUserId) {
    req.identity = { userId: gatewayUserId, roles: (req.headers['x-user-roles'] || '').split(',').filter(Boolean) };
    return next();
  }

  return failure(res, { message: 'Missing bearer token.', errorCode: 'E401', status: 401 });
};
