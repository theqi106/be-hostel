const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    subHeader: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
