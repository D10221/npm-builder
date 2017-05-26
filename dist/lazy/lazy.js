"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
var Lazy = (function () {
    function Lazy(fty) {
        this.fty = fty;
    }
    Object.defineProperty(Lazy.prototype, "value", {
        get: function () {
            if (util.isNullOrUndefined(this._value)) {
                this._value = this.fty();
            }
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    return Lazy;
}());
exports.Lazy = Lazy;
exports.create = function (fty) { return new Lazy(fty); };
