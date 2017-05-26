// const semver = require('semver')
// const url = require("url");

/**
 * @param ignore {Regex[]}
 */
module.exports =(dependencies, ignore) => {
    let out = {}
    if (dependencies) {
        for (let depKey of Object.keys(dependencies)) {

            // .. skip 
            if (ignore.find(x => x.test(depKey))) continue;

            //let version = dependencies[depKey];           
            // ...  remap:  path
            // if (version.startsWith("file:")) {
            //     // ... 
            //     version = version.split("file:")[1];
            //     const newPath = "file:" + path.relative(
            //         root,
            //         path.resolve(
            //             path.dirname(package.path),
            //             version
            //         )
            //     ).replace("\\", "/");
            //     out[depKey] = newPath;
            //     console.log(`${package.name}: ${depKey}: newPath: ${newPath}`);
            //     continue;
            // }

            // ...
            out[depKey] = dependencies[depKey];
        }
    }
    return out;
}