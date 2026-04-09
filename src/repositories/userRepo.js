const messageConstant = require("../constant/messageConstant");
const User = require("../models/User");

class userRepository {
  // Create User
  async addUser(data) {
    return await User.create(data);
  }

  //Login User
  async loginUser(email){
   const user=await User.findOne({
    where:{ email},
   }) 
    if(!user) return null;
    return user; 
  }

  // Get User By Id
  async getUserById(id) {
    const user = await User.findOne({
      where: { id, softDelete: false },
    });

    if (!user) return null;

    return user;
  }

  async getUserByid(id) {
    return await User.findByPk(id);
  }

  //Delete User
  async deleteUserById(id) {
    return await User.update(
      { softDelete: true },
      {
        where: { id, softDelete: false },
      },
    );
  }

  //GetAllUsers
  async getAllUser() {
    return await User.findAll({
      where: { softDelete: false },
    });
  }

  //GetUserListByFilter
  async getUserListByFilter() {
    return;
  }
}

module.exports = new userRepository();
