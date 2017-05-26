import * as util from "util";
import { Package } from "./Package";
const isNull = util.isNullOrUndefined;
/**
 * Walk and run a task on package local dependecies then the package,
 * @param pkgs 'all packages'
 * @param task 'what to run', can be empty
 * @param filter 'optional all-packages-input filter'
 */
export const Walker = (
    pkgs: Package[],
    task: (pkg: Package) => boolean,
    filter?: (x: Package) => boolean) => {
    // ..
    filter = filter || (() => true);

    const localNames = pkgs.map(x => x.name);
    const isLocal = (name: string) => localNames.indexOf(name) !== -1;
    const find = (name: string) => pkgs.find(x => x.name === name);

    const completed: Package[] = [];
    const isCopleted = (pkg: Package) => completed.map(x => x.name).indexOf(pkg.name) !== -1;

    const step = (pkg: Package) => {
        if (isNull(pkg) || isCopleted(pkg)) return true;
        const deps = Object.keys(pkg.dependencies || {}).filter(isLocal);
        for (const dep of deps) {
            step(find(dep));
        }
        if (!task(pkg)) {
            return false;
        }
        completed.push(pkg);
        return true;
    };

    const walk = () => {
        let ok = false;
        for (const pkg of pkgs.filter(filter)) {
            ok = step(pkg);
            if (!ok) break;
        }
        return {
            ok, completed
        };
    };
    return { walk };
};