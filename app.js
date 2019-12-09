const express = require("express");
const mongoose = require("mongoose");
const parser = require("body-parser");
const env = require("dotenv").config();
const connection = process.env.MONGO_CONNECTION;
const DB_NAME = "cluster0";
const cors = require("cors");
const PORT = process.env.PORT || 3003;
const app = express();
const path = require("path");

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
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
    );
    next();
});

if (process.env.NODE_ENV === "production") {
    // app.use(express.static("__dirname"));
    // app.use(express.static("__dirname/routes"));
    // app.use(express.static("__dirname/imaging"));
    app.use("/static", express.static(path.join(__dirname, "routes")));
    app.use("/static", express.static(path.join(__dirname, "imaging")));
}

//ROUTES

app.use("/register", registerRoute);
app.use("/posts", postsRoute);
app.use("/login", loginRoute);
app.use("/image", imageRoute);

// app.get("*", (request, response) => {
//     response.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

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

// const port = 3003;
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
