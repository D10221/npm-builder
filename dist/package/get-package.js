"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
exports.getPackage = function (root) {
    var _path = path.join(root, "package.json");
    return {
        package: JSON.parse(fs.readFileSync(_path, "utf-8")),
        path: _path
    };
};
