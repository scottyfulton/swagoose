// import mongoose from "mongoose";
const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    imageBase64: {
        // type: { data: Buffer, contentType: String },
        type: String,
        required: true
    },
    isSquare: {
        type: Boolean
    }
    // ,
    // dateCreated: {
    //     type: Date,
    //     default: Date.now
    // }
});
//export the model and the schema it will use
const ImageModel = mongoose.model("Images", ImageSchema);
module.exports = ImageModel;
