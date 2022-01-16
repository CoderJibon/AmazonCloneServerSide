const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const moment = require("moment");

const userSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true,
    },
    profile_pic: {
        type: String,
        default:"empty_avatar.jpg"
    },
    createdAt: {
        type: String,
        default: moment().format("DD/MM/YYYY")+";"+moment().format("hh:mm:ss")
    },
    updateAt: {
        type: String,
        default: moment().format("DD/MM/YYYY")+";"+moment().format("hh:mm:ss")
    }
});

// export user model
module.exports = model("user", userSchema);