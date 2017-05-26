"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var file_path_1 = require("./file-path");
var config_1 = require("./config");
var file_logger_1 = require("./file-logger");
var console_logger_1 = require("./console-logger");
/**
 * get new
 */
exports.getLogger = function (level, transports) {
    // ...
    level = level || config_1.defaultlevel;
    transports = transports || config_1.defaultTransports;
    winston.configure({
        transports: [
            file_logger_1.FileLogger(file_path_1.filePath(), level),
            console_logger_1.ConsoleLogger(level)
        ],
    });
    return winston.log;
};
