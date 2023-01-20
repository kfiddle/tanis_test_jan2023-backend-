const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  players: [{ type: mongoose.Types.ObjectId, required: true, ref: "Player" }],
});

module.exports = mongoose.model("Instrument", instrumentSchema);
