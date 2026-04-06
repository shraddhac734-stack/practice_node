const userService = require("../services/userService");
const { getCreatedResponse, getOkResponse, getGeneralResponse, getUpdatedResponse, getDeletedResponse} = require("../utils/response");
const messageConstant = require("../constant/messageConstant");
class userController {
  // Create User
  addUser = async (req, res, next) => {
    try {
      const result = await userService.addUser(req.body);
      const meta = getCreatedResponse(messageConstant.USER_ADDED_SUCCESSFULLY);
      return getGeneralResponse(res, meta, result);
    } catch (error) {
      console.log("Error in addUser",error);
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const result = await userService.getUserById(req.params.id);
      const meta = getOkResponse(messageConstant.USERS_FOUND_SUCCESSFULLY);
      return getGeneralResponse(res ,meta,result);
    } catch (error) {
      console.log("error in getUserById", error);
      next(error);
    }
  };

  updateUserById = async (req, res, next) => {
    try {
      const result = await userService.updateUserById(req.params.id);
      const meta = getUpdatedResponse(messageConstant.USER_UPDATED_SUCCESSFULLY);
      return getGeneralResponse(res,meta,result);
    } catch (error) {
      console.log("error in updateUserById", error);
      next(error);
    }
  };
}
module.exports = new userController();
