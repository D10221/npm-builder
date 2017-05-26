"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var packageJson = "package.json";
var ignore = [/node_modules/];
var scan = function (root) {
    var packages = [];
    var dirx = function (_path) {
        var _loop_1 = function (file) {
            var _f = path.join(_path, file);
            if (fs.lstatSync(_f).isDirectory()) {
                if (ignore.find(function (x) { return x.test(_f); })) {
                    return "continue";
                }
                dirx(_f);
                return "continue";
            }
            // ...
            if (file === packageJson) {
                packages.push(_f);
            }
        };
        for (var _i = 0, _a = fs.readdirSync(_path); _i < _a.length; _i++) {
            var file = _a[_i];
            _loop_1(file);
        }
    };
    dirx(root);
    return packages;
};
/**
 *
 * @param root 'root -> cwd/packages?'
 */
exports.getPackages = function (root) {
    var packagePaths = scan(root);
    // ...to package
    var packages = packagePaths.map(function (file) {
        var pkg = JSON.parse(fs.readFileSync(file, "utf-8"));
        pkg.path = file;
        return pkg;
    });
    return packages;
};
