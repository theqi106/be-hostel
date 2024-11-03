const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
  {
    code: {
      type: String,
    },
    value: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Price = mongoose.model("Price", priceSchema);
module.exports = Price;
