"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
exports.packageDir = function (pkg) {
    if (!pkg.path) {
        throw new Error("Package: " + pkg.name + " doesn't have path");
    }
    return path.dirname(pkg.path);
};
