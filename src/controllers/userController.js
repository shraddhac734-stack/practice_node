const { response } = require("express");
const userService = require("../services/userService");
const Response = require("../utils/response")
const messageConstant = require("../constant/messageConstant")
class userController {
  // Create User
  addUser = async (req, res, next) => {
    try {
      const result = await userService.addUser(req.body);
      return Response.success(
        res,
        messageConstant.USER_ADDED_SUCCESSFULLY,
        result,
        201
      );
    } catch (error) {
      return Response.error(res,error.message);
    }
  };
  getUserById=async (req, res, next) => {
    try {
        const result =await userService.getUserById(req.params.id);
        return Response.success(
        result.body,
        messageConstant.USERS_FOUND_SUCCESSFULLY,
        201
        );
    } catch (error) {
       console.log("error in getUserById",error);
       next(error);
       
    }
  }
}
module.exports = new userController();
