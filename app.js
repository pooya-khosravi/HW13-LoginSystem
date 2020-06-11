//use ful module
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
var nodemailer = require('nodemailer');//for send pass to email

//for use body parser
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

app.set("view engine", "ejs");// set ejs engine

app.use("/", express.static("public"));//make public this file

//handle req for login
app.get("/login", function (req, res) {
    res.render(__dirname + "/views/pages/loginPage.ejs");
});

//handle for sing up
app.get("/singUp", function (req, res) {
    res.render(__dirname + "/views/pages/singUpPage.ejs");
});

let usersDataArray = [];// create array for posh new user

//handle for get user info for sing in
app.post("/singIn", function (req, res) {
    readDataBase();

    if(usersDataArray.length > 0)// for first sing up
    {
        let findRepetitive = false;// if find user repetitive stop loop
        let userRepetitiveObject = new userRepetitiveConstructor("noRepetitive", "noRepetitive");
        for(let i=0 ;i<usersDataArray.length && findRepetitive === false; i++)
        {
            if(req.body.userName === usersDataArray[i].userName)
            {
                findRepetitive = true;
                userRepetitiveObject.userName = "Repetitive";
            }
            if(req.body.email === usersDataArray[i].email)
            {
                findRepetitive = true;
                userRepetitiveObject.email = "Repetitive";
            }
        }
        if(findRepetitive === false)// for first sing in
        {
            req.body.isLoggedIn = false;
            usersDataArray.push( req.body );
            addUser(usersDataArray);//add user
            res.redirect("/login");// send login page
        }
        else
        {
            res.send(userRepetitiveObject);// if user  is repetitive send to client object for handle 
        }
    }
    else
    {
        req.body.isLoggedIn = false;
        usersDataArray.push( req.body );
        addUser(usersDataArray);//add user
        res.redirect("/login");// send login page
    }
})

// handle show your dashboard
let findUser;
app.post("/dashboard", function (req, res) {
    readDataBase();

    findUser = false;
    for(let i=0; i<usersDataArray.length && findUser === false; i++)// find indent user and send information to client 
    {
        if(usersDataArray[i].userName === req.body.userName && usersDataArray[i].password === req.body.password)
        {
            findUser = true;
            usersDataArray[i].isLoggedIn = true;            
            addUser(usersDataArray);//add user            
            res.render( (__dirname + "/views/pages/dashboard.ejs"), {thisUserObject: usersDataArray[i]} )
        }
    }
    if(findUser === false)
    {
        res.redirect("/login")
    }
})

//handle req for out and change is logged ind
app.post("/singOut", function (req, res) {
    readDataBase();

    let userSituationLogged = true;
    for(let i=0; i<usersDataArray.length && userSituationLogged === true; i++)
    {
        if(usersDataArray[i].userName === req.body.nameForSingOut)
        {
            userSituationLogged = false;
            usersDataArray[i].isLoggedIn = false;
            addUser(usersDataArray);
            res.redirect("/login");
        }
    }
})

//handle edit profile
app.put("/update", function (req, res) {
    readDataBase();

    let findUpdate = false;
    for(let i=0; i<usersDataArray.length && findUpdate === false; i++)
    {
        if(usersDataArray[i].userName === req.body.lastUserName)
        {
            findUpdate = true;
            usersDataArray[i].userName = req.body.userName;
            usersDataArray[i].email = req.body.email;
            usersDataArray[i].password = req.body.password;
            usersDataArray[i].gender = req.body.gender;
            usersDataArray[i].isLoggedIn = false;

            addUser(usersDataArray);
            res.send();
        }
    }
})

app.get("/sendMail", function (req, res) {
    res.render(__dirname + "/views/pages/forgotPage.ejs");
})

//send pass if forgot
app.post("/sendMail", function (req, res) {
    readDataBase();
    
    findUser = false;
    for(let i=0; i<usersDataArray.length && findUser === false; i++)
    {
        if(usersDataArray[i].email === req.body.indentMail)
        {
            findUser = true;
            //create info your email
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'pooyakhosravi110@gmail.com',
                    pass: ''//enter our pass
                }
            });
            
            var mailOptions = {
                from: 'pooyakhosravi110@gmail.com',
                to: req.body.indentMail,
                subject: 'YourMail',
                text: usersDataArray[i].password
            };
            
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("ERROR: "+error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            res.redirect("/login");
        }
    }
    if(findUser === false)
    {
        res.send(false);
    }
})

//create object if is user info Repetitive
function userRepetitiveConstructor(userNameRepetitive, emailRepetitive) {
    this.userName = userNameRepetitive;
    this.email = emailRepetitive;
}

//add key to object and write to data base
function addUser(usersArr) {
    fs.writeFile( (__dirname + "/tools/users.json"), JSON.stringify(usersArr), function (err) {
        if(err)
        {
            console.log(err.message);
        }
    });
}

//create function for reader
function readDataBase() {
    try 
    {
        usersDataArray = JSON.parse( fs.readFileSync( (__dirname + "/tools/users.json"), "utf8" ) );        
    }
    catch (error) 
    {
        console.log(error.message);
    }
}

app.listen("5000", function () {
    console.log("server started on port: 5000");
})