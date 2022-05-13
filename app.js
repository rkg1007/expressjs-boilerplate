require("dotenv").config();
require("express-async-error");
const express = require("express");

const connectDb = require("./utils/connect-db");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// middlewares
app.use(express.json());

// routes
app.use(notFound);
app.use(errorHandler);

const start = (port, url) => {
  try {
    connectDb(url)
    app.listen(port, console.log(`server is up and running at port ${port}...`));
  } catch (error) {
    console.log("Error while connecting to the database :- " + error.message);
  }
};

start(PORT, MONGO_URI);
