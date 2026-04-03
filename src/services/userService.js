const UserRepository = require("../repositories/userRepo");
const bcrypt = require("bcrypt");
const messageConstant = require("../constant/messageConstant");
const {userSchema}=require("../validators/auth_validators")
class userService {
  // Create User
  async addUser(data) {
    // const { email, name, password } = data || {} // || ?? !!
    // if (!name || !email || !password) {
    //  return (messageConstant.INVALID_REQUEST);
    // }
    const result =userSchema.safeParse(data);
    console.log(data);
    if(!result.success){
      //  console.log(userSchema);
      throw new Error(result.error.issues[0].message);
      // return Response.error(
      //     userSchema.error.errors[0].message, 
      //     400
        // );
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
      throw new Error(messageConstant.INVALID_REQUEST);
    }
    const user = await UserRepository.getUserById(id);
    if (!user) {
      throw new Error(messageConstant.NOT_FOUND);
    }
    return user;
  }
}
module.exports = new userService();