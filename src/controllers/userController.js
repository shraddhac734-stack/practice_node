const { response } = require("express");
const userService = require("../services/userService");
const Response = require("../utils/response")
class userController {
  // Create User
  addUser = async (req, res, next) => {
    try {
      const result = await userService.addUser(req.body);
      return Response.success(
        res,
        "User Added Successfully",
        result,
        201
      );
    } catch (error) {
      return Response.error(res,error.message);
    }
  };
  getUserByUserId=async (req, res, next) => {
    try {
        const result =await userService.getUserByUserId(req?.params?.userId);
        return Response.success(
        result.body,
        "User Find Successfully",
        201
        );
    } catch (error) {
       return Response.error(res,error.message);
    }
  }
}
module.exports = new userController();
