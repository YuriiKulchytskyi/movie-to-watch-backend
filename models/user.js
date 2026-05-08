const { required } = require("joi");
const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
      minLength: [6, "Required at least 6 characters!"],
    },
    favorites: {
      type: [Types.ObjectId],
      ref: "movie",
    }
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const User = model("user", userSchema);

module.exports = User;
