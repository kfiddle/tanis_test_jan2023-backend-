// const inst = require("../models/inst");
const Inst = require("../models/inst");
const HttpError = require("../utils/http-error");

const createInst = async (req, res, next) => {
  const { name } = req.body;

  const previousInst = await Inst.findOne({ name });
  if (previousInst) {
    return next(new HttpError("instrument already exists", 422));
  }

  const createdInst = new Inst({ name, players: [] });
  try {
    await createdInst.save();
  } catch (err) {
    return next(new HttpError("could not create instrument", 500));
  }

  res.status(201).json({ instrument: createdInst.toObject({ getters: true }) });
};

const getInstById = async (req, res, next) => {
  const instId = req.params.iid;

  let inst;
  try {
    inst = await Inst.findById(instId).populate('players');
  } catch (err) {
    return next(new HttpError("cannot find this instrument"), 404);
  }

  res.json({ inst: inst.toObject({ getters: true }) });
};

const getAllInsts = async (req, res, next) => {
  let insts;
  try {
    insts = await Inst.find();
    res.json({ insts: insts.map((inst) => inst.toObject({ getters: true })) });
  } catch (err) {
    return next(new HttpError("could not get all instruments", 404));
  }
};

const getPlayersOfInst = async (req, res, next) => {
  let instId = req.params.iid;
  let players;
  let inst;
  try {
    inst = Inst.findById(instId);
    players = inst.players;
  } catch (err) {
    return next(new HttpError("could not find players of this inst"), 404);
  }

  res
    .status(201)
    .json({
      players: players.map((player) => player.toObject({ getters: true })),
    });
};

module.exports = { createInst, getInstById, getAllInsts };
