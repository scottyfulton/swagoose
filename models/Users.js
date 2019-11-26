// import mongoose from "mongoose";
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    passwordSalt: {
        type: String
    },
    loggedIn: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});
//export the model and the schema it will use
const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;

//or could use
// mongoode.Schema({
// username: String,
// password: String,...
// })
