//Library include
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan"); // log generator
const PORT = process.env.PORT;
const database = require("./Database");

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


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