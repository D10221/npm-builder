#!/usr/bin/env node

const shell = require("shelljs");
const argv = process.argv.slice(2);
const save = argv.indexOf("--save");
const pkgs = argv.filter(x => !x.startsWith("-")).map(
    a => {
        return {
            name: a, type: "@types/" + a
        }
    }
)
shell.exec(
    `npm uninstall ${save ? "--save-dev" : ""} ${pkgs.map(a => a.type).join(' ')}`+
    `&& npm uninstall ${save? "--save" : "" } ${pkgs.map(x => x.name).join(" ")}`
);