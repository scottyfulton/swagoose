const express = require("express");
const router = express.Router();
const Image = require("../models/Images.js");

// get one
router.get("/findOne", async (req, res) => {
    // var imagePull = "blar";
    Image.findOne(
        {
            companyName: req.params.companyName
        },
        (err, data) => {
            var imagePull = data;
            console.log(imagePull);
            // return data;
        }

        // const imagePull = await Image.find(
        //     {
        //         companyName: req.params.companyName
        //     },
        //     function(err, data) {
        //         console.log(data);

        //         return data;
        //     }
    );
    // const imagePull = await Image.find({});
    try {
        res.status(200).send(imagePull);
        // res.status(200).send(Object.keys(imagePull));
    } catch (error) {
        res.status(500).send(error);
    }
});

//get all
router.get("/", async (req, res) => {
    // const imagePull = await Image.findOne({
    //     companyName: req.params.companyName
    // });
    console.log("in it");

    const imagePull = await Image.find({});
    try {
        res.status(200).send(imagePull);
        // res.status(200).send(Object.keys(imagePull));
    } catch (error) {
        res.status(500).send(error);
    }
});

//submits image
// router.post("/", async (req, res) => {
//     const image = new Image({
//         companyName: req.body.companyName,
//         imageBase64: req.body.imageBase64
//     });
//     console.log("in it base");
//     //saves the post and adds error catch via promise
//     try {
//         console.log("inserted");
//         await image.save();
//         res.status(200).send(image);
//     } catch (error) {
//         res.status(500).send({ message: error });
//     }
// });

/*
    upload image in base64 format, thereby,
    directly storing it in mongodb datanase
    along with images uploaded using firebase
    storage
*/

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

module.exports = router;

// //python from node
// function callName(req, res) {
//     // Use child_process.spawn method from
//     // child_process module and assign it
//     // to variable spawn
//     var spawn = require("child_process").spawn;

//     // Parameters passed in spawn -
//     // 1. type_of_script
//     // 2. list containing Path of the script
//     //    and arguments for the script

//     // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
//     // so, first name = Mike and last name = Will
//     var process = spawn("python", [
//         "./hello.py",
//         req.query.firstname,
//         req.query.lastname
//     ]);

//     // Takes stdout data from script which executed
//     // with arguments and send this data to res object
//     process.stdout.on("data", function(data) {
//         res.send(data.toString());
//     });
// }

// // save code as start.js
