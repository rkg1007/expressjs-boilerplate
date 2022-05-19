const mongoose = require("mongoose");

const connectDb = (url) => {
  return mongoose.connect(url);
}

mongoose.exports = connectDb;