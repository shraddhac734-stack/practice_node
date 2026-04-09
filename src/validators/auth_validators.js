const { z } = require("zod");
const { UserRoleTypeList } = require("../enum/userRoleType");
const { genderType } = require("../enum/gender");
const { StatusUser } = require("../enum/userStatus");
const messageConstant = require("../constant/messageConstant");

const UPPER_REGEX = /[A-Z]/;
const LOWER_CASE=/[a-z]/;
const NUMBER=/[0-9]/;
const SYMBOL=/[@$!%*?&]/;
const ALPHABETS=/^[A-Za-z\s]+$/s;

const RoleEnum = z.enum(UserRoleTypeList);
const genderEnum = z.enum(genderType);
const userStatus = z.enum(StatusUser);

const email = z
  .string(messageConstant.EMAIL_REQUIRED)
  .email() //.transform used for transform value during parsing
  .trim()
  .min(8, messageConstant.EMAIL_TOO_SHORT)
  .max(255, messageConstant.EMAIL_TOO_LONG)

const password = z
  .string(messageConstant.PASSWORD_REQUIRED)
  .trim()
  .min(8, messageConstant.PASSWORD_TOO_SHORT)
  .max(64, messageConstant.PASSWORD_TOO_LONG)
  .refine((val) => UPPER_REGEX.test(val), messageConstant.MUST_UPPER)
  .refine((val) => LOWER_CASE.test(val), messageConstant.MUST_LOWER)
  .refine((val) => NUMBER.test(val), messageConstant.MUST_NUM)
  .refine((val) => SYMBOL.test(val), messageConstant.MUST_SYMBOL);

const nameField = z
  .string(messageConstant.NAME_REQUIRED)
  .trim()
  .min(2, messageConstant.NAME_TOO_SHORT)
  .max(255, messageConstant.NAME_TOO_LONG)
  .regex(ALPHABETS,messageConstant.ONLY_ALPHABETS);

const DateOfBirth = z.coerce.date();

const phone = z
  .string(messageConstant.PHONE_NUMBER_REQUIRED)
  .regex(/^\d{10}$/, messageConstant.PHONE_NUMBER_MUST_BE_10_DIGITS);

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

const city = z.string().regex(ALPHABETS, messageConstant.ONLY_ALPHABETS);

const State = z.string().regex(ALPHABETS, messageConstant.ONLY_ALPHABETS);

const Zipcode = z
  .number()
  .int()
  .gte(10000, messageConstant.INVALID_ZIP)
  .lte(999999, messageConstant.INVALID_ZIP);

const userSchema = z
  .object({
    email: email,
    password: password,
    firstName: nameField,
    middleName: nameField,
    lastName: nameField,
    gender: genderEnum,
    DateOfBirth: DateOfBirth,
    city: city,
    State: State,
    Zipcode: Zipcode,
    // status: userStatus,
    // Roles: RoleEnum,
    phone: phone,
  })
  .transform((data) => ({
    ...data,
    age: calculateAge(data.DateOfBirth),
    initialLetter: (data.firstName[0] + data.lastName[0]).toUpperCase(),
  }))
  .superRefine(
    (data,ctx)=>{
      const today =new Date();
      const dob = new Date(data.DateOfBirth);
      if(dob>today)
        ctx.addIssue({
      message:messageConstant.FUTURE_DATEOFBIRTH,
      path:["DateOfBirth"],
    });
    if(data.age<18)
      ctx.addIssue({
      message:messageConstant.NOT_ELIGIBLE,
      path:["DateOfBirth"],
      });
    });

// update schema (all optional)
const updateUserSchema = z.object({
  email: email.optional(),
  firstName:nameField.optional(),
  middleName:nameField.optional(),
  lastName:nameField.optional(),
  password: password.optional(),
  gender: genderEnum.optional(),
  DateOfBirth: DateOfBirth.optional(),
  city: city.optional(),
  State: State.optional(),
  Zipcode: Zipcode.optional(),
  sttaus: userStatus.optional(),
  roles: RoleEnum.optional(),
  phone: phone.optional(),
});

module.exports = { userSchema, updateUserSchema };
