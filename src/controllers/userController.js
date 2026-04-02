const userService = require("../services/userService");
class userController {
  // Create User
  addUser = async (req, res, next) => {
    try {
      const result = await userService.addUser(req.body);
      return res.status(201).json({
        status: 201,
        code: "CREATED",
        description: "User Added Successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new userController();
