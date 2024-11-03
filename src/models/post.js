const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    star: {
      type: String,
      required: true,
      default: "0",
    },
    labelCode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    attribute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attribute",
    },
    categoryCode: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priceCode: {
      type: String,
      required: true,
    },
    acreageCode: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    overview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Overview",
    },
    images: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Images",
    },
    provinceCode: {
      type: String,
      required: true,
    },
    priceNumber: {
      type: Number,
      required: true,
    },
    acreageNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
