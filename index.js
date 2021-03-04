'use strict'
const HTTP_PORT = 4000;

const express = require("express");
const path = require("path");
const expHbs = require("express-handlebars");
const bodyParser = require("body-parser");;
const eParse = require("./functions");


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

app.get("/", (req, res)=>{
  res.render("index", {layout: "main"});
  });
    
app.post('/encrypt', (req, res)=>{
  console.log(req.file)
  eParse.encryptEpub(req.body.book, req.body.text, result=>{
    res.render("encrypt",{ layout: "main", result: result });
  });
})
app.post('/decrypt', (req, res)=>{
  eParse.decryptEpub(req.body.book, req.body.text, result=>{
    res.render("decrypt",{ layout: "main", result: result });
  });
})


app.listen(process.env.PORT || HTTP_PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${HTTP_PORT}/ ...`)
  });