const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/craftcore");

const db = mongoose.connection;

db.once("open", (err) => {
    err ? console.log(err) : console.log("Db connected successfully")
});

module.exports = db;
