const User = require("../models/User");
class userRepository {
  // Create User
  async addUser(data) {
    return await User.create(data);
  }

  //GetUserById
  async getUserById(id) {
    const User = await User.findOne({
      where: { id, softDelete: false },
    });
    if (!user) return null;
  }
}
module.exports = new userRepository();