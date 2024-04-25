// import the frame work module (Express)
const express = require("express");
// deal with files 
const  fs  = require("fs");
// for security 
const cors =require("cors");
// deals with the body output values & Json files 
const bodyParser = require("body-parser");
// Allow app to use express,body-parser,cors
const app = express();
app.use(bodyParser.json());
app.use(cors());
// deal with ejs files like the dir is currently set to views
app.set('view engine', 'ejs');
// deals with css & js files as dir is set to public
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
let x="";

// Main Home Page (to direct the server to which page)
app.get("/HomePage.ejs",(req,res) => {
    res.render("HomePage",{Signin:`Signin`});
});
app.get("/sign.ejs",(req,res) => {
    res.render("sign");
});
app.get("/android.ejs",(req,res) => {
    res.render("android");
});
app.get("/DataScience.ejs",(req,res) => {
    res.render("DataScience");
});
app.get("/Python.ejs",(req,res) => {
    res.render("Python");
});
app.get("/Book1.ejs",(req,res) => {
    res.render("Book1",{Signin:`${x}`});
});
app.get("/Book2.ejs",(req,res) => {
    res.render("Book2",{Signin:`${x}`});
});
app.get("/Book3.ejs",(req,res) => {
    res.render("Book3",{Signin:`${x}`});
});
app.get("/Data-Science.ejs",(req,res) => {
    res.render("Data-Science",{Signin:`${x}`});
});
app.get("/Cyber-Security.ejs",(req,res) => {
    res.render("Cyber-Security",{Signin:`${x}`});
});
app.get("/Web-Programming.ejs",(req,res) => {
    res.render("Web-Programming",{Signin:`${x}`});
});
// First SIGNING UP (Create New User)
app.post("/signup",(req,res) => {
    const {Name,Email,Password,CPassword,RememberMe} = req.body;
    fs.readFile("./Users.json",(err,data) => {
        if (err) {
            console.log(err);
        }else{
            // convert json string to js object
            const users = JSON.parse(data);
            const user = users.find((u) => {
                return u.Email === Email && u.Password === Password; 
            });
            if(user){
                res.status(409).send("This User Exists!!");
            }else{
                    const Nuser = {
                        id:users.length+1,
                        Name,
                        Email,
                        Password,
                        CPassword,
                        RememberMe,
                    };
                        users.push(Nuser);
                        // convert js object to json string
                        fs.writeFile("./Users.json",JSON.stringify(users),(err) => {
                        if (err) {
                            console.log(err);
                        }else{
                            console.log("New User Added Successfully !!");
                            const confirm = users.find((u) => {
                                return Password === CPassword;
                            }); 
                            if(confirm){
                                res.redirect("/sign.ejs");
                            }else{
                                res.status(409).send("Your Password DOES NOT Match CPassword!!");
                            }
                        }
                    });     
                }    
            }
        });
    });
// Second SIGNING IN (Log in)
app.post("/signin",(req,res) => {
    const {Email,Password,RememberMe} = req.body;
    fs.readFile("./Users.json",(err,data) => {
        if (err){console.log(err);
        }else{
            const users = JSON.parse(data);
            const user = users.find((u) => {
                return u.Email===Email&&u.Password === Password;
            });
        if(user){
            console.log("Login Successful");
            fs.readFile("./Users.json",(err,data) => {
                if (err) {
                    console.log(err);
                }else{
                    // convert json string to js object
                    const users = JSON.parse(data);
                    const vname = users.find((u) => {
                        if(u.Email === Email && u.Password === Password){
                            x=u.Name;
                            return x;
                        }else{
                            console.log("Operation Is Right");
                        }     
                    });
                    res.render("HomePage",{Signin:`${x}`});
                   
                }
            });      
        }else{
            res.status(409).send("Invalid Entry Please enter the correct Email & Password !!");}
        }
    });
});
app.listen(9090,"localhost",() => {
    console.log("Server Running at http://localhost:9090/HomePage.ejs");
});