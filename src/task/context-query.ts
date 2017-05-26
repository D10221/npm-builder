import { TaskContext } from "./TaskContext";
import { isNullOrUndefined as isNull } from "util";
import { Package } from "../package/Package";

const _switch = /^(?:\$|\+).*/;

export const flatDeps = (packages: Package[]) => {
    const deps = packages.map(x => Object.keys(x.dependencies || {}));
    if (!deps.length) return [];
    return deps.reduce((c, n) => c.concat(n));
};

export const contextQuery = (context: TaskContext) => {

    /**
     * Context tasks names
     */
    const taskNames = (): string => {
        return context.tasks && context.tasks.length ?
            context.tasks.reduce((a, b) => a + ", " + +b) : "<empty>";
    };

    if (isNull(context.taskName) || context.taskName.trim() === "") {
        throw new Error("Bad Task Name");
    }
    if (!context.tasks.length || context.tasks.reduce((a, b) => a + b).trim() === "") {
        throw new Error(`this Task: '${context.taskName}' not Found in Tasks: ${taskNames()}`);
    }
    const findPackageByName = (name: string) => {
        return context.packages.find(p => p.name === name);
    };
    const findInPackageSelectionByName = (name: string) => {
        return context.packageSelection.find(p => p.name === name);
    };

    const filterList = context.taskPackageFilter.filter(x => !_switch.test(x));
    const switches = context.taskPackageFilter.filter(x => _switch.test(x));
    const anyPackage = !filterList.length;

    if (!anyPackage) {
        {
            // Package Not Found
            const wrong = filterList.find(x => isNull(findPackageByName(x)));
            if (!isNull(wrong)) {
                throw new Error(
                    `Package: '${wrong}' from` +
                    ` in selection filter list: [${filterList.map(xx => `'${xx}'`).join(", ")}]` +
                    ` for task: '${context.taskName}'` +
                    ` Not found in local packages`);
            }
        }

        if (context.packageSelection.length) {
            // Pckage Not fund in Selection
            const wrong = filterList.find(x => isNull(findInPackageSelectionByName(x)));
            if (!isNull(wrong)) {
                throw new Error(
                    ` Package: '${wrong}'` +
                    ` in selection filter list: [${filterList.map(xx => `'${xx}'`).join(", ")}]` +
                    ` for task: '${context.taskName}'` +
                    ` not found in selection filter`);
            }
        }
    }

    /**
     * no current use for disabled
     * ...when tasks are created from command line flags/switches
     */
    const isEnabled = () => {
        return !context.disabled &&
            // this doesn't happen currently
            taskNames().indexOf(context.taskName) !== -1;
    };

    const findInFilterList = (pkg: Package) => {
        return filterList.find(x => x === pkg.name);
    };

    const isTaskSelectedForPackage = (pkg: Package) => {
        if (isDependency(pkg)) {
            return !ignoreDependency(); // || !isNull(findInFilterList(pkg));
        }
        return anyPackage || !isNull(findInFilterList(pkg));
    };

    /**
     * pkg is Dependencie in our Packages
     */
    const isDependency = (pkg: Package) => {
        const deps = flatDeps(context.packages);
        return !isNull(deps.find(x => x === pkg.name));
    };

    const taskEnabledsDesc = () => {
        return `${context.taskName}: ${anyPackage ? "any" : filterList.join(",")}` +
            `${ignoreDependency() ? "" : " + deps"}`;
    };

    const ignoreDependency = () => {
        return switches.length > 0 && switches.indexOf("+") === -1;
    };

    return {
        isEnabled,
        isTaskSelectedForPackage,
        isDependency,
        taskEnabledsDesc,
        ignoreDependency,
        findPackageByName,
        findInPackageSelectionByName,
        findInFilterList,
        taskNames,
        // flatDeps,
    };
};