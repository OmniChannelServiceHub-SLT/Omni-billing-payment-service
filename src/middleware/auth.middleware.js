const jwt = require('jsonwebtoken');
const { failure } = require('./response.util');

module.exports = function auth(req, res, next) {
  const match = /^Bearer\s+(\S+)$/i.exec(req.headers.authorization || '');
  if (!match) return failure(res, { status: 401, errorCode: 'E401', message: 'Missing bearer token.' });
  try {
    const decoded = jwt.verify(match[1], process.env.JWT_ACCESS_SECRET, { algorithms: ['HS256'] });
    if (!decoded.sub || !['string', 'number'].includes(typeof decoded.sub)) throw new Error('Missing token subject.');
    req.identity = { userId: String(decoded.sub), roles: decoded.roles || [] };
    return next();
  } catch (error) {
    return failure(res, { status: 401, errorCode: 'E401', message: 'Token is invalid or expired.' });
  }
};
