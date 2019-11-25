// import mongoose from "mongoose";
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
//export the model and the schema it will use
const PostModel = mongoose.model("Posts", PostSchema);
module.exports = PostModel;
// module.exports = mongoose.model("Posts", PostSchema);
// module.exports = PostSchema;

//or could use
// mongoode.Schema({
// username: String,
// password: String,...
// })
