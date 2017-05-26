"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var root_1 = require("../root");
var get_packages_1 = require("./get-packages");
exports.localPackages = get_packages_1.getPackages(path.resolve(root_1.root, "packages"));
