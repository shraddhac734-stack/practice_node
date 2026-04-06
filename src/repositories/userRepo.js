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
}

module.exports = new userRepository();