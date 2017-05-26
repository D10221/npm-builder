import * as shell from "shelljs";
import { Package } from "../package/Package";
import { TaskContext } from "../task";
import { contextQuery } from "./context-query";

export type Exec = (cmd: string) => { code: number };

export const createTask = (context: TaskContext, exec?: Exec) => {
    exec = exec || shell.exec;

    const query = contextQuery(context);

    const isEnabled = query.isEnabled();

    // if (isEnabled) console.log(query.taskEnabledsDesc());
    const error: Error = null;
    const code: any = null;
    const ret = {
        name: context.taskName,
        label: query.taskEnabledsDesc(),
        state: !isEnabled ? "disabled" : "enabled",
        isDepedency: false,
        code,
        error
    };

    const run = (pkg: Package) => {
        ret.isDepedency = query.isDependency(pkg);
        ret.state = !query.isTaskSelectedForPackage(pkg) ? "uselected" : ret.state;
        if (!isEnabled) return ret;

        ret.code = exec(`npm run ${context.taskName}`).code;
        if (ret.code !== 0) {
            ret.error = new Error(`Can't ${context.taskName} ${pkg.name}`);
        }
        ret.state = "completed";
        return ret;
    };

    return { name: context.taskName, run };
};