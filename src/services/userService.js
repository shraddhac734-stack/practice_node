const UserRepository = require("../repositories/userRepo");
class userService {
  // Create User
  async addUser(data) {
    // store data into and return it
    return await UserRepository.addUser(data);
  }
}
module.exports = new userService();
