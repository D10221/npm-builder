"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shell = require("shelljs");
var context_query_1 = require("./context-query");
exports.createTask = function (context, exec) {
    exec = exec || shell.exec;
    var query = context_query_1.contextQuery(context);
    var isEnabled = query.isEnabled();
    // if (isEnabled) console.log(query.taskEnabledsDesc());
    var error = null;
    var code = 0;
    var label = query.taskEnabledsDesc();
    var state = !isEnabled ? "disabled" : "enabled";
    var run = function (pkg) {
        var ret = {
            state: state,
            label: label,
            name: context.taskName,
            isDepedency: false,
            code: code,
            error: error
        };
        ret.isDepedency = query.isDependency(pkg);
        ret.state = !query.isTaskSelectedForPackage(pkg) ? "uselected" : ret.state;
        if (!isEnabled)
            return ret;
        ret.code = exec("npm run " + context.taskName).code;
        if (ret.code !== 0) {
            ret.error = new Error("Can't " + context.taskName + " " + pkg.name);
        }
        ret.state = "completed";
        return ret;
    };
    return { name: context.taskName, run: run };
};
