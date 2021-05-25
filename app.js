require('dotenv').config()
const express = require('express')
let passport = require('passport')
let bodyParser = require('body-parser')
let flash = require('connect-flash')
let mongoose = require('mongoose')
let methodOverride = require('method-override')

var app = express()

//mongodb connection
mongoose.connect('mongodb://localhost/quick_pay', { useNewUrlParser: true, useUnifiedTopology: true })

//no production db yet.

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method")) //whenever app gets a request having _method use that new request to override
app.set("view engine", "ejs")

app.use(require('express-session')({
    secret: "fztt",
    resave: false,
    saveUninitialized: false
}))

//Flash messages -using flash requires sessions
app.use(flash())


app.use(function(req, res, next) {
    res.locals.successMessage = req.flash("success_message");
    res.locals.errorMessage = req.flash("error_message");
    next();
})


//Routes declaration
let homeRoute = require('./routes/Home/HomeRoute')


//
app.use(homeRoute)

app.use((req, res) => {
    res.status(400).send("Error Page") // render()
})


app.listen(3002, () => {
    console.log("quickpay on 3002")
})