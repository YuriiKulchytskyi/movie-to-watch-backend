const { requestError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const authHelper = require("../../helpers/auth");
require("dotenv").config();

const { JWT_PASSWORD } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw requestError(401, "Email is not valid");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw requestError(401, "Password is wrong!");
  }
  const tokens = await authHelper.updateTokens(user.id);

  res.json({ tokens });
};

module.exports = login;
