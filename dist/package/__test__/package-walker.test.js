"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var package_walker_1 = require("../package-walker");
describe("Package Walker", function () {
    it("Works", function () {
        var packages = [
            { name: "1", dependencies: { 2: "?" } },
            { name: "2" },
            { name: "3", dependencies: { 1: "?" } },
        ];
        var byName = function (a, b) {
            return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
        };
        var walker = package_walker_1.Walker(packages.sort(byName), function () { return true; });
        var result = walker.walk();
        assert.ok(result.ok);
        var list = result.completed.map(function (x) { return x.name; }).join(",");
        assert.equal(list, "2,1,3");
    });
    it("Stops", function () {
        var packages = [
            { name: "1", dependencies: { 2: "?" } },
            { name: "2" },
            { name: "3", dependencies: { 1: "?" } },
        ];
        var byName = function (a, b) {
            return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
        };
        var i = 0;
        var walker = package_walker_1.Walker(packages.sort(byName), function () {
            return i++ < 1;
        });
        var result = walker.walk();
        assert.ok(!result.ok);
        var list = result.completed.map(function (x) { return x.name; }).join(",");
        assert.equal(list, "2");
    });
});
