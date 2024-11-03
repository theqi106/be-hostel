const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Label = mongoose.model("Label", labelSchema);
module.exports = Label;
