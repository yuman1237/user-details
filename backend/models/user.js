const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  pnumber: {
    type: Number,
    required: true,
    unique: true,
  },
});

const User = new mongoose.model("Signup", userSchema);

module.exports = User;
