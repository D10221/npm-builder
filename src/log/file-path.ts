import * as path from "path";
import { LogFolder, environment, loggerName } from "./config";
import * as fs from "fs";
import { root } from "../root";
export function filePath(): string {
    const target = path.join(root, LogFolder);
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }
    return path.join(target, `${loggerName}.${environment}.log`);
}
