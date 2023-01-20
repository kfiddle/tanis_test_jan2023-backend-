const express = require("express");
const playerController = require("../controllers/player-controller");

const router = express.Router();

router.get("/", playerController.getAllPlayers);
router.post("/", playerController.createPlayer);
router.patch("/add-insts/:pid", playerController.addInstsForPlayer);

module.exports = router;
