const express = require("express");
const gigController = require("../controllers/gig-controller");

const router = express.Router();

router.get("/", gigController.getAllGigs);
router.post("/", gigController.createGig);

router.patch("/assign-player/:gid", gigController.assignPlayerToPart);

// router.get("/:pid", placesController.getPlaceById);

// router.get("/user/:uid", placesController.getPlacesByUserId);

// router.patch('/:pid', placesController.editPlace)

module.exports = router;
