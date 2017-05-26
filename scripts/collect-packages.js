const fs = require("fs");
const path = require("path");
const getPackages = require("./get-packages");
const root = process.cwd();
const packagesDir = path.resolve(root, "packages");

const packages = getPackages(packagesDir);   
const local = {};
for (let package of packages) {
    try {                     
        local[package.name] = "file:packages/" +  path.basename(path.dirname(package.path));
    } catch (e) {   
        console.log(`Problems:\n ${ package.name}\n ${package.path}`);        
        throw e;
    }
}

const rootPackagePath = path.resolve(root, "package.json");
const rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, "utf-8"))
rootPackage.local = local;

fs.writeFileSync(
    rootPackagePath,
    JSON.stringify(
        rootPackage,
        null,
        2
    )
)
process.exit();

