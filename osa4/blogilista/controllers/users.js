/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// Kaikkien käyttäjien näyttäminen
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });

  response.json(users.map((u) => u.toJSON()));
});

// Uuden käyttäjän lisääminen
usersRouter.post("/", async (request, response) => {
  const { body } = request;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  if (body.password.length < 3) {
    return response
      .status(400)
      .json({ error: "password must be at least 3 digits long" });
  }
  const savedUser = await user.save();

  response.json(savedUser.toJSON());
});

module.exports = usersRouter;
