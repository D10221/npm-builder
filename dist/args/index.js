"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./query"));
var query_1 = require("./query");
var lazy_1 = require("../lazy");
exports.current = lazy_1.create(query_1.Query);
