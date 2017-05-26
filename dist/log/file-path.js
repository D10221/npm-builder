"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var config_1 = require("./config");
var fs = require("fs");
var root_1 = require("../root");
function filePath() {
    var target = path.join(root_1.root, config_1.LogFolder);
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }
    return path.join(target, config_1.loggerName + "." + config_1.environment + ".log");
}
exports.filePath = filePath;
