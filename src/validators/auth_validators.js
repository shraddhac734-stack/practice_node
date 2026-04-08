const { z } = require("zod");
const { UserRoleTypeList } = require("../enum/userRoleType");
const { genderType } = require("../enum/gender");
const { StatusUser } = require("../enum/userStatus");
const messageConstant = require("../constant/messageConstant");

const RoleEnum = z.enum(UserRoleTypeList);
const genderEnum = z.enum(genderType);
const userStatus = z.enum(StatusUser);

const email = z
  .string(messageConstant.EMAIL_REQUIRED)
  .email() //.transform used for transform value during parsing
  .trim()
  .refine((val) => val.endsWith("@gmail.com"), {
    message: messageConstant.VALID_EMAIL,
  })
  .min(8, messageConstant.EMAIL_TOO_SHORT)
  .max(255, messageConstant.EMAIL_TOO_LONG);

const password = z
  .string(messageConstant.PASSWORD_REQUIRED)
  .trim()
  .min(8, messageConstant.PASSWORD_TOO_SHORT)
  .max(64, messageConstant.PASSWORD_TOO_LONG)
  .refine((val) => /[A-Z]/.test(val), "Must contain uppercase")
  .refine((val) => /[a-z]/.test(val), "Must contain lowercase")
  .refine((val) => /[0-9]/.test(val), "Must contain number")
  .refine((val) => /[@$!%*?&]/.test(val), "Must contain special character");

// const firstName = z
//   .string(messageConstant.NAME_REQUIRED)
//   .trim()
//   .min(2, messageConstant.NAME_TOO_SHORT)
//   .max(255, messageConstant.NAME_TOO_LONG)
//   .regex(/^[A-Za-z\s]+$/);

// const middleName = z
//   .string(messageConstant.NAME_REQUIRED)
//   .trim()
//   .min(2, messageConstant.NAME_TOO_SHORT)
//   .max(255, messageConstant.NAME_TOO_LONG)
//   .regex(/^[A-Za-z\s]+$/);

// const lastName = z
//   .string(messageConstant.NAME_REQUIRED)
//   .trim()
//   .min(2, messageConstant.NAME_TOO_SHORT)
//   .max(255, messageConstant.NAME_TOO_LONG)
//   .regex(/^[A-Za-z\s]+$/s);

const nameField = z
  .string(messageConstant.NAME_REQUIRED)
  .trim()
  .min(2, messageConstant.NAME_TOO_SHORT)
  .max(255, messageConstant.NAME_TOO_LONG)
  .regex(/^[A-Za-z\s]+$/s);

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

const city = z.string().regex(/^[A-Za-z\s]+$/, messageConstant.NO_ALFABATES);

const State = z.string().regex(/^[A-Za-z\s]+$/, messageConstant.NO_ALFABATES);

const Zipcode = z
  .number()
  .int()
  .gte(10000, "Invalid zipcode")
  .lte(999999, "Invalid zipcode");

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
    status: userStatus,
    Roles: RoleEnum,
    phone: phone,
  })
  .transform((data) => ({
    ...data,
    age: calculateAge(data.DateOfBirth),
    initialLetter: (data.firstName[0] + data.lastName[0]).toUpperCase(),
  }))
  .refine((data)=>{
    const today=new Date();
    const dob =new Date(data.DateOfBirth);
    return dob<=today
  },
  {
      message: "Date of birth cant be in future",
      path: ["DateOfBirth"],
  },)
  .refine(
    (data) => {
      const age = calculateAge(data.DateOfBirth);
      return age >= 18;
    },
    {
      message: "Not eligible for login",
      path: ["DateOfBirth"],
    },
  );

// update schema (all optional)
const updateUserSchema = z.object({
  email: email.optional(),
  password: password.optional(),
  // firstName: firstName.optional(),
  // middleName: middleName.optional(),
  // lastName: lastName.optional(),
  gender: genderEnum.optional(),
  DateOfBirth: DateOfBirth.optional(),
  city: city.optional(),
  State: State.optional(),
  Zipcode: Zipcode.optional(),
  sttaus: userStatus.optional(),
  Roles: RoleEnum.optional(),
  phone: phone.optional(),
});

module.exports = { userSchema, updateUserSchema };
