import { Package } from "../package/Package";
import { TaskResult } from "./task-reulst";
export interface Task {
    name: string;
    run: (p: Package) => TaskResult;
}
