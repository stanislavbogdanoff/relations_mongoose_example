const express = require("express");
const router = express.Router();

const {
  createCarAndDriver,
  getDriver,
} = require("../controllers/carsController");

// /drivers
router.post("/", createCarAndDriver);
router.get("/", getDriver);

module.exports = router;
