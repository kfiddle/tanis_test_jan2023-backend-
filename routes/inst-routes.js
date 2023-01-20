const express = require("express");
const instController = require("../controllers/inst-controller");

const router = express.Router();

router.get('/', instController.getAllInsts)

router.post('/', instController.createInst)

// router.get("/:pid", placesController.getPlaceById);

// router.get("/user/:uid", placesController.getPlacesByUserId);

// router.patch('/:pid', placesController.editPlace)

module.exports = router;