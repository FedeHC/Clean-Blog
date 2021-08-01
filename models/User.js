const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var uniqueValidator = require("mongoose-unique-validator");

// --------------------------------------------------------------------------------
// Schema:
// --------------------------------------------------------------------------------
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a valid username."],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Please provide a valid password."],
    },
    dateRegistered: {
      type: Date,
      default: new Date()
    }
  });

// Using mongoose-unique-validator library to check for duplicate database entries:
UserSchema.plugin(uniqueValidator);

// --------------------------------------------------------------------------------
// BCrypt (for password):
// --------------------------------------------------------------------------------
UserSchema.pre("save", function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  })
})

// --------------------------------------------------------------------------------
// Model:
// --------------------------------------------------------------------------------
const User = mongoose.model("User", UserSchema);

module.exports = User;
