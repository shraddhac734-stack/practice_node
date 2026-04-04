// const { response } = require("express");
const userService = require("../services/userService");
const Response = require("../utils/response");
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
      next(error);
      // return Response.error(res,error.message);
    }
  };

  getUserById=async (req, res, next) => {
    try {
        const result =await userService.getUserById(req.params.id);
        return Response.success(
        res,      
        messageConstant.USERS_FOUND_SUCCESSFULLY,
        result,
        201
        );
        
    } catch (error) {
       console.log("error in getUserById",error);
       return Response.error(res,error.message);
    }
  }
}
module.exports = new userController();
