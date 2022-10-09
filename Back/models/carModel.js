const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: [true, "A car must have a model"],
    },
    price: {
      type: String,
      required: [true, "A car must have a price"],
    },
    phone: {
      type: String,
      required: [true, "A car must come with a phone number"],
    },
    city: {
      type: String,
      required: [true, "A car must belong to a city"],
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    images: [String],
  },
  { timestamps: true }
);

const model = mongoose.model("car", carSchema);
module.exports = model;
