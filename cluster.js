var cluster = require('cluster');
if (cluster.isMaster) {
    var cupCount = require('os').cpus().length;
    for (var i = 0; i < cupCount; i++) {
        cluster.fork();
    }
} else {
    var app = express();

    var bodyParser = require('body-parser');

// base config
    var config = require("./config/baseConfig.js");
    var apiRouter = require('./services/apiRouter.js');

    app.use(bodyParser.json({limit:'10kb',strict:false}));
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use("/", apiRouter);

    app.use("/*", function (req, res){
        res.send("404");
    });

    app.listen(config.basicSettings.sitePort, function () {
        console.log('Express server listening on port ' + config.basicSettings.sitePort);
    });

}
cluster.on('exit', function (worker, code, signal) {
    console.log('worker %d died (%s). restarting...',
        worker.process.pid, signal || code);
    cluster.fork();
});
