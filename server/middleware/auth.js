const jwt = require("jsonwebtoken");
const Config = require("../config");
const { UnauthorizedError } = require("../helper/errors");

const verifyToken = async (req, res, next) => {
  try {
    const parts = req.header("Authorization")?.split(" ") || [];
    if (parts.length !== 2) {
      throw new Error("No authorization token was found");
    }

    const scheme = parts[0];
    if (!/^Bearer$/i.test(scheme)) {
      throw new Error("Format is Authorization: Bearer [token]");
    }
    const theToken = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(theToken, Config.TokenKey);
    req.decoded = decoded;
    return next();
  } catch (e) {
    const error = {
      status: false,
    };
    if (e instanceof UnauthorizedError) {
      error.message = "Token is Expired or Not a Valid Token";
      res.status(401).json(error);
    } else {
      error.message = e.message;
    }
    res.status(500).json(error);
  }
};
module.exports = verifyToken;
