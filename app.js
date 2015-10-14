var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// base config
var config = require("./config/baseConfig.js");
var apiRouter = require('./services/apiRouter.js');

app.use(bodyParser.json({limit:'10kb',strict:false}));
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(authenticate.checkSession);
app.use("/", apiRouter);

app.use("/*", function (req, res){
    res.send("404");
});

app.listen(config.basicSettings.sitePort, function () {
    console.log('Express server listening on port ' + config.basicSettings.sitePort);
});


