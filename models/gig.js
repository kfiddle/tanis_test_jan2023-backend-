const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
  venue: { type: String, required: true },
  address: String,
  coordinates: {
    lat: String,
    lng: String,
  },
  date: Date,
  startHours: String,
  startMin: String,
  endHours: String,
  endMin: String,
  contactPhone: String,
  contactEmail: String,
  notes: String,
  indoor: Boolean,
  parts: [
    {
      inst: { type: mongoose.Types.ObjectId, ref: "Instrument" },
      instName: String,
      player: { type: mongoose.Types.ObjectId, ref: "Player" },
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
