const UserRepository = require("../repositories/userRepo");
const bcrypt = require("bcrypt")
const Response = require("../utils/response")
class userService {
  // Create User
  async addUser(data) {
    const { email, name, password } = data;
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    //password becrypt
    data.password=await bcrypt.hash(password,10);

    // store data into and return it
    return await UserRepository.addUser(data);
  }
}
module.exports = new userService();
