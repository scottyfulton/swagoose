const express = require("express");
const mongoose = require("mongoose");
const parser = require("body-parser");
const env = require("dotenv").config();
const connection = process.env.MONGO_CONNECTION;
const DB_NAME = "cluster0";
const cors = require("cors");

const app = express();

//import routes
const postsRoute = require("./routes/posts");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const imageRoute = require("./routes/image");

//middleware
//parses the body of EVERY app.use
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

//ROUTES
app.use("/register", registerRoute);
app.use("/posts", postsRoute);
app.use("/login", loginRoute);
app.use("/image", imageRoute);
app.get("/", (req, res) => {
    res.send("home here");
});

/**
 * connect to db
 * passed { useNewUrlParser: true, useUnifiedTopology: true } to avoid deprecated msg
 * also used .env to house username and password
 */
mongoose.connect(
    connection,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log(`Connected to ${DB_NAME}.`);
    }
);

const port = 3003;
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
