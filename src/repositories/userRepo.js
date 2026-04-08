const User = require("../models/User");

class userRepository {
  // Create User
  async addUser(data) {
    return await User.create(data);
  }

  // Get User By Id
  async getUserById(id) {
    const user = await User.findOne({
      where: { id, softDelete: false },
    });

    if (!user) return null;

    return user; //IMPORTANT
  }
  // Update User
  async updateUserById(id, data) {
    return await User.update(data, {
      where: { id },
      returning: true,
    });
    // [1]
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
  async getUserListByFilter(){
    return 
  }
}

module.exports = new userRepository();
