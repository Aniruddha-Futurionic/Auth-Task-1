const express = require("express");
const { dbConnection } = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const { User } = require("./models/userModel");
const bodyParser = require("body-parser");
const cors = require("cors")
require("dotenv").config()

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use("/api/auth", authRoutes);

User.sync({alter : true});



app.listen(3000 , () => {
    console.log("listening on port 3000");
    dbConnection();
})