const express = require("express");
const db=require('./src/configs/dbConfig')
require("dotenv").config();

const app = express();
const port = process.env.PORT||3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

db.sync()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Connection Failed", err);
});