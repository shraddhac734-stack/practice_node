const { z } = require("zod");
const messageConstant = require("../constant/messageConstant");

const email = z
  .string(messageConstant.EMAIL_REQUIRED)
  .trim()
  .email(messageConstant.VALID_EMAIL)
  .min(5, messageConstant.EMAIL_TOO_SHORT)
  .max(255, messageConstant.EMAIL_TOO_LONG);
const password = z
  .string(messageConstant.PASSWORD_REQUIRED)
  .trim()
  .min(8, messageConstant.PASSWORD_TOO_SHORT)
  .max(64, messageConstant.PASSWORD_TOO_LONG);
const name = z
  .string(messageConstant.NAME_REQUIRED)
  .trim()
  .min(2, messageConstant.NAME_TOO_SHORT)
  .max(255, messageConstant.NAME_TOO_LONG);
const phone = z
  .string(messageConstant.PHONE_NUMBER_REQUIRED)
  .trim()
  .regex(/^\d{10}$/, messageConstant.PHONE_NUMBER_MUST_BE_10_DIGITS);


  const userSchema = z.object({
  email: email,
  password: password,
  name: name,
  phone: phone,
});
// update schema (all optional)
const updateUserSchema = z.object({
  email: email.optional(),
  password: password.optional(),
  name: name.optional(),
  phone: phone.optional(),
});



module.exports = { userSchema, updateUserSchema };
