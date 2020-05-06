//jshint esversion:6
'use strict';

//import the express module
const express = require("express");
const app = express();

//import the bodyparser
const bodyParser = require("body-parser");

//import the days module
//const days = require('days');
const jdate = require('./node_modules/today-date-detail');
const jdateObject = jdate.today();

//hello world
//const hello = require(__dirname+'/test');
//console.log(hello());

//Month
const jdateMonth = jdateObject.monthName;
//Date
const jdateDay = jdateObject.date;
//Dayfullname
const jdayFullName = jdateObject.dayFullName;
//Contact Month Date and DayFullName
const jdateMonthDateDay = ' ,' + jdateMonth + ' ' + jdateDay;

//item 
let item = [];

let workItems = [];

//use the body parser
app.use(bodyParser.urlencoded({
    extended: true
}));

//This for the CSS File.
app.use(express.static("public"))


//set the EJS Engine
app.set('view engine', 'ejs');

//get the home route
app.get("/", function (req, res) {
    if (res.statusCode === 200) {

        let today = new Date(); //Date Object
        let currentDay = today.getDay();
        res.render("list", {
            listTitle: jdayFullName,
            monthDay: jdateMonthDateDay,
            newListItem: item
        });
        //res.send(); //can only be used once
    }
});

//work - route
app.get('/work', function (req, res) {
    res.render('list', {
        listTitle: "Work Items",
        monthDay: jdateMonthDateDay,
        newListItem: workItems
    });
});

//about - route
app.get('/about',function(req,res){
    res.render('about')
});



//post method - work route
app.post('/work', function (req, res) {
    workItems.push(req.body.newItem);
    res.redirect("/work");
});


//post method - main route
app.post('/', function (req, res) {

    if (req.body.list === 'Work') {
        workItems.push(req.body.newItem);
        res.redirect("/work");
    } else {
        item.push(req.body.newItem);
        res.redirect("/");
    }


});

//listen the home route
app.listen(process.env.PORT || 3000, function () {
    console.log("Server started");
});