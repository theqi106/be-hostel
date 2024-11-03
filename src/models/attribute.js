const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema(
  {
    price: {
      type: String,
      required: true,
    },
    acreage: {
      type: String,
      required: true,
    },
    publish: {
      type: String,
      required: true,
    },
    hashtag: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attribute = mongoose.model("Attribute", attributeSchema);
module.exports = Attribute;
