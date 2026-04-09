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

  getAllUser =async (req,res,next) => {
    try{
      const result = await userService.getAllUser();
      const meta = getOkResponse(messageConstant.USERS_FOUND_SUCCESSFULLY);
      return getGeneralResponse(res,meta,result);
    }catch(error){
      console.log("error in getAllUser",error);
      next(error);
    }
  };
  updateUserById = async (req, res, next) => {
    try {
      const result = await userService.updateUserById(req.params.id,req.body);
      const meta = getUpdatedResponse(messageConstant.USER_UPDATED_SUCCESSFULLY);
      return getGeneralResponse(res,meta,result);
    } catch (error) {
      console.log("error in updateUserById", error);
      next(error);
    }
  };

  deleteUserById = async  (req,res,next)=> {
    try{
      const result = await userService.deleteUserById(req.params.id);
      const meta =  getDeletedResponse(messageConstant.USER_DELETED_SUCCESSFULLY);
      return getGeneralResponse(res,meta,result);
    }catch(error){
      console.log("error in deleteUserById", error);
      next(error);
    };
  };

  getUserListByFilter = async (req,res,next)=>{
    try{
      const result = await userService.getUserListByFilter(req.params.id);
      const meta =  getOkResponse(messageConstant.USERS_FOUND_SUCCESSFULLY);
      return getGeneralResponse(res,meta,result);
    }
    catch(error){
        console.log("Error in userListByFilter",error);
        next(error)
    }
  };
}

module.exports = new userController();
