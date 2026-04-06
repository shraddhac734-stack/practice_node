const express = require("express");
const router = express.Router();


// All routes file imported here
const userRoute = require("./userRoutes");

// check health
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

//All routes file uses here
router.use("/users", userRoute);

module.exports = router;
