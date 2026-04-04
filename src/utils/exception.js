const { StatusCodes } = require("http-status-codes");
const MessageConstant = require("../constant/messageConstant");

class BaseError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = MessageConstant.ERROR
        Error.captureStackTrace(this, this.constructor);
    }
}

class InvalidRequestException extends BaseError {
    constructor(message = MessageConstant.INVALID_REQUEST) {
        super(message, StatusCodes.BAD_REQUEST);
    }
}

class NotFoundException extends BaseError {
    constructor(message = MessageConstant.NOT_FOUND) {
        super(message, StatusCodes.NOT_FOUND);
    }
}
module.exports = {
    BaseError,
    InvalidRequestException,
    NotFoundException
};