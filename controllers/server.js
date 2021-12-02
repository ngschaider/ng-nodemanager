var globals = require("../globals.js");
var db = require("../helpers/db.js");
var utils = require("../helpers/utils.js");
var filesHelper = require("../helpers/files.js");
var execSync = require("child_process").execSync;

function respondWithError(res, error){
    res.json({
        status: 500,
        success: false,
        message: error,
    });
    res.end();
}

module.exports = {
    install: function(req, res){
        db.getServer(req.body.serverId, function(server){
            db.getTemplate(server.template_id, function(template){
                var ret = filesHelper.install(server, template);
                res.json({
                    status: 201, // created
                    success: true,
                    message: ret,
                });
                res.end();
            }, function(error){
                respondWithError(res, error);
            });
        }, function(error){
            respondWithError(res, error);
        });
    },
    uninstall: function(req, res){
        db.getServer(req.body.serverId, function(server){
            db.getTemplate(server.template_id, function(template){
                var ret = filesHelper.uninstall(server, template);
                res.json({
                    status: 200,
                    success: true,
                    message: ret,
                });
                res.end();
            }, function(error){
                respondWithError(res, error);
            });
        }, function(error){
            respondWithError(res, error);
        });
    },
    start: function(req, res){
        db.getServer(req.body.serverId, function(server){
            db.getTemplate(server.template_id, function(template){
                var ret = filesHelper.start(server, template);
                res.json({
                    status: 200,
                    success: true,
                    message: ret,
                });
                res.end();
            }, function(error){
                respondWithError(res, error);
            });
        }, function(error){
            respondWithError(res, error);
        });
    },
    stop: function(req, res){
        db.getServer(req.body.serverId, function(server){
            db.getTemplate(server.template_id, function(template){
                var ret = filesHelper.stop(server, template);
                res.json({
                    status: 200,
                    success: true,
                    message: ret,
                });
                res.end();
            }, function(error){
                respondWithError(res, error);
            });
        }, function(error){
            respondWithError(res, error);
        });
    },
    status: function(req, res){
        var paddedServerId = utils.padZeros(req.body.serverId);
        var output = execSync("screen -ls | grep server_"+paddedServerId).toString("utf8"); // check if screen is running

        console.log(output);
        var status = output == "" ? false : true;
        res.json({
            status: 200,
            success: true,
            status: status,
        });
        res.end();
    },
    console: function(req, res){
        res.json({
            status: 200,
            success: true,
        });
        res.end();
    }

}
