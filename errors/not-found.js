const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custom-error");

class NotFound extends CustomError {
  constructor(message) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

module.exports = NotFound;
