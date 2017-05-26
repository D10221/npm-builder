"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var args_1 = require("./args");
exports.root = path.resolve(process.cwd(), args_1.current.value.getFlagAsString("root", process.cwd()));
