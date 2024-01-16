const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointSchema = new Schema({
  username: String,
  ex: String,
  title: String,
  point: Number,
  group: Number,
});

module.exports = pointSchema;
