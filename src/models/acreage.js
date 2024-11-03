const mongoose = require("mongoose");

const acreageSchema = new mongoose.Schema(
  {
    code: {
      type: String,
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Acreage = mongoose.model("Acreage", acreageSchema);
module.exports = Acreage;
