module.exports = function(app) {
    var general = require("./controllers/general.js");
    var server = require("./controllers/server.js");

    app.post("/info", general.info);

    app.post("/server/install", server.install);
    app.post("/server/uninstall", server.uninstall);
    app.post("/server/start", server.start);
    app.post("/server/stop", server.stop);
    app.post("/server/status", server.status);
    app.post("/server/console", server.console);
}
