"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = function ($args) {
    return $args.reduce(function (acc, keyValue) {
        acc[(keyValue.key || "_")] = keyValue.value;
        return acc;
    }, {});
};
