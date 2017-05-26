"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_logger_1 = require("./get-logger");
var _logger;
exports.getCurrentLogger = function (level, transports) {
    if (_logger) {
        return _logger;
    }
    _logger = get_logger_1.getLogger(level, transports);
    return _logger;
};
