const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quesAns = new Schema({
  ques: String,
  ans: String,
});

const exerciseSchema = new mongoose.Schema({
  id: Number,
  words: [String],
  quesion: [[quesAns]],
});

const vocabulary = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  brief: String,
  id_start: Number,
  exercises: [exerciseSchema],
});

module.exports = vocabulary;
