const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const { Passport, Human } = require("./models/passportSchema");
const { Post, Comment } = require("./models/postSchema");
const { connectDb } = require("./config/connectDb");

// Импорт контроллеров
const { successController } = require("./controllers/successController");
const { createGame } = require("./controllers/gamesController");

// Вызов функции подключения к MongoDB`
connectDb();

// Для автосчитывания тел запросов в формате JSON
app.use(express.json());

// Использование переменной среды для номера порта
const port = process.env.PORT;

// Эндпоинты
app.get("/", successController);

app.post("/games", createGame);

// Импорт маршртуизатора для машин/водителей
app.use("/drivers", require("./routes/carsRoutes"));

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
  const post = await Post.findById("6581b6d4218aefc8053c4396").populate(
    "comments"
  );

  res.status(200).json(post);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
