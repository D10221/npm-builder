"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
exports.ConsoleLogger = function (level) { return new winston.transports.Console({
    level: level
}); };
