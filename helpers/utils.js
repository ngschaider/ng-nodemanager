var globals = require("../globals.js");

module.exports = {
    padZeros: function(input) {
        while(input.toString().length < globals.screenIdNumberLength) {
            input = "0"+input;
        }
        return input;
    }
}
