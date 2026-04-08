const UserRepository = require("../repositories/userRepo");
const messageConstant = require("../constant/messageConstant");
const {
  InvalidRequestException,
  NotFoundException,
} = require("../utils/exception");
const {
  userSchema,
  updateUserSchema,
} = require("../validators/auth_validators");
const User = require("../models/User");
const { success } = require("zod");
const bcrypt = require("bcrypt");
class userService {
  // Create User
  async addUser(data) {
    // const { email, name, password } = data || {} // || ?? !!
    const result = userSchema.safeParse(data);
    console.log(data);
    if (!result.success) {
      //  console.log(userSchema);
      throw result.error;
    }
    // Get validated data
    const validatedData = result.data;
    //password becrypt
    // validatedData.password = await bcrypt.hash(validatedData.password, 10);

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
    if (!id) {
      throw new InvalidRequestException(messageConstant.INVALID_REQUEST);
    }

    if (!data || Object.keys(data).length === 0) {
      throw new InvalidRequestException(messageConstant.INVALID_REQUEST);
    }

    const result = updateUserSchema.safeParse(data);

    if (!result.success) {
      throw new InvalidRequestException(result.error.issues[0].message);
    }

    const validateData = result.data;
    const user = await UserRepository.getUserByid(id);

  if (!user) {
    throw new Error("User not found");
  }
console.log(validateData);

  // ✅ STEP 2: Update values
  Object.assign(user, validateData);
  if (data?.password) {
            // convert password in becrypt
            data.password = await bcrypt.hash(data?.password, 10);
        }
    console.log(validateData);
  // ✅ STEP 3: Save (HOOK WILL RUN)
  await user.save();

  return user;
    // return updated[1]?.[0] || null;
  }

  //DeleteUserById
  async deleteUserById(id) {
    if (!id) {
      throw new InvalidRequestException(messageConstant.INVALID_REQUEST);
    }
    const user = await UserRepository.deleteUserById(id);
    if (!user?.[0]) {
      throw new NotFoundException(messageConstant.NO_DATA_FOUND);
    }
  }

  //getAllUser
  async getAllUser() {
    return await UserRepository.getAllUser();
  }

  //getUserListByFilter
  async getUserListByFilter() {
    const result = await UserRepository.getUserListByFilter(
      req?.filter,
      req?.sort,
      req?.page,
    );
    return { success: true, body: result };
  }
}
module.exports = new userService();
