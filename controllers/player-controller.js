const Player = require("../models/player");
const Inst = require("../models/inst");
const HttpError = require("../utils/http-error");

const createPlayer = async (req, res, next) => {
  const createdPlayer = new Player({
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    phone: req.body.phone,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
  });

  try {
    await createdPlayer.save();
    // console.log(createdPlayer);
  } catch (err) {
    return next(new HttpError("could not create player", 500));
  }

  let insts = [];
  for (let instId of req.body.insts) {
    try {
      const inst = await Inst.findById(instId);
      insts.push(inst);
    } catch (error) {
      return next(
        new HttpError("could not locate instrument of id  " + instId, 404)
      );
    }
  }

  for (let inst of insts) {
    try {
      if (!inst.players.includes(createdPlayer))
        inst.players.push(createdPlayer);
      await inst.save();
    } catch (error) {
      return next(
        new HttpError("could not complete inst adding  " + inst.name, 404)
      );
    }
  }

  res.status(201).json({ player: createdPlayer.toObject({ getters: true }) });
};

const getPlayerById = async (req, res, next) => {
  const playerId = req.params.pid;

  let player;

  try {
    player = await Player.findById(playerId);
  } catch (err) {
    return next(new HttpError("could not find player", 404));
  }

  res.status(201).json({ player: player.toObject({ getters: true }) });
};

const getAllPlayers = async (req, res, next) => {
  let players;
  try {
    players = await Player.find();
    res.json({
      players: players.map((player) => player.toObject({ getters: true })),
    });
  } catch (err) {
    return next(new HttpError("could not get all players", 404));
  }
};

const addInstsForPlayer = async (req, res, next) => {
  const playerId = req.params.pid;
  const { instsList } = req.body;

  let player;
  let insts = [];

  try {
    player = await Player.findById(playerId);
  } catch (error) {
    return next(new HttpError("could not find player", 404));
  }

  for (let instId of instsList) {
    try {
      const inst = await Inst.findById(instId);
      insts.push(inst);
    } catch (error) {
      return next(
        new HttpError("could not locate instrument of id  " + instId, 404)
      );
    }
  }

  for (let inst of insts) {
    try {
      if (!inst.players.includes(player)) inst.players.push(player);
      await inst.save();
    } catch (error) {
      return next(
        new HttpError("could not complete inst adding  " + inst.name, 404)
      );
    }
  }

  res
    .status(201)
    .json({ message: "successfully added player to instrument(s)" });
};

const getPlayersBySort = async (req, res, next) => {
  let sort = req.params.sort;
  let players;
  try {
    players = await Player.find();
    console.log(players);
    res.json({
      players: players.map((inst) => inst.toObject({ getters: true })),
    });
  } catch (err) {
    return next(new HttpError("could not get all players", 404));
  }
};

module.exports = {
  createPlayer,
  getPlayerById,
  getAllPlayers,
  addInstsForPlayer,
  getPlayersBySort,
};
