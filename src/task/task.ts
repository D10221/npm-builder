import { Package } from "../package/Package";
export interface Task {
    name: string;
    run: (p: Package) => any;
}
