'use strict'
const HTTP_PORT = 4000;

const express = require("express");
const path = require("path");
const expHbs = require("express-handlebars");
const expSession = require("express-session");
const bodyParser = require("body-parser");
const epubParser = require('epub-parser');
const EPub = require ('epub');
var fs = require('fs');

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
      /*epubParser.open("./The Institute.epub", function (err, epubData) {
 
        if(err) return console.log(err);
        var zip = epubParser.getZip();
        console.log(zip)
     
    });*/
    var epub = new EPub("./The Institute.epub", "/imagewebroot/", "/articlewebroot/");
    epub.on("error", function(err){
        console.log("ERROR\n-----");
        throw err;
    });
    
    epub.on("end", function(err){
        /*console.log("METADATA:\n");
        console.log(epub.manifest);*/
    
        /*console.log("\nMANIFEST:\n");
        fs.writeFile("test.json", JSON.stringify(epub.manifest) , function(err) {
          if (err) {
              console.log(err);
          }
        });*/
    
        /*console.log("\nTOC:\n");
        console.log(epub.toc);*/
      
        // chapter id location epub.spine.contents[0].id
        var count = Object.keys(epub.spine.contents).length;
        console.log("\nCHAPTER COUNT\n")
        console.log(count)
        /*
        Process description:
        1- User uploads epub and writes the text to encrypt
        2- count of amount of chapters
        3- iterate over chapters trying to find the first match to each word
        4- return the search results: "ChapterNum(not actual chapter but the Array index) + wordIndex"
        in the case shown below, the result of the search where would be: 5-2389 (array[5]-string[2389])
        */
        epub.getChapter("ch02", function(err, data){
            if(err){
                console.log(err);
                return;
            }
            let str = data.replace(/<\/?[\w\s]*>|<.+[\W]>/g, '')
            console.log("\nCHAPTER CONTENT:\n");
            //console.log(str);
            console.log(str.search("where"));
        });
    
        /*
        epub.getImage(image_id, function(err, data, mimeType){
            console.log(err || data);
            console.log(mimeType)
        });
        */
        
    });
    
    var coso = epub.parse();
      //./The Institute.epub
    }    
})


app.listen(HTTP_PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${HTTP_PORT}/ ...`)
  });