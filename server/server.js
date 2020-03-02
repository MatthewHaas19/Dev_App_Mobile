var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var index = require("./routes/index")
var users = require("./routes/users")
var posts = require("./routes/posts")
var reports = require("./routes/reports")

var cors = require('cors');

var app = express();

app.use(cors())

app.listen(process.env.PORT || 9090);

//VIEWS
app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.engine("html",require("ejs").renderFile);

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//routes
app.use("/", index)
app.use("/users",users);
app.use("/posts",posts);
app.use("/reports",reports)
