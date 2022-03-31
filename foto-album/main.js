// Node-packages
import "dotenv/config";
import express from "express";
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import fs from "fs";
import multer from "multer";

const app = express();
const hbs = create();

// Gebruik template engine handlebars voor DYNAMISCHE content
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

// Stel een static map in
app.use(express.static("public")); // In public map zitten alle mappen die gebruikt worden voor het stylen van de website:(fonts, img,css,manifest)

// Route luistert naar alle GET request op /
app.get("/", (req, res) => {
  res.render("home"); // (for the home.handlebars)
});

// Route luistert naar alle GET request op /
app.get("/about", (req, res) => {
  res.render("about"); // (for the about.handlebars)
});

// Route luistert naar alle GET request op /
app.get("/album", (req, res) => {
  res.render("album"); // (for the album.handlebars)
});

// Gebruik body-parser om te lezen wat er in POST requests van de form staat (voor foto-album)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("avatar");

app.post("/album", upload, (req, res, next) => {
  console.log(req.file);

  //Implement your own logic if needed. Like moving the file, renaming the file, etc.
  res.render("album", {
    image: req.file.originalname,
  });
});

// const logEvents = require('./logEvents');
app.set("port", process.env.PORT || 3500); // const PORT = process.env.PORT || 3500; // Server is running on PORT const = x. If 'x' is not available PORT= 3500

const server = app.listen(app.get("port"), function () {
  console.log(`Application started on port: ${app.get("port")}`);
});
