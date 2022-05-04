import { StatusCodes } from "http-status-codes";
import { CustomError } from "./";

class NotFound extends CustomError {
  constructor(message) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export default NotFound;
