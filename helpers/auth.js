const { tokens } = require("../config/app").jwt;
const Token = require("../models/token");
const { randomUUID } = require("crypto");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const { JWT_PASSWORD: secret } = process.env;

const generateAccessToken = (userID) => {
  const payload = {
    userID,
    type: tokens.access.type,
  };

  const options = {
    expiresIn: tokens.access.expiresIn,
  };

  return jwt.sign(payload, secret, options);
};

const generateRefreshToken = () => {
  const payload = {
    id: randomUUID(),
    type: tokens.refresh.type,
  };

  const options = {
    expiresIn: tokens.refresh.expiresIn,
  };

  return {
    id: payload.id,
    token: jwt.sign(payload, secret, options),
  };
};

const replacehDbRefreshToken = async (tokenID, userID) => {
  await Token.findByIdAndDelete(userID);

  const result = await Token.create({ tokenID, userID });

  return result;
};

const updateTokens = async (userID) => {
  const accessToken = generateAccessToken(userID);
  const refreshToken = generateRefreshToken();

  await replacehDbRefreshToken(refreshToken.id, userID);

  return { accessToken, refreshToken: refreshToken.token };
};

const authHelper = {
  generateAccessToken,
  generateRefreshToken,
  replacehDbRefreshToken,
  updateTokens,
};

module.exports = authHelper;
