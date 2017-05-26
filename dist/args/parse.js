"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xCase = function (x) {
    return x.replace(/-+(\w)/, function (_, n) { return n.toUpperCase(); });
};
var clean = function (x) {
    return xCase(x.replace(/^-+/, ""));
};
/**
 * negatives?
 */
var isNumber = function (x) {
    return /^\d+(\.\d+)?$/.test(x);
};
var isBoolean = function (x) {
    return /(true|false)/i.test(x);
};
var convert = function (x) {
    return isNumber(x) ? Number.parseFloat(x) :
        (isBoolean(x) ? x.toLowerCase() === "true" : x);
};
var isFlag = function (x) { return /^\-.*/.test(x); };
exports.parse = function (args) {
    var empty = "_";
    var prevKey = empty;
    var result = [];
    var add = function (key, value) {
        result.push({ key: key, value: convert(value) });
    };
    var _loop_1 = function (i) {
        var value = args[i];
        // flags
        if (isFlag(value)) {
            prevKey = clean(value);
            if (result.find(function (x) { return x.key === prevKey; })) {
                throw new Error("too many '" + prevKey + "'");
            }
            var next = args[i + 1];
            if (isFlag(next) ||
                // last
                i === args.length - 1 ||
                // parameter group
                next.indexOf("=") !== -1) {
                // set default value, ust present
                result.push({ key: prevKey, value: true });
            }
            return "continue";
        }
        // parameter grouping
        if (value.indexOf("=") !== -1) {
            var parts = value.split("=");
            var key_1 = clean(parts[0]);
            if (result.find(function (x) { return x.key === key_1; })) {
                throw new Error("too many '" + key_1 + "'");
            }
            add(key_1, parts[1]);
            prevKey = empty;
            return "continue";
        }
        // values
        var found = result.find(function (x) { return x.key === prevKey; });
        if (found) {
            if (!Array.isArray(found.value)) {
                found.value = ["" + found.value];
            }
            found.value.push(value);
            return "continue";
        }
        add(prevKey, value);
    };
    for (var i = 0; i < args.length; i++) {
        _loop_1(i);
    }
    return result;
};
