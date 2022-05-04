import { StatusCodes } from "http-status-codes";
import { CustomError } from "./";

class Unauthenticated extends CustomError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default Unauthenticated;
