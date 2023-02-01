const express = require("express");
const instController = require("../controllers/inst-controller");

const router = express.Router();

router.get('/', instController.getAllInsts)

router.post('/', instController.createInst)

router.get("/:iid", instController.getInstById);

// router.get("/user/:uid", placesController.getPlacesByUserId);

// router.patch('/:pid', placesController.editPlace)

module.exports = router;