const mongoose = require("mongoose");

const partSchema = new mongoose.Schema({
  // gig: { type: mongoose.Types.ObjectId, required: true, ref: "Gig" },
  instId: { type: mongoose.Types.ObjectId, required: true, ref: "Inst" },
  instName: { type: String, required: true },
  player: { type: mongoose.Types.ObjectId, ref: "Player" },
});

module.exports = mongoose.model("Part", partSchema);
