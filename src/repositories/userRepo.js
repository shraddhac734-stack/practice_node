const User = require("../models/User");
class userRepository {
 // Create User
 async addUser(data) {
 return await User.create(data);
 }
}
module.exports = new userRepository();