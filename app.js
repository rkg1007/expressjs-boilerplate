import dotenv from "dotenv";
dotenv.config();
import "express-async-error";
import { connectDb } from "./configs";
import notFound from "./middlewares/not-found.js";
import errorHandler from "./middlewares/error-handler.js";

import express from "express";

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
    await connectDb(url);
    app.listen(port, console.log(`server is up and running at port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start(PORT, MONGO_URI);
