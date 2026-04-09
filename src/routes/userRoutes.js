const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.post("/add", userController.addUser);
router.get("/:id",userController.getUserById);
router.put("/:id",userController.updateUserById);
router.delete("/delete/:id",userController.deleteUserById);
router.get("/",userController.getAllUser);
router.post("/filter",userController.getUserListByFilter);
// router.post("/login",userController.loginUser);
module.exports = router;