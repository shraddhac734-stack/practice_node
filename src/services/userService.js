const UserRepository = require("../repositories/userRepo");
const bcrypt = require("bcrypt");
const messageConstant = require("../constant/messageConstant");
const {
  InvalidRequestException,
  NotFoundException,
} = require("../utils/exception");
const { userSchema,updateUserSchema } = require("../validators/auth_validators");
class userService {
  // Create User
  async addUser(data) {
    // const { email, name, password } = data || {} // || ?? !!
    const result = userSchema.safeParse(data);
    console.log(data);
    if (!result.success) {
      //  console.log(userSchema);
      throw new Error(result.error.issues[0].message);
    }
    // Get validated data
    const validatedData = result.data;
    //password becrypt
    validatedData.password = await bcrypt.hash(validatedData.password, 10);

    // store data into and return it
    return await UserRepository.addUser(validatedData);
  }
  //GetUserById
  async getUserById(id) {
    if (!id) {
      throw new InvalidRequestException(messageConstant.INVALID_REQUEST);
    }
    const user = await UserRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(messageConstant.NOT_FOUND);
    }
    return user;
  }
  //UpdateUserById
      async updateUserById(id, data) {
        if (!id || !data)
            throw new InvalidRequestException(
                messageConstant.INVALID_REQUEST,
            );
        if (data?.password) {
            // convert password in becrypt
            data.password = await bcrypt.hash(data?.password, 10);
        }
        const updated = await UserRepository.updateUserById(id, data);
        // Sequelize update returns: [count, [updatedObject]]
        return updated[1]?.[0] || null;
    }
}
module.exports = new userService();
