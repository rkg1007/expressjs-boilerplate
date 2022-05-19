const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "please provide valid email"
    }
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 3
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
},
{
  timestamps: true
});

module.export = mongoose.model("User", UserSchema);