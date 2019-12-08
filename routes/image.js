const express = require("express");
const router = express.Router();
const Image = require("../models/Images.js");
const Jimp = require("jimp");
const fs = require("fs");
const FileBase = require("react-file-base64");
const spawn = require("child_process").spawn;

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
router.route("/uploadbase").post(async (req, res, next) => {
    const cname = req.body.companyName;
    const newImage = new Image({
        companyName: req.body.companyName,
        imageBase64: req.body.imageBase64
    });

    const base64Datum = await req.body.imageBase64.replace(
        /^data:image\/png;base64,/,
        ""
    );
    // async () => {
    //     return new Promise((resolve, reject) => {
    fs.writeFile("./out.png", base64Datum, "base64", function(err) {
        if (err) {
            console.error(err);
        }
        console.log("out.png saved");
    });
    // });
    // };

    await Jimp.read("./out.png", (err, image) => {
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
            image
                .resize(128, 128) // resize
                .quality(100) // set JPEG quality
                // .greyscale() // set greyscale
                // .invert()
                .write("./smallerImg.png"); // save
        } else {
            console.log("it's not a square");
            image
                .resize(128, 79) // resize
                .quality(100) // set JPEG quality
                // .greyscale() // set greyscale
                // .invert()
                .write("./smallerImg.png"); // save
        }
        // });
        console.log("pyprog'd");
        const pyprog =
            // try {
            spawn("python", ["./pillow.py", "./smallerImg.png"]);
        // } catch (error) {
        // console.error(error);
        // }
        // };

        // var data = () => {
        fs.readFile("./encodedTxt.txt", (err, data) => {
            if (err) throw err;

            data = "data:image/png;base64," + data;
            // });
            const bNewImage = new Image({
                companyName: cname,
                imageBase64: data
            });

            /////////////saves to mongo//////////////
            bNewImage
                .save()
                .then(result => {
                    res.status(200).json({
                        success: true,
                        document: result
                    });
                    // console.log("in it now");
                })
                .catch(err => next(err));
            /////////////saves to mongo//////////////
        });
    });
});

module.exports = router;
