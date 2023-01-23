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

const getInstById = (req, res, next) => {
  const instId = req.params.pid;
  const place = dummyPlaces.find((p) => p.id === placeId);
  if (!place) throw new HttpError("there is no such place", 404);

  res.json({
    message: "we good with ... " + instId,
    place,
  });
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

module.exports = { createInst, getInstById, getAllInsts };
