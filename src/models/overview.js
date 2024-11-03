const mongoose = require("mongoose");

const overviewSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  bonus: {
    type: String,
    required: true,
  },
  expired: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

const Overview = mongoose.model("Overview", overviewSchema);
module.exports = Overview;
