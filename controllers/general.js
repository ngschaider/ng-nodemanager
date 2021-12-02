var globals = require("../globals.js");

module.exports = {

    info: function(req, res){
        res.json({
            status: 200,
            name: globals.name,
            version: globals.version,
        });
        res.end();
    }

}
