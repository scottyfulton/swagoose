const express = require("express");
const router = express.Router();
const Image = require("../models/Images.js");
const Jimp = require("jimp");
const fs = require("fs");
const FileBase = require("react-file-base64");

// get one
router.get("/findOne/:companyName", async (req, res) => {
    const cname = req.params.companyName;
    console.log(cname);

    const imagePull = await Image.find({
        companyName: cname
    });
    try {
        // console.log(imagePull[0].imageBase64.toString());
        res.contentType("json");
        // res.status(200).send(imagePull[0].imageBase64.toString("base64"));
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

    // await process.stdout.on("data", function(data) {
    //     await res.send(data.toString());
    // });

    // console.log(
    //     "newImage.imageBase64: ",
    //     req.body.imageBase64.toString("base64")
    // );

    const base64Datum = await req.body.imageBase64.replace(
        /^data:image\/png;base64,/,
        ""
    );
    fs.writeFile("out.png", base64Datum, "base64", function(err) {
        if (err) console.error(err);
    });

    // pImg(newImage.imageBase64.toString("base64"));
    // var bitmap = base64_encode("_smallerImg.png");
    // fs.writeFile("_smallerImg.png", bitmap, err => {
    //     if (err) throw err;
    // });

    Jimp.read("out.png", (err, image) => {
        if (err) throw err;

        var w = image.bitmap.width;
        var h = image.bitmap.height;
        if (w - h < h * 0.1) {
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

        // image
        //     .resize(128, 128) // resize
        //     .quality(60) // set JPEG quality
        //     // .greyscale() // set greyscale
        //     // .invert()
        //     .write("smallerImg.png"); // save

        const spawn = require("child_process").spawn;
        const pyprog = spawn("python", [
            "./routes/pillow.py",
            "./smallerImg.png"
        ]);
        // var data = () => {
        fs.readFile("./encodedTxt.txt", (err, data) => {
            if (err) throw err;

            data = "data:image/png;base64," + data;
            // });
            const bNewImage = new Image({
                companyName: cname,
                imageBase64: data
            });
            // console.log(data);
            bNewImage
                .save()
                .then(result => {
                    res.status(200).json({
                        success: true,
                        document: result
                    });
                    console.log("in it now");
                })
                .catch(err => next(err));
            // };
        });
        // newImage.imageBase64 = data;
        // newImage.companyName = req.body.companyName;
        /////////////saves to mongo//////////////

        /////////////saves to mongo//////////////
    });

    // let runPy = new Promise(function(success, nosuccess) {
    // console.log("in py run\n");

    // try {
    //     pyprog.stdout.on("data", function(data) {
    //         success(data);
    //     });
    // } catch (error) {
    //     pyprog.stderr.on("data", data => {
    //         nosuccess(data);
    //     });
    // }
    // });

    // await runPy.then(function(fromRunpy) {
    //     console.log(fromRunpy.toString());
    //     res.end(fromRunpy);
    // });
    // const { spawn } = require("child_process");
    // const pyScript = spawn("python", ["../imaging/pillow.py"]);

    // var fs = require("fs");

    // function base64_encode(file) {
    //     // read binary data
    //     var bitmap = fs.readFileSync(file);
    //     // convert binary data to base64 encoded string
    //     return new Buffer(bitmap).toString("base64");
    // }

    // var bitmap = base64_encode("_smallerImg.png");
});

// function pImg(file) {
//     // const pImg = () =>
//     // argv[2] is first cmdline argument passed
//     // Jimp.read(process.argv[2], (err, jupiter) => {
//     Jimp.read(file, (err, jupiter) => {
//         if (err) throw err;
//         jupiter
//             .resize(256, 256) // resize
//             .quality(60) // set JPEG quality
//             // .greyscale() // set greyscale
//             // .invert()
//             .write("smallerImg.png"); // save
//     });
// }

// let runPy = new Promise(function(success, nosuccess) {
//     console.log("in py run\n");

//     const spawn = require("child_process").spawn;
//     const pyprog = spawn("python", ["./pillow.py", "../smallerImg.png"]);
//     try {
//         pyprog.stdout.on("data", function(data) {
//             success(data);
//         });
//     } catch (error) {
//         pyprog.stderr.on("data", data => {
//             nosuccess(data);
//         });
//     }
// });

module.exports = router;
