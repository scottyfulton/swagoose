const express = require("express");
const router = express.Router();
const Image = require("../models/Images.js");
const Jimp = require("jimp");
const fs = require("fs");
const FileBase = require("react-file-base64");

// get one
router.get("/findOne", async (req, res) => {
    const imagePull = await Image.find({
        companyName: req.body.companyName
    });
    try {
        // console.log(imagePull);
        res.contentType("json");
        res.status(200).send(imagePull);
    } catch (error) {
        res.status(500).send(error);
    }
});

//get all
router.get("/", async (req, res) => {
    console.log("in it");
    const imagePull = await Image.find({});
    try {
        res.status(200).send(imagePull);
    } catch (error) {
        res.status(500).send(error);
    }
});

//post one
router.route("/uploadbase").post((req, res, next) => {
    const newImage = new Image({
        companyName: req.body.companyName,
        imageBase64: req.body.imageBase64
    });
    console.log(
        "newImage.imageBase64: ",
        req.body.imageBase64.toString("base64")
    );
    // pImg(newImage.imageBase64.toString("base64"));
    var bitmap = base64_encode("_smallerImg.png");
    fs.writeFile("_smallerImg.png", bitmap, err => {
        if (err) throw err;
    });
    // Jimp.read("_smallerImg.png", (err, jupiter) => {
    //     if (err) throw err;
    //     jupiter
    //         .resize(256, 256) // resize
    //         .quality(60) // set JPEG quality
    //         // .greyscale() // set greyscale
    //         // .invert()
    //         .write("smallerImg.png"); // save
    // });

    // var fs = require("fs");

    function base64_encode(file) {
        // read binary data
        var bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return new Buffer(bitmap).toString("base64");
    }

    // var bitmap = base64_encode("_smallerImg.png");
    // newImage
    //     .save()
    //     .then(result => {
    //         res.status(200).json({
    //             success: true,
    //             document: result
    //         });
    //         console.log("it it now");
    //     })
    //     .catch(err => next(err));
});

function pImg(file) {
    // const pImg = () =>
    // argv[2] is first cmdline argument passed
    // Jimp.read(process.argv[2], (err, jupiter) => {
    Jimp.read(file, (err, jupiter) => {
        if (err) throw err;
        jupiter
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            // .greyscale() // set greyscale
            // .invert()
            .write("smallerImg.png"); // save
    });
}

module.exports = router;
