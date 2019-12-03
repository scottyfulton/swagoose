const express = require("express");
const router = express.Router();

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
