const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: String,
  producer: String,
});

const Car = mongoose.model("Car", carSchema);

const driverSchema = new mongoose.Schema(
  {
    name: String,
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  },
  {
    timestamps: true,
    collection: "car_drivers",
  }
);

// car_drivers

const Driver = mongoose.model("Driver", driverSchema);

module.exports = { Car, Driver };
