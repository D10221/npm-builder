const fs = require("fs");
const shell = require("shelljs");
const path = require("path");

const isDebug = process.env.NODE_ENV !== "production";
const hasFlag = (x) => process.argv.slice(2).indexOf(x) !== -1;
const forceBuild = hasFlag("--build-self");

const isBuilt = () => {
    if (!isDebug) return true;
    const json = fs.readFileSync(path.resolve(__dirname, "./tsconfig.json"), "utf-8")
        .replace(/\/\/.*/mg, "")
        .replace(/\/\*(.*)\*\//mg, "")
        .trim();
    const tsConfig = (JSON.parse(json));
    const outDir = path.resolve(
        __dirname, tsConfig.compilerOptions.outDir);

    return fs.existsSync(outDir);
}


const build = () => {
    console.info("Building... self");
    const result = shell.exec(`tsc -p ${__dirname}`, {
        async: false,
        cwd: __dirname
    });
    if (result.code !== 0) {
        process.exit(-1);
    }
    console.info("Building... self: done");
}

if (isDebug && !isBuilt || forceBuild) build();
require("./dist/index");