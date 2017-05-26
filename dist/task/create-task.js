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
    var code = null;
    var ret = {
        name: context.taskName,
        label: query.taskEnabledsDesc(),
        state: !isEnabled ? "disabled" : "enabled",
        isDepedency: false,
        code: code,
        error: error
    };
    var run = function (pkg) {
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
