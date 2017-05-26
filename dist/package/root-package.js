"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lazy_1 = require("../lazy");
var root_1 = require("../root");
var get_package_1 = require("./get-package");
exports.current = lazy_1.create(function () {
    return get_package_1.getPackage(root_1.root);
});
