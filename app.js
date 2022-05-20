require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cookieParser = require("cookie-parser")

const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");
const { connectDb } = require("./configs");
const { authRoute, userRoute } = require("./routes");
const { authenticate } = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use(notFound);
app.use(errorHandler);

const start = async (port, url) => {
  try {
    await connectDb(url);
    app.listen(port, console.log(`server is up and running at port ${port}...`));
  } catch (error) {
    console.log("Error while connecting to the database :- " + error.message);
  }
};

start(PORT, MONGO_URI);
