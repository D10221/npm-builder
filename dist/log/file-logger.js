"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
exports.FileLogger = function (path, logLevel) { return new winston.transports.DailyRotateFile({
    filename: path,
    handleExceptions: false,
    json: false,
    datePattern: "yyyy-MM-dd.",
    prepend: true,
    level: logLevel,
}); };
