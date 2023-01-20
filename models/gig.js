const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
  title: String,
  address: String,
  coordinates: {
    lat: String,
    lng: String,
  },
  date: Date,
  start: String,
  end: String,
  notes: String,
  indoor: Boolean,
  parts: [
    {
      inst: { type: mongoose.Types.ObjectId, ref: "Inst" },
      player: { type: mongoose.Types.ObjectId, ref: "Inst" },
    },
  ],
});

gigSchema.methods.hasPlayer = function (playerId) {
  for (let part of this.parts) {
    if (part.player === playerId) return true;
  }
  return false;
};

module.exports = mongoose.model("Gig", gigSchema);
