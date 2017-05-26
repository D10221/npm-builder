import * as path from "path";
import * as fs from "fs";

export const getPackage = (root: string) => {
    const _path = path.join(root, "package.json");
    return {
        package: JSON.parse(fs.readFileSync(
            _path,
            "utf-8"
        )),
        path: _path
    };
};