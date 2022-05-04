import dotenv from "dotenv";
dotenv.config();
import "express-async-error";
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
  app.listen(port, console.log(`server is up and running at port ${port}...`));
};

start(PORT, MONGO_URI);
