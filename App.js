const express = require("express");
const routes = require("./src/routes/index");
const db=require('./src/configs/dbConfig')
require("dotenv").config();

const app = express();


const port = process.env.PORT||3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use(express.json()); 
app.use("/", routes);  
db.sync({ force: true })
  .then(() => {
    console.log("Database Recreated");
  });