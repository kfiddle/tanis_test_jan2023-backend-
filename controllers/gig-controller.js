const Gig = require("../models/gig");
const Inst = require("../models/inst");
const Player = require("../models/player");

const HttpError = require("../utils/http-error");

const createGig = async (req, res, next) => {
  const { title, partsList } = req.body;
  let partsToFill = [];

  for (let instId of partsList) {
    try {
      const inst = await Inst.findById(instId);
      partsToFill.push(inst);
    } catch (error) {
      return next(
        new HttpError("could not locate instrument of id  " + instId, 404)
      );
    }
  }

  const newGig = new Gig({
    title,
    parts: partsToFill.map((inst) => {
      return { inst: inst.id, player: null };
    }),
  });

  try {
    await newGig.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError("could not create new gig", 500));
  }

  res.status(201).json({ newGig: newGig.toObject({ getters: true }) });
};

const getGigById = (req, res, next) => {
  const gigId = req.params.pid;
};

const getAllGigs = async (req, res, next) => {
  let gigs;
  try {
    gigs = await Gig.find();
    res.json({
      gigs: gigs.map((inst) => inst.toObject({ getters: true })),
    });
  } catch (err) {
    return next(new HttpError("could not get all gigs", 404));
  }
};

const assignPlayerToPart = async (req, res, next) => {
  const gigId = req.params.gid;
  const { playerId } = req.body;
  let gig;
  let player;

  try {
    player = await Player.findById(playerId);
  } catch (error) {
    return next(new HttpError("could not find player", 404));
  }

  try {
    gig = await Gig.findById(gigId);
  } catch (error) {
    return next(new HttpError("could not find gig", 404));
  }

  if (!gig.hasPlayer(player)) {
    for (let part of gig.parts) {
      const inst = await Inst.findById(part.inst);
      if (inst.players.includes(playerId)) part.player = playerId;
    }
  }

  try {
    await gig.save();
  } catch (error) {
    return next(new HttpError("could not assign player to this gig", 500));
  }
  res.json({ gig });
};

module.exports = { createGig, getGigById, getAllGigs, assignPlayerToPart };