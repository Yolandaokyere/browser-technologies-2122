// Node-packages
import 'dotenv/config';
import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from "body-parser";
import fs from 'fs';
import multer from 'multer';

const app = express()

// Gebruik template engine handlebars voor DYNAMISCHE content
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Stel een static map in
app.use(express.static('public')) // In public map zitten alle mappen die gebruikt worden voor het stylen van de website:(fonts, img,css,manifest)

// Route for the index.handlebars
app.get('/', (req, res) => {
    res.render('index');
});

// const logEvents = require('./logEvents');
app.set('port', process.env.PORT || 3500) // const PORT = process.env.PORT || 3500; // Server is running on PORT const = x. If 'x' is not available PORT= 3500

const server = app.listen(app.get('port'), function () {
  console.log(`Application started on port: ${app.get('port')}`)
})



