var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");

var globals = require("./globals.js");

var app = express();
var port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(morgan("combined"));

app.use(function(req, res, next){
    console.log(req.body);
    if(!req.body.secret || req.body.secret != globals.secret){
        res.json({
            status: 403,
            code: "AUTHENTICATION_FAILED",
        });
        res.end();
    } else {
        next();
    }
});

var routes = require("./routes.js");
routes(app);

app.listen(port);
/*
https
    .createServer(credentials, app)
    .listen(3000, function() {
        console.log("My API is running...");
    });
*/
console.log(globals.name+" listening on: 0.0.0.0:" + port);
