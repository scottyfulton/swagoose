const express = require("express");
const router = express.Router();
const Image = require("../models/Images.js");

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
    newImage
        .save()
        .then(result => {
            res.status(200).json({
                success: true,
                document: result
            });
            console.log("it it now");
        })
        .catch(err => next(err));
});
// .get(function(req, res) {
//     Image.findOne({}, "img createdAt", function(err, img) {
//         if (err) res.send(err);
//         // console.log(img);
//         res.contentType("json");
//         res.send(img);
//     }).sort({ createdAt: "desc" });
// });

module.exports = router;
