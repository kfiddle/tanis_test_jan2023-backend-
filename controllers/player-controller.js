const Player = require("../models/player");
const Inst = require("../models/inst");
const HttpError = require("../utils/http-error");

const createPlayer = async (req, res, next) => {
  const { fName, lName, email, phone } = req.body;

  const createdPlayer = new Player({ fName, lName, email, phone });
  try {
    await createdPlayer.save();
  } catch (err) {
    return next(new HttpError("could not create player", 500));
  }

  res.status(201).json({ player: createdPlayer.toObject({ getters: true }) });
};

const getPlayerById = (req, res, next) => {
  const playerId = req.params.pid;
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
    console.log(players)
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