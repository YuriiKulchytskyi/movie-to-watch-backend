const bcrypt = require("bcrypt");
const User = require("../../models/user");
const requestError = require("../../helpers/requestError");

const registration = async (req, res, next) => {
    console.log('some text');
    
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await User.create({ email, password: hashedPassword });

    res.status(201).json({
        id: result._id,
        email,
        hashedPassword
    })
  } catch (error) {
    if(error.message.includes('E11000')){
        return next(requestError(409, 'User with this email already exist!'))
    }
    next(error)
  }
};

module.exports = registration


