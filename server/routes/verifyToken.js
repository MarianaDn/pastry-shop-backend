const jwt = require("jsonwebtoken");
const JWT_SEC = "pastry";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SEC, (err, user) => {
      err && res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    req.user.id === req.params.id || req.user.isAdmin
      ? next()
      : res.status(403).json("You are not alowed to do that!");
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    req.user.isAdmin
      ? next()
      : res.status(403).json("You are not alowed to do that!");
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
