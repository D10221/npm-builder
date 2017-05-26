"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var package_1 = require("../package");
exports.LogFolder = "logs";
exports.defaultTransports = ["file", "console"];
exports.environment = process.env.NODE_ENV || "production";
exports.loggerName = package_1.getPackage(path.join(__dirname, "../../"));
exports.defaultlevel = process.env.NODE_ENV === "development" ? "debug" : "error";
