const fs = require("fs");
const path = require("path");
const getPackages = require("./get-packages");
const getDependecies = require("./get-dependencies");
// const shell = require("shelljs");

const root = process.cwd();
const packagesDir = path.resolve(root, "packages");

const packages = getPackages(packagesDir);   

let devDependencies = {};
let dependencies = {};

for (let package of packages) {
    try {        
        Object.assign(
            dependencies, 
            getDependecies(
                package.dependencies,
                // ignore local packages
                packages.map(p=> new RegExp( p.name)))
        )
        
        Object.assign(
            devDependencies, getDependecies(package.devDependencies, [])
        )

    } catch (e) {
        console.log(`Problems:\n ${ package.name}\n ${package.path}`);        
        throw e;
    }
}

const rootPackagePath = path.resolve(root, "package.json");
const rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, "utf-8"))

Object.assign(rootPackage.dependencies, dependencies);
Object.assign(rootPackage.devDependencies, devDependencies);

fs.writeFileSync(
    rootPackagePath,
    JSON.stringify(
        rootPackage,
        null,
        2
    )
)
process.exit();

