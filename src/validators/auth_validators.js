const { z } = require("zod");

const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(15, { message: "Name must be at most 15 characters" }),

  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

module.exports = { userSchema };