const express = require("express");
const app = express();

const bodyParser = require("body-parser");
// const request = require("request");

app.listen(3000, function(){
    console.log("server running on port 3000");
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("local")); //this allows any files in the folder named local to be used as static and reflect when displayed in the browser.

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})
app.post("/", function(req, res){
    var firstName = req.body.firstNameJ;
    var lastName = req.body.lastNameJ;
    var email = req.body.emailJ;

    console.log( firstName, lastName, email);
    
})


//API Key
//56ffee308b721c43361c60fc2bde

//List ID
//d64da7e491