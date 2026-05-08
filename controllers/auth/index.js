const controllerWrapper = require("../../helpers/controllerWrapper");
const current = require("./current");
const login = require("./login");
const logout = require("./logout");
const registration = require("./registration");

module.exports = {
  registration: controllerWrapper(registration),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  current: controllerWrapper(current),
};
