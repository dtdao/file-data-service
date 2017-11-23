// server.js
// where your node app starts

// init project
var express = require('express');
var multer = require("multer")
var upload = multer({dest: "uploads/"})
var app = express();
var port = process.env.PORT || 8080

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('views'));


app.post("/get-file-size", upload.single("file"), function(req, res, next){
  if(req.file){
    res.send({size: req.file.size})
  }
  next(new Error("Please, Submit a File!"))
})

app.use(function(err, req, res, next){
  if(res.status(500)){res.send("Internal Server Error")}
  else {
  res.status(400).send("Bad Request")
  }
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});


// listen for requests :)
app.listen(port, function(){
  console.log("Magic happens on " + port)
})
