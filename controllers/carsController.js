const { Car, Driver } = require("../models/driverSchema");

//@desc   Create new car and new driver
//@route  POST /drivers
//@access Public
const createCarAndDriver = async (req, res) => {
  const car = await Car.create({
    model: "Toyota Camry",
    producer: "Toyota",
  });

  const driver = await Driver.create({
    name: "Johnny Sack",
    car: car._id,
  });

  res.status(201).json(driver);
};

//@desc   Get driver by id
//@route  GET /drivers
//@access Public
const getDriver = async (req, res) => {
  const driver = await Driver.findOne({
    _id: "6581a82159ca39d652adb554",
  }).populate("car");

  res.status(200).json(driver);
};

module.exports = { createCarAndDriver, getDriver };
