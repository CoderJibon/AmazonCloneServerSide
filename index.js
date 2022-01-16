//Library include
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan"); // log generator
const PORT = process.env.PORT;
const database = require("./Database");
const bodyParser = require('body-parser');

// user route
const userRoute = require("./Routes/userRoute");


//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/user", userRoute);


//route
app.get("/", (req, res) => {
    return res.status(200).json({
        "status": true,
        "message":"Amazon clone REST API Home page."
    });
});

//server start
app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});