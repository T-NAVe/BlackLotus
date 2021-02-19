'use strict'
const HTTP_PORT = 4000;

const express = require("express");
const path = require("path");
const expHbs = require("express-handlebars");
const expSession = require("express-session");
const bodyParser = require("body-parser");
const epubParser = require('epub-parser');

const app = express();

app.set("view engine", "handlebars");

app.engine("handlebars", expHbs({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts")
}));

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expSession({
  secret: "The witcher bestiary",
  resave: false,
  saveUninitialized: false
}));

app.get("/", (req, res)=>{
    console.log("🧉🧉🧉🧉🧉🧉🧉🧉");
    if(req.session.loggedUser){
      res.render("index", {layout: "logged", user: req.session.loggedUser})
    }
    else{
      res.render("index", {layout: "main"});
      epubParser.open("./The Institute.epub", function (err, epubData) {
 
        if(err) return console.log(err);
        var zip = epubParser.getZip();
        console.log(zip)
     
    });
      
      //./The Institute.epub
    }    
})


app.listen(HTTP_PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${HTTP_PORT}/ ...`)
  });