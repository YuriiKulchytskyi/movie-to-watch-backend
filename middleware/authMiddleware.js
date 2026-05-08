const requestError = require("../helpers/requestError");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const controllerWrapper = require("../helpers/controllerWrapper");
const { JWT_PASSWORD } = process.env;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    return requestError(401, "Token type is invalid!");
  }

  if (!token) {
    return requestError(401, "No token provided!");
  }

  try {
    const payload = jwt.verify(token, JWT_PASSWORD);
    if (payload.type !== "access") {
      return res.status(401).json({ message: "Invalid token!" });
    }

    const { userID } = payload;

    const user = await User.findById(userID);

    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return next(requestError(401, "JWT token is invalid!"));
    }
    next(error);
  }
  next();
};

module.exports = authMiddleware;
