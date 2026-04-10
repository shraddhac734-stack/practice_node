const UserRepository = require("../repositories/userRepo");
const messageConstant = require("../constant/messageConstant");
const { sendEmail } = require("./emailSevice");
const crypto = require("node:crypto");
const { emailTemplate } = require("../templates/emailTemplate");
const { loginTemplate } = require("../templates/loginTemplate");
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
const userRepo = require("../repositories/userRepo");
const { blockUserTemplate } = require("../templates/blockUserTemplate");

class userService {
  // Create User
  async addUser(data) {
    const result = userSchema.safeParse(data);
    console.log(data);
    if (!result.success) {
      throw result.error;
    }
    const validatedData = result.data;
    const newUser = await UserRepository.addUser(validatedData);
    const date = newUser.createdAt;
    const htmlContent = emailTemplate(
      data.firstName,
      data.email,
      date.toLocaleString(),
      process.env.LOGIN_URL,
    );
    await sendEmail(
      data.email,
      messageConstant.USER_ADDED_SUCCESSFULLY,
      htmlContent,
    );
    return newUser;
  }

  async verifyOtp(data) {}

  //Login User
  async loginUser(data) {
    console.log("LOGIN DATA", data);
    if (!data)
      throw new InvalidRequestException(messageConstant.INVALID_REQUEST);

    const { email, password } = data;
    if (!email || !password) {
      throw new InvalidRequestException(
        messageConstant.EMAIL_PASSWORD_REQUIRED,
      );
    }
    const user = await UserRepository.loginUser(email);
    if (!user)
      throw new InvalidRequestException(messageConstant.INVALID_REQUEST);
    // WRONG PASSWORD LOGIC
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const currentAttempts = Number(user.loginAttempts) || 0;
      const newAttempts = currentAttempts + 1;
      if (newAttempts >= 5) {
        // Block the user
        await user.update({
          loginAttempts: newAttempts,
          status: "BLOCK",
        });
        const htmlContent = blockUserTemplate(user.firstName, user.email);

        // Use a try-catch for the email so it doesn't crash the whole process
        try {
          await sendEmail(
            data.email,
            messageConstant.USER_BLOCKED,
            htmlContent,
          );
        } catch (mailError) {
          console.error("Failed to send block email:", mailError);
        }
        throw new Error(messageConstant.TOO_MANY_ATTEMPTS);
      } else {
        // Increment attempt count
        await user.update({ loginAttempts: newAttempts });
        throw new Error(
          messageConstant.INCORRECT_PASSWORD `${5 - newAttempts} attempts remaining.`,
        );
      }
    } else {
      // Reset attempts back to 0 on successful login
      await user.update({ loginAttempts: 0 });
      const otpStore = {};
      const otp = crypto.randomInt(100000, 999999).toString();

      // Store OTP with 5-minute expiry
      otpStore[email] = {
        otp: otp,
        expires: Date.now() + 300000,
      };
      const htmlContent = loginTemplate(user.firstName, user.email, otp);
      await sendEmail(
        data.email,
        messageConstant.USER_LOGIN_SUCCESSFULLY,
        htmlContent,
      );
    }
    return user;
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
      throw new Error(messageConstant.USER_NOT_FOUND);
    }
    //  Update values
    Object.assign(user, validateData);
    if (data?.password) {
      data.password = await bcrypt.hash(data?.password, 10);
    }
    await user.save();
    return user;
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
