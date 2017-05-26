const hasFlag = (x) => process.argv.slice(2).indexOf(x) !== -1;

if (hasFlag("--dev")) {
    require("./built/index");
}
else {
    require("./dist/index");
}
