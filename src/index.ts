import * as shell from "shelljs";
import { root } from "./root";
import { current as ArgsQuery } from "./args";

import { packageSelection } from "./package/package-selection";
import { Walker } from "./package/package-walker";
import { localPackages } from "./package/local-packages";
import { packageDir } from "./package/package-dir";

import { Task, createTask } from "./task";
import { isNullOrUndefined } from "util";
import { TaskResult } from "./task/task-reulst";

console.log(process.argv.slice(2).join(" "));

const args = ArgsQuery.value;

console.log(`Packages: ${localPackages.map(x => x.name).join(", ")}`);
const selection = packageSelection(args, localPackages);
console.log(`Package Selection: ${selection.map(x => x.name).join(", ")}`);

const tasks: Task[] = args.GetFlagAsList("task")
    .map(taskName => createTask({
        taskName,
        packageSelection: selection,
        packages: localPackages,
        tasks: args.GetFlagAsList("task"),
        taskPackageFilter: args.GetFlagAsList(taskName)
    }), );

shell.cd(root);
const log: string[] = [];
const walker = Walker(localPackages,
    // ...
    (pkg) => {
        try {
            shell.cd(packageDir(pkg));
            for (const task of tasks) {
                const result: TaskResult = task.run(pkg);
                if (result.code !== 0)
                    throw (result.error ||
                         new Error(`Package: ${pkg.name}, task: ${task.name}, failed`));
                log.push(
                    `Package: ${pkg.name}, ` +
                    `Task: ${task.name} -> ` +
                    `${result.state} ${result.isDepedency ? "dependency" : ""}`);
            }
            return true;
        } catch (e) {
            console.log(e);
            return false;
        } finally {
            shell.cd(root);
        }
    },
    pkg => !isNullOrUndefined(selection.find(x => x.name === pkg.name)));

const result = walker.walk();
console.log(
    log.length ? log.join("\n") : "No Task run"
);
console.log(result.completed.map(x => `completed: ${x.name}`).join("\n"));
process.exit(result.ok ? 1 : -1);