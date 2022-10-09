const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name can't be empty"],
    },
    email: {
      type: String,
      required: [true, "Email can't be empty"],
    },
    password: {
      type: String,
      required: [true, "Password can't be empty"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("cars", {
  ref: "car",
  localField: "_id",
  foreignField: "owner",
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.isCorrectPassword = async function (
  candidatePass,
  userPassword
) {
  return await bcrypt.compare(candidatePass, userPassword);
};

const model = mongoose.model("user", userSchema);
module.exports = model;
