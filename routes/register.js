const express = require("express");
const router = express.Router();
const User = require("../models/Users.js");

// already gets the /users path from app.js
//all users
router.get("/", async (req, res) => {
    const allUsers = await User.find({});
    try {
        res.send(allUsers);
    } catch (error) {
        res.status(500).send(error);
    }
});

//specific user by Id
router.get("/findById", async (req, res) => {
    const specificUser = await User.findById(req.params._id);
    try {
        console.log("in it");
        res.send(specificUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

//find by name
router.get("/findByName", async (req, res) => {
    // console.log(`req.find param: ${req.params.titleName}`);

    const userName = await User.findOne({
        username: req.body.username
    });
    try {
        res.send(userName);
    } catch (error) {
        res.status(500).send(error);
    }
});

//register user
router.post("/", async (req, res) => {
    console.log(req.body.username);

    const newUser = new User({
        username: req.body.username,
        passwordHash: req.body.passwordHash
    });
    //saves the post and adds error catch via promise
    try {
        await newUser.save();
        res.status(200).send(newUser);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

//delete specific user Id
router.delete("/removeUser", async (req, res) => {
    try {
        const removedUser = await User.deleteOne({
            _id: req.params._id
        });
        res.status(200).json(removedUser);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

// //delete specific post by title
// router.delete("/title/:titleName", async (req, res) => {
//     try {
//         const removedPost = await Post.deleteOne({
//             title: req.params.titleName
//         });
//         res.status(200).json(removedPost);
//     } catch (error) {
//         res.status(500).send({ message: error });
//     }
// });

//update post
// router.patch("/update/:userId", async (req, res) => {
//     try {
//         const updatedUser = await Post.updateOne(
//             {
//                 _id: req.params.userId
//             },
//             { $set: { username: req.body.title } }
//         );
//         res.status(200).json(updatedPost);
//     } catch (error) {
//         res.status(500).send({ message: error });
//     }
// });

module.exports = router;
