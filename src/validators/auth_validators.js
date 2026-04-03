const { z } = require("zod");
const messageConstant=require('../constant/messageConstant')

const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: messageConstant.ENTER_MIN_CHAR })
    .max(15, { message: messageConstant.ENTER_MAX_CHAR }),

  email: z
    .string()
    .trim()
    .email({ message: messageConstant.VALID_EMAIL }),

  password: z
    .string()
    .min(6, { message: messageConstant.VALID_PASS }),
});

module.exports = { userSchema };