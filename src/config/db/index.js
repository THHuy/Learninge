// connect: mongodb://localhost
// import mongodb;

const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/quesion", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connect Successfully");
  } catch (error) {
    console.log("Error connecting");
  }
}
module.exports = { connect};
