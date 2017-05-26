"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shell = require("shelljs");
var root_1 = require("./root");
var args_1 = require("./args");
var package_selection_1 = require("./package/package-selection");
var package_walker_1 = require("./package/package-walker");
var local_packages_1 = require("./package/local-packages");
var package_dir_1 = require("./package/package-dir");
var task_1 = require("./task");
var util_1 = require("util");
console.log(process.argv.slice(2).join(" "));
var args = args_1.current.value;
console.log("Packages: " + local_packages_1.localPackages.map(function (x) { return x.name; }).join(", "));
var selection = package_selection_1.packageSelection(args, local_packages_1.localPackages);
console.log("Package Selection: " + selection.map(function (x) { return x.name; }).join(", "));
var tasks = args.GetFlagAsList("task")
    .map(function (taskName) { return task_1.createTask({
    taskName: taskName,
    packageSelection: selection,
    packages: local_packages_1.localPackages,
    tasks: args.GetFlagAsList("task"),
    taskPackageFilter: args.GetFlagAsList(taskName)
}); });
shell.cd(root_1.root);
var log = [];
var walker = package_walker_1.Walker(local_packages_1.localPackages, 
// ...
function (pkg) {
    try {
        shell.cd(package_dir_1.packageDir(pkg));
        for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
            var task = tasks_1[_i];
            var result_1 = task.run(pkg);
            log.push("Package: " + pkg.name + ", Task: " + task.name + " -> " + result_1);
        }
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
    finally {
        shell.cd(root_1.root);
    }
}, function (pkg) { return !util_1.isNullOrUndefined(selection.find(function (x) { return x.name === pkg.name; })); });
var result = walker.walk();
console.log(log.length ? log.join("\n") : "No Task run");
console.log(result.completed.map(function (x) { return "completed: " + x.name; }).join("\n"));
process.exit(result.ok ? 1 : -1);
