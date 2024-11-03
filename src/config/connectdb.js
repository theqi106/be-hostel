const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully");
  } catch (err) {
    console.log("failed");
  }
}
module.exports = { connect };
