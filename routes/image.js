const express = require("express");
const router = express.Router();
const Image = require("../models/Images.js");
const Jimp = require("jimp");
const fs = require("fs");
const FileBase = require("react-file-base64");
const spawn = require("child_process").spawn;
const cors = require("cors");

// get one
router.get("/findOne/:companyName", async (req, res) => {
    const cname = req.params.companyName;
    console.log(cname);

    const imagePull = await Image.findOne({
        companyName: cname
    });
    try {
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
router.post("/uploadbase", cors(), async (req, res, next) => {
    const cname = req.body.companyName;
    const datum = req.body.imageBase64;
    let isItSqr = true;
    let base64Datum = datum.replace(/^data:image\/png;base64,/, "");

    mainDoer();

    async function mainDoer() {
        console.log("starting the do");
        const step1 = await getDataClean(base64Datum);
        const step2 = await jimpIt();
        const step3 = await pyProgIt();
        const step4 = await saveThis();
        const step5 = console.log("fin?");
    }

    function getDataClean(data) {
        console.log("in getData");

        return new Promise(function(resolve) {
            setTimeout(function() {
                fs.writeFile("out.png", data, "base64", function(err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log("data cleaned: promised");
                });
                resolve();
            }, 500);
        });
    }

    function jimpIt() {
        console.log("in jimpIt");
        return new Promise(function(resolve) {
            setTimeout(function() {
                Jimp.read("out.png", (err, image) => {
                    if (err) {
                        throw err;
                    }
                    var w = image.bitmap.width;
                    var h = image.bitmap.height;
                    var wMh = w - h;
                    var tenPer = h * 0.1;
                    console.log("tenPer: wMh ", tenPer, wMh);

                    if (wMh < tenPer) {
                        //then it's ~ a square
                        console.log("its a square");
                        isItSqr = true;
                        image
                            .resize(100, 100) // resize
                            .quality(100) // set JPEG quality
                            // .greyscale() // set greyscale
                            // .invert()
                            .write("smallerImg.png"); // save
                    } else {
                        console.log("it's not a square");
                        isItSqr = false;
                        image
                            .resize(100, 58) // resize
                            .quality(100) // set JPEG quality
                            // .greyscale() // set greyscale
                            // .invert()
                            .write("smallerImg.png"); // save
                    }
                });
                resolve();
            }, 750);
        });
    }

    function pyProgIt() {
        console.log("in pyProgIt");
        return new Promise(function(resolve) {
            setTimeout(function() {
                var pyProcess = spawn("python", [
                    "./pillow.py",
                    "./smallerImg.png"
                ]);
                console.log("spawned");
                resolve();
            }, 2000);
        });
    }

    function saveThis() {
        console.log("in save this");
        return new Promise(function(resolve) {
            setTimeout(function() {
                fs.readFile("encodedTxt.txt", (err, data) => {
                    if (err) {
                        throw err;
                    }
                    data = "data:image/png;base64," + data;
                    const bNewImage = new Image({
                        companyName: cname,
                        imageBase64: data,
                        isSquare: isItSqr
                    });
                    console.log("saving");
                    bNewImage.save();
                });

                resolve();
            }, 2000);
        });
    }
});

module.exports = router;
