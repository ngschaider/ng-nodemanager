var execSync = require("child_process").execSync;
var utils = require("./utils.js");
var globals = require("../globals.js");

function executeCommand(commandToExecute){
    console.log("Executing Command: -->"+commandToExecute+"<---")
    return execSync(commandToExecute);
}

function formatCommand(server, template, command){
    var text = command.text;
    text = text.replace(/%serverdir%/g, globals.serverInstallsDirectory);
    text = text.replace(/%imageid%/g, globals.serverImagesDirectory);
    text = text.replace(/%templateid%/g, template.id);
    text = text.replace(/%serverid%/g, utils.padZeros(server.id));
    return text;
}

function executeCommandsByType(server, template, type) {
    for(var command of template.commands){
        if(command.type != type) continue;
        executeCommand(formatCommand(server, template, command));
    }
}

module.exports = {
    install: function(server, template) {
        executeCommandsByType(server, template, 1);
    },
    uninstall: function(server, template) {
        executeCommandsByType(server, template, 2);
    },
    start: function(server, template) {
        executeCommandsByType(server, template, 3);
    },
    stop: function(server, template) {
        executeCommandsByType(server, template, 4);
    }
}
