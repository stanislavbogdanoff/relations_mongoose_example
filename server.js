const express = require("express");
const mongoose = require("mongoose");
const { Publisher, Game } = require("./gameSchema");
const { Car, Driver } = require("./driverSchema");
const { Passport, Human } = require("./passportSchema");
const { Post, Comment } = require("./postSchema");
const app = express();

const mongoUri =
  "mongodb+srv://admin:admin@cluster0.gvrgdak.mongodb.net/lesson_db?retryWrites=true&w=majority";

mongoose.connect(mongoUri).then(() => console.log("Connected to MongoDB"));

app.get("/", (req, res) => {
  res.status(200).json("Succcess");
});

app.post("/games", async (req, res) => {
  const newPublisher = new Publisher({
    companyName: "Ubisoft",
    website: "ubisoft.com",
  });

  const newGame = new Game({ title: "Far Cry 19", publisher: newPublisher });

  const result = await newGame.save();

  res.status(201).json(result);
});

app.post("/drivers", async (req, res) => {
  const car = await Car.create({
    model: "Toyota Camry",
    producer: "Toyota",
  });

  const driver = await Driver.create({
    name: "Johnny Sack",
    car: car._id,
  });

  res.status(201).json(driver);
});

app.get("/drivers", async (req, res) => {
  const driver = await Driver.findOne({ _id: "6581a82159ca39d652adb554" });

  const car = await Car.findOne({ _id: driver.car });

  driver.car = car;

  res.status(200).json(driver);
});

app.post("/passports", async (req, res) => {
  // создаем "паспорт без человека"
  const passport = await Passport.create({
    number: 566,
  });

  // создаем человека с паспортом
  const human = await Human.create({
    name: "Dr. Jennifer Melfi",
    passport: passport._id,
  });

  // вставляем человека в "паспорт без человека"
  const newPassport = await Passport.findByIdAndUpdate(
    passport._id,
    {
      human: human._id,
    },
    { new: true }
  );

  res.status(201).json({ newPassport, human });
});

app.post("/posts", async (req, res) => {
  const post = await Post.create({
    title: "QQQ",
    text: "Qqqqqqqqqqqq",
  });

  const comment = await Comment.create({
    text: "My AAAA comment",
    post: post._id,
  });

  const comment2 = await Comment.create({
    text: "My BBB comment",
    post: post._id,
  });

  const newPost = await Post.findByIdAndUpdate(
    post._id,
    {
      $push: { comments: [comment._id, comment2._id] },
    },
    { new: true }
  );

  res.status(200).json(newPost);
});

app.get("/posts", async (req, res) => {
  const post = await Post.findById("6581b1bf4034071fce2d353e");

  const commentsArray = await Comment.find({ post: post._id });

  post.comments = commentsArray;

  res.status(200).json(post);
});

app.listen(5000, () => console.log("Server is running on port 5000"));
