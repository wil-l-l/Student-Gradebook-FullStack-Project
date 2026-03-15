const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    middleName: {
      type: String,
      minlength: 3,
      maxlength: 50,
    },
    isStudent: {
      type: Boolean,
      default: true,
    },
  }),
);

module.exports = User;
