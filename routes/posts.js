const express = require("express");
const router = express.Router();
const Post = require("../models/Posts.js");

//middleware example
// app.use("/posts", () => {
//     console.log("MW here");
// });

//ROUTES
// already gets the /posts path from app.js
//all posts
router.get("/", async (req, res) => {
    const allPosts = await Post.find({});
    try {
        res.send(allPosts);
    } catch (error) {
        res.status(500).send(error);
    }
});

//specific post by Id
router.get("/:postId", async (req, res) => {
    const specificPost = await Post.findById(req.params.postId);
    try {
        res.send(specificPost);
    } catch (error) {
        res.status(500).send(error);
    }
});

//find by title
//specific post by Id
router.get("/title/:titleName", async (req, res) => {
    // console.log(`req.find param: ${req.params.titleName}`);

    const specificPost = await Post.find({ title: req.params.titleName });
    try {
        res.send(specificPost);
    } catch (error) {
        res.status(500).send(error);
    }
});

//submits post
router.post("/", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    //saves the post and adds error catch via promise
    try {
        await post.save();
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

//delete specific post by Id
router.delete("/:postId", async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({
            _id: req.params.postId
        });
        res.status(200).json(removedPost);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

//delete specific post by title
router.delete("/title/:titleName", async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({
            title: req.params.titleName
        });
        res.status(200).json(removedPost);
    } catch (error) {
        res.status(500).send({ message: error });
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
