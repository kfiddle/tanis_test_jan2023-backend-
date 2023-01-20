const mongoose = require("mongoose");

const partSchema = new mongoose.Schema({
  inst: { type: mongoose.Types.ObjectId, required: true, ref: "Inst" },
  player: { type: mongoose.Types.ObjectId, ref: "Player" },
});

module.exports = mongoose.model("Part", partSchema);
