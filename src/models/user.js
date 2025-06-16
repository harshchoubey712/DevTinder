const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address: " + value);
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Add password validation if needed
  },
  age: {
    type: Number,
    min: 0, // Optional validation
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value.toLowerCase())) {
        throw new Error("Gender data is not valid");
      }
    },
  },

  photoUrl: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("User", userSchema);
