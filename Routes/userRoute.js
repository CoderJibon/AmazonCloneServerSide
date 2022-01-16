// include library
const Router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { check, validationResult } = require("express-validator");

const User = require("../Models/User");
const token_key = process.env.TOKEN_KEY;

//default route
// Access: public
//url: http://localhost:5000/api/user

Router.get(
    '/',
    (req, res) => {
       return res.status(200).json(
            {
                status: true,
                message: "user default route"
            }
        );
    }
)


//user register router
// Access: public
//url: http://localhost:5000/api/users/register

Router.post(
    "/register",
    [
        //check empty field
        check("username").not().isEmpty().trim().escape(),
        check("password").not().isEmpty().trim().escape(),

        //check email
        check("email").isEmail().normalizeEmail()
    ],
    (req, res) => {

        const errors = validationResult(req);
        //check errors is not empty
        if (!errors.isEmpty()) {
            return res.status(400).json({
                'status': false,
                 "errors":errors.array()
            });
        }

         //check email exists 
        User.findOne({ email: req.body.email })
            .then((user) => {
                //check email exists or not
                if (user) {

                    return res.status(409).json({
                        'status': false,
                        "message": "user already exists"
                    });

                } else {

                    // password bcrypt
                    const salt = bcrypt.genSaltSync(10);
                    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

                    // create user object model
                    const newUser = new User({
                        email: req.body.email,
                        username: req.body.username,
                        password:hashedPassword
                    });

                   //insert new user
                    newUser.save().then((data) => {
                         return res.status(200).json({
                                'status': true,
                                "user": data
                            });
                    }).catch((error) => {
                        return res.status(502).json({
                                'status': false,
                                "error": error
                            });
                    });
                }
            }).catch(err => {
             return res.status(502).json({
                'status': false,
                "error": err
            });
        })

    }
);


module.exports = Router;