const { Publisher, Game } = require("../models/gameSchema");

//@desc   Create new game and new publisher
//@route  POST /games
//@access Public
const createGame = async (req, res) => {
  const newPublisher = new Publisher({
    companyName: "Ubisoft",
    website: "ubisoft.com",
  });

  const newGame = new Game({ title: "Far Cry 19", publisher: newPublisher });

  const result = await newGame.save();

  res.status(201).json(result);
};

module.exports = { createGame };
