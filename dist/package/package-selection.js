"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
exports.packageSelection = function (args, packages) {
    var list = args.getParamAsList();
    if (!list.length)
        return packages;
    var wrong = list.filter(function (p) { return util.isNullOrUndefined(packages.find(function (x) { return x.name === p; })); });
    if (wrong.length) {
        throw new Error("package not found: '" + wrong.join(", ") + "'");
    }
    var selection = packages.filter(function (p) { return list.indexOf(p.name) !== -1; });
    if (!selection.length) {
        throw new Error("Package Selection Empty");
    }
    return selection;
};
