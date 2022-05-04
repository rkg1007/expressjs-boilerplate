import { StatusCodes } from "http-status-codes";
import { CustomError } from "./";

class BadRequest extends CustomError {
  constructor(message) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export default BadRequest;
