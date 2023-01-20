const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  zip: String,
});

module.exports = mongoose.model("Player", playerSchema);
