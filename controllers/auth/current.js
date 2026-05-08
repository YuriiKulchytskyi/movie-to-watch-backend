const User = require("../../models/user");

const current = async (req, res, next) => {
  const { email } = req.user;

  const user = await User.findOne({ email });

  res.status(200).json({
    user,
  });
};

module.exports = current;
