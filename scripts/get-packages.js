const fs = require("fs");
const path = require("path");
const what = "package.json";
const ignore = [/node_modules/];

module.exports = (root) => {
    const packages = [];
    const dirx = (_path, what) => {
        for (let file of fs.readdirSync(_path)) {
            let _f = path.join(_path, file)
            if (fs.lstatSync(_f).isDirectory()) {
                if (ignore.find(x => x.test(_f))) {
                    continue;
                }
                dirx(_f, what);
                continue;
            }
            // ... 
            if (file === what) {
                packages
                    .push(_f);
            }
        }
    }
    dirx(root, what);
    // ...to package
    return packages.map(file => {
        const pkg = JSON.parse(fs.readFileSync(file, "utf-8"));
        pkg.path = file;
        return pkg;
    });
}