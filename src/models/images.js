const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Images = mongoose.model("Images", imagesSchema);
module.exports = Images;
