import * as fs from "fs";
import * as path from "path";
import { Package } from "./Package";

const packageJson = "package.json";
const ignore = [/node_modules/];

const scan = (root: string) => {
    const packages: string[] = [];
    const dirx = (_path: string) => {
        for (const file of fs.readdirSync(_path)) {
            const _f = path.join(_path, file);
            if (fs.lstatSync(_f).isDirectory()) {
                if (ignore.find(x => x.test(_f))) {
                    continue;
                }
                dirx(_f);
                continue;
            }
            // ...
            if (file === packageJson) {
                packages.push(_f);
            }
        }
    };
    dirx(root);
    return packages;
};

/**
 *
 * @param root 'root -> cwd/packages?'
 */
export const getPackages = (root: string): Package[] => {
    const packagePaths = scan(root);
    // ...to package
    const packages = packagePaths.map(file => {
        const pkg = JSON.parse(fs.readFileSync(file, "utf-8"));
        pkg.path = file;
        return pkg;
    });
    return packages;
};