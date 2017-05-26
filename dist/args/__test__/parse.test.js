"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var util = require("util");
var parse_1 = require("../parse");
describe("args: parse", function () {
    it("works", function () {
        assert.equal(parse_1.parse(["--x", "1"]).filter(function (x) { return x.key === "x"; })[0].value, 1);
        assert.equal(parse_1.parse(["-x", "1"]).filter(function (x) { return x.key === "x"; })[0].value, 1);
        assert.equal(parse_1.parse(["--x", "1"]).filter(function (x) { return x.key === "x"; })[0].value, 1);
        assert.equal(parse_1.parse(["x=1"]).filter(function (x) { return x.key === "x"; })[0].value, 1);
        assert.equal(parse_1.parse(["x=x1"]).filter(function (x) { return x.key === "x"; })[0].value, "x1");
        assert.equal(parse_1.parse(["-x", "true"]).filter(function (x) { return x.key === "x"; })[0].value, true);
        assert.equal(parse_1.parse(["x=true"]).filter(function (x) { return x.key === "x"; })[0].value, true);
        assert.equal(parse_1.parse(["x=false"]).filter(function (x) { return x.key === "x"; })[0].value, false);
        assert.equal(parse_1.parse(["x=false"]).filter(function (x) { return x.key === "x"; })[0].value, false);
        try {
            parse_1.parse(["--x", "--x"]).filter(function (x) { return x.key === "x"; });
            assert.ok(false, "this line Should be unreachable");
        }
        catch (e) {
            assert.equal(e.message, "too many 'x'");
        }
        try {
            parse_1.parse(["-x", "--x"]).filter(function (x) { return x.key === "x"; });
            assert.ok(false, "this line Should be unreachable");
        }
        catch (e) {
            assert.equal(e.message, "too many 'x'");
        }
        try {
            parse_1.parse(["--x", "-x"]).filter(function (x) { return x.key === "x"; });
            assert.ok(false, "this line Should be unreachable");
        }
        catch (e) {
            assert.equal(e.message, "too many 'x'");
        }
        try {
            parse_1.parse(["--x", "x=1"]).filter(function (x) { return x.key === "x"; });
            assert.ok(false, "this line Should be unreachable");
        }
        catch (e) {
            assert.equal(e.message, "too many 'x'");
        }
        var found = parse_1.parse(["1", "A", "false"]).find(function (x) { return x.key === "_"; });
        if (util.isNullOrUndefined(found)) {
            throw new Error("Not Found");
        }
        if (!Array.isArray(found.value)) {
            throw new Error("Not Array");
        }
        assert.equal(found.value.reduce(function (a, b) { return a + "," + b; }), "1,A,false");
    });
});
