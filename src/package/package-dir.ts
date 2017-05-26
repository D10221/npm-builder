import * as path from "path";
import { Package } from "./Package";
export const packageDir = (pkg: Package) => {
    if (!pkg.path) {throw new Error(`Package: ${pkg.name} doesn't have path`)}
    return path.dirname(pkg.path);
};