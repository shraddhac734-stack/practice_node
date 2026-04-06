const messageConstant = {
    // RESPONSE
    SUCCESS: "Success",
    ERROR: "Error",
    OK: "OK",
    CREATED: "CREATED",
    UPDATED: "UPDATED",
    DELETED: "DELETED",
    NO_DATA_FOUND: "No data found",
    SOMETHING_WENT_WRONG: "Something went wrong, please try again later",

  // USER
  USER_ADDED_SUCCESSFULLY: "User Added Successfully",
  USER_UPDATED_SUCCESSFULLY: "User Updated Successfully",
  USER_DELETED_SUCCESSFULLY: "User Deleted Successfully",
  USERS_FOUND_SUCCESSFULLY: "User Found Successfully",
  LOGIN_SUCCESSFULLY: "Login Successfully",

  //EXCEPTION
  INVALID_REQUEST: "Invalid request",
  NOT_FOUND: "Not found",
  UNAUTHORIZED: "Unauthorized",
  INTERNAL_SERVER_ERROR: "Internal server error",
  USER_DOES_NOT_EXIST_WITH_THIS_EMAIL: "User does not exist with this email",
  INCORRECT_PASSWORD: "Incorrect password",
  USER_ALREADY_EXISTS_WITH_THIS_EMAIL: "User already exists with this email",

  //VALIDATIORS
  VALID_EMAIL:"Please enter valid email",
  EMAIL_REQUIRED:"Please Enter Email",
  EMAIL_TOO_SHORT:"Email must be atleast 5 character",
  EMAIL_TOO_LONG:"Email is too long",
  PASSWORD_REQUIRED:"Enter Password",
  PASSWORD_TOO_SHORT:"PASSWORD_TOO_SHORT",
  PASSWORD_TOO_LONG:"PASSWORD_TOO_LONG",
  NAME_REQUIRED:"Enter Name",
  NAME_TOO_SHORT:"name is too short",
  NAME_TOO_LONG:"name is too long ",
  PHONE_NUMBER_REQUIRED:"Enter phone number",
  PHONE_NUMBER_MUST_BE_10_DIGITS:"Enter only 10 digit number"
};
module.exports = messageConstant;
