const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "please provide valid email",
      },
    },
    password: {
      type: String,
      required: [true, "please provide password"],
      minlength: 3,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedAt: Date
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (password) {
  const isPasswordCorrect = await bcrypt.compare(password, this.password);
  return isPasswordCorrect;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
