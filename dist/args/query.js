"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parse_1 = require("./parse");
var reduce_1 = require("./reduce");
var util_1 = require("util");
var isType = function (type, x) {
    return x && typeof x.value === type;
};
exports.Query = function (options) {
    options = options || {};
    var list = parse_1.parse(options.argv || process.argv.slice(2));
    if (options.expected) {
        var _loop_1 = function (o) {
            var found = list.find(function (x) { return x.key === o.key; });
            if (o.required) {
                if (!found) {
                    throw new Error((o.displayName || o.key) + " is required");
                }
            }
            if (found && o.type && !isType(o.type, found)) {
                throw new Error("expected " + found.key + " to be " + o.type);
            }
        };
        for (var _i = 0, _a = options.expected; _i < _a.length; _i++) {
            var o = _a[_i];
            _loop_1(o);
        }
    }
    var _values;
    var values = function () { return _values ? _values : (_values = reduce_1.reduce(list)); };
    var hasFlag = function (key) {
        return !util_1.isNullOrUndefined(Object.getOwnPropertyNames(values()).find(function (x) { return x === key; }));
    };
    var getFlagAsString = function (key, defaultValue) {
        var found = (list.find(function (x) { return x.key === key; }));
        if (util_1.isNullOrUndefined(found))
            return defaultValue || "";
        if (Array.isArray(found.value))
            return found.value.map(function (x) { return "" + x; }).join(" ");
        return "" + found.value;
    };
    var getFlagAsNumber = function (key, defaultValue) {
        var found = (list.find(function (x) { return x.key === key; }) || {});
        return !util_1.isNullOrUndefined(found) &&
            typeof found.value === "number" ? found.value : defaultValue || Number.NaN;
    };
    /**
     *
     * @param key false defauls
     */
    var GetFlagAsBool = function (key, defaultValue) {
        var found = (list.find(function (x) { return x.key === key; }) || {});
        return !util_1.isNullOrUndefined(found) &&
            typeof found.value === "boolean" ? found.value : defaultValue || false;
    };
    var GetFlagAsList = function (key, defaultValue) {
        var found = (list.find(function (x) { return x.key === key; }) || {});
        if (util_1.isNullOrUndefined(found))
            return defaultValue || [];
        if (typeof found.value === "string") {
            return [found.value];
        }
        if (Array.isArray(found.value)) {
            return found.value;
        }
        return defaultValue || [];
    };
    var getParamAsString = function () {
        var value = (list.find(function (x) { return x.key === "_"; }) || {}).value;
        return typeof value === "string" ? value : "";
    };
    var getParamAsNumber = function () {
        var value = (list.find(function (x) { return x.key === "_"; }) || {}).value;
        return typeof value === "number" ? value : Number.NaN;
    };
    var getParamAsBool = function () {
        var value = (list.find(function (x) { return x.key === "_"; }) || {}).value;
        return typeof value === "boolean" ? value : false;
    };
    var getParamAsList = function () {
        var found = list.find(function (x) { return x.key === "_"; });
        if (util_1.isNullOrUndefined(found)) {
            return [];
        }
        if (Array.isArray(found.value))
            return found.value;
        return ["" + found.value];
    };
    return {
        list: list,
        values: values,
        hasFlag: hasFlag,
        getFlagAsString: getFlagAsString,
        getFlagAsNumber: getFlagAsNumber,
        GetFlagAsBool: GetFlagAsBool,
        GetFlagAsList: GetFlagAsList,
        getParamAsString: getParamAsString,
        getParamAsBool: getParamAsBool,
        getParamAsNumber: getParamAsNumber,
        getParamAsList: getParamAsList,
    };
};
