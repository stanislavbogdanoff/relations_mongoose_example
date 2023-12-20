const mongoose = require("mongoose");

const passportSchema = new mongoose.Schema({
  number: Number,
  human: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Human",
  },
});

const Passport = mongoose.model("Passport", passportSchema);

const humanSchema = new mongoose.Schema({
  name: String,
  passport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Passport",
  },
});

const Human = mongoose.model("Human", humanSchema);

module.exports = { Passport, Human };
