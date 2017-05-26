"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var _switch = /^(?:\$|\+).*/;
exports.flatDeps = function (packages) {
    var deps = packages.map(function (x) { return Object.keys(x.dependencies || {}); });
    if (!deps.length)
        return [];
    return deps.reduce(function (c, n) { return c.concat(n); });
};
exports.contextQuery = function (context) {
    /**
     * Context tasks names
     */
    var taskNames = function () {
        return context.tasks && context.tasks.length ?
            context.tasks.reduce(function (a, b) { return a + ", " + +b; }) : "<empty>";
    };
    if (util_1.isNullOrUndefined(context.taskName) || context.taskName.trim() === "") {
        throw new Error("Bad Task Name");
    }
    if (!context.tasks.length || context.tasks.reduce(function (a, b) { return a + b; }).trim() === "") {
        throw new Error("this Task: '" + context.taskName + "' not Found in Tasks: " + taskNames());
    }
    var findPackageByName = function (name) {
        return context.packages.find(function (p) { return p.name === name; });
    };
    var findInPackageSelectionByName = function (name) {
        return context.packageSelection.find(function (p) { return p.name === name; });
    };
    var filterList = context.taskPackageFilter.filter(function (x) { return !_switch.test(x); });
    var switches = context.taskPackageFilter.filter(function (x) { return _switch.test(x); });
    var anyPackage = !filterList.length;
    if (!anyPackage) {
        {
            // Package Not Found
            var wrong = filterList.find(function (x) { return util_1.isNullOrUndefined(findPackageByName(x)); });
            if (!util_1.isNullOrUndefined(wrong)) {
                throw new Error("Package: '" + wrong + "' from" +
                    (" in selection filter list: [" + filterList.map(function (xx) { return "'" + xx + "'"; }).join(", ") + "]") +
                    (" for task: '" + context.taskName + "'") +
                    " Not found in local packages");
            }
        }
        if (context.packageSelection.length) {
            // Pckage Not fund in Selection
            var wrong = filterList.find(function (x) { return util_1.isNullOrUndefined(findInPackageSelectionByName(x)); });
            if (!util_1.isNullOrUndefined(wrong)) {
                throw new Error(" Package: '" + wrong + "'" +
                    (" in selection filter list: [" + filterList.map(function (xx) { return "'" + xx + "'"; }).join(", ") + "]") +
                    (" for task: '" + context.taskName + "'") +
                    " not found in selection filter");
            }
        }
    }
    /**
     * no current use for disabled
     * ...when tasks are created from command line flags/switches
     */
    var isEnabled = function () {
        return !context.disabled &&
            // this doesn't happen currently
            taskNames().indexOf(context.taskName) !== -1;
    };
    var findInFilterList = function (pkg) {
        return filterList.find(function (x) { return x === pkg.name; });
    };
    var isTaskSelectedForPackage = function (pkg) {
        if (isDependency(pkg)) {
            return !ignoreDependency(); // || !isNull(findInFilterList(pkg));
        }
        return anyPackage || !util_1.isNullOrUndefined(findInFilterList(pkg));
    };
    /**
     * pkg is Dependencie in our Packages
     */
    var isDependency = function (pkg) {
        var deps = exports.flatDeps(context.packages);
        return !util_1.isNullOrUndefined(deps.find(function (x) { return x === pkg.name; }));
    };
    var taskEnabledsDesc = function () {
        return context.taskName + ": " + (anyPackage ? "any" : filterList.join(",")) +
            ("" + (ignoreDependency() ? "" : " + deps"));
    };
    var ignoreDependency = function () {
        return switches.length > 0 && switches.indexOf("+") === -1;
    };
    return {
        isEnabled: isEnabled,
        isTaskSelectedForPackage: isTaskSelectedForPackage,
        isDependency: isDependency,
        taskEnabledsDesc: taskEnabledsDesc,
        ignoreDependency: ignoreDependency,
        findPackageByName: findPackageByName,
        findInPackageSelectionByName: findInPackageSelectionByName,
        findInFilterList: findInFilterList,
        taskNames: taskNames,
    };
};
