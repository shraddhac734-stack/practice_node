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

module.exports = Response;