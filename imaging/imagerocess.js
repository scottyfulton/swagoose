var Jimp = require("jimp");

// argv[2] is first cmdline argument passed
Jimp.read(process.argv[2], (err, jupiter) => {
    if (err) throw err;
    jupiter
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        // .greyscale() // set greyscale
        // .invert()
        .write("smallerImg.png"); // save
});
