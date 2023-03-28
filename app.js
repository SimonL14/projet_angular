var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var cors = require("cors");

var indexRouter = require("./routes/index");
var studentRouter = require("./routes/student");

var mongoose = require("mongoose");

var app = express();

// Intégration de la bdd
var connectionString =
  "mongodb+srv://mariecamillepetit:Marie044152@iut-angular.cudnxt0.mongodb.net/test";
var mongoDB = process.env.MONGODB_URI || connectionString;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/students", studentRouter);

module.exports = app;
