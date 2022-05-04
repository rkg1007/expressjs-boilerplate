import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors";

const errorHandler = (err, req, res, next) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let msg = "internal server error";

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    msg = err.message;
  }

  res.status(statusCode).json({
    status: "failed",
    msg,
  });
};

export default errorHandler;
