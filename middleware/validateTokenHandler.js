const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  console.log(authHeader);
  console.log(authHeader.startsWith('Bearer'));
  if (
    authHeader &&
    (authHeader.startsWith('bearer') || authHeader.startsWith('Bearer'))
  ) {
    token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error('not Authorized');
      }
      req.user = decode.user;
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error('not Authorized');
    }
  }
});

module.exports = validateToken;
