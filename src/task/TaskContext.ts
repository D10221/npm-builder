import { Package } from "../package/Package";
export interface TaskContext {
    /**
     * reverved
     */
    disabled?: boolean;
    /**
     * Our  packages, All, found
     */
    packages: Package[];
    /**
     * TODO: only names?
     */
    packageSelection: Package[];
    /**
     * All Tasks
     */
    tasks: string[];
    /**
     * this Task
     */
    taskName: string;
    /**
     * tasl package filter ?
     * apply task to this packages
     */
    taskPackageFilter: string[];
}
