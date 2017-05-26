"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var lazy_1 = require("../lazy");
describe("lazy", function () {
    it("works", function () {
        var i = 0;
        var lazyi = lazy_1.create(function () { return i + 1; });
        assert.equal(lazyi.value, 1);
        assert.equal(lazyi.value, 1);
    });
});
