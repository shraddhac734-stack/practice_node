const messageConstant = require("../constant/messageConstant");

class Response {
  static success(res, message, data = null, statusCode = 200) {
    return res.status(statusCode).json({
      status: "SUCCESS",
      code: statusCode,
      description: message,
      data: data,
    });
  }
  static error(res, message, statusCode = 500) {
    return res.status(statusCode).json({
      status: "ERROR",
      code: statusCode,
      description: message,
      data: null,
    });
  }
}

function getNotFoundResponse(message = MessageConstant.NO_DATA_FOUND) {
  return new Response(404, MessageConstant.ERROR, message);
}


function getOkResponse(message) {
  return new Response(200, MessageConstant.OK, message);
}
((module.exports = Response),
  {getNotFoundResponse, getOkResponse });
