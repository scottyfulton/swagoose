const express = require("express");
const router = express.Router();
const User = require("../models/Users.js");

// already gets the /users path from app.js
//all users

//find by name
router.get("/", async (req, res) => {
    // console.log(`req.find param: ${req.params.titleName}`);

    const userName = await User.findOne({
        username: req.body.username
        // checkPW: req.params.checkPW
    });
    try {
        if (userName.passwordHash === req.body.checkPW) {
            const logMeIn = await User.updateOne(
                {
                    _id: userName._id
                },
                { $set: { loggedIn: true } }
            ).then(res.send(userName.loggedIn));
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

//update post
router.patch("/:postId", async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            {
                _id: req.params.postId
            },
            { $set: { title: req.body.title } }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

module.exports = router;
