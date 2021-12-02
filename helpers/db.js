var mysql = require("mysql");
var db = mysql.createConnection({
    host: "synnet.io",
    user: "c1panelsuser",
    password: "GzgMriMZ_8",
    database: "c1acp",
    /*ssl: {
        ca: fs.readFileSync(__dirname + "/mysql-ca.crt");
    }*/
});


module.exports = {
    getTemplate: function(id, success, error){
        db.query('SELECT * FROM templates WHERE id = ? LIMIT 1', [id], function(err, templates, fields) {
            if(err){
                return error(err);
            }
            if(templates.length == 0){
                return error("TEMPLATE_NOT_FOUND");
            }
            db.query("SELECT * FROM commands WHERE template_id = ? ORDER BY order_num", [id], function(err, commands, fields) {
                if(err){
                    return error(err);
                }
                var data = templates[0];
                data.commands = commands;
                success(data);
            })
        });
    },

    getServer: function(id, success, error){
        db.query("SELECT * FROM servers WHERE id = ? LIMIT 1", [id], function(err, servers, fields){
            if(err){
                return error(err);
            }
            if(servers.length == 0){
                return error("SERVER_NOT_FOUND");
            }
            success(servers[0]);
        });
    }
}
