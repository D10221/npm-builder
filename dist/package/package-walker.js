"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
var isNull = util.isNullOrUndefined;
/**
 * Walk and run a task on package local dependecies then the package,
 * @param pkgs 'all packages'
 * @param task 'what to run', can be empty
 * @param filter 'optional all-packages-input filter'
 */
exports.Walker = function (pkgs, task, filter) {
    // ..
    filter = filter || (function () { return true; });
    var localNames = pkgs.map(function (x) { return x.name; });
    var isLocal = function (name) { return localNames.indexOf(name) !== -1; };
    var find = function (name) { return pkgs.find(function (x) { return x.name === name; }); };
    var completed = [];
    var isCopleted = function (pkg) { return completed.map(function (x) { return x.name; }).indexOf(pkg.name) !== -1; };
    var step = function (pkg) {
        if (isNull(pkg) || isCopleted(pkg))
            return true;
        var deps = Object.keys(pkg.dependencies || {}).filter(isLocal);
        for (var _i = 0, deps_1 = deps; _i < deps_1.length; _i++) {
            var dep = deps_1[_i];
            step(find(dep));
        }
        if (!task(pkg)) {
            return false;
        }
        completed.push(pkg);
        return true;
    };
    var walk = function () {
        var ok = false;
        for (var _i = 0, _a = pkgs.filter(filter); _i < _a.length; _i++) {
            var pkg = _a[_i];
            ok = step(pkg);
            if (!ok)
                break;
        }
        return {
            ok: ok, completed: completed
        };
    };
    return { walk: walk };
};
