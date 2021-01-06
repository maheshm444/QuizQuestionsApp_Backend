
const { Question, validate } = require("../models/question");
const { Genre } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const questions = await Question.find()
    .select("-__v")
    .sort("name");
  res.send(questions);
});


router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

const question = new Question({
  title: req.body.title,
  option1: req.body.option1,
  option2: req.body.option2,
  option3: req.body.option3,
  addedDate: moment().toJSON()
});
await question.save();

res.send(question);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = await Question.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      modifiedDate: moment().toJSON()
    },
    { new: true }
  );

  if (!question)
    return res.status(404).send("The question with the given ID was not found.");

  res.send(question);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const question = await Question.findByIdAndRemove(req.params.id);

  if (!question)
    return res.status(404).send("The question with the given ID was not found.");

  res.send(question);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const question = await Question.findById(req.params.id).select("-__v");

  if (!question)
    return res.status(404).send("The question with the given ID was not found.");

  res.send(question);
});

module.exports = router;
