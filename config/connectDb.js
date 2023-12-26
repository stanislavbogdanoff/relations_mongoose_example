const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoUri = process.env.MONGO_URI;

const connectDb = () => {
  mongoose.connect(mongoUri).then(() => console.log("Connected to MongoDB"));
};

module.exports = { connectDb };
