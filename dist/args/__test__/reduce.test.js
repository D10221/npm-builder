"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var parse_1 = require("../parse");
var reduce_1 = require("../reduce");
describe("args: reduce", function () {
    it("works", function () {
        var _ = reduce_1.reduce(parse_1.parse([
            "a", "b",
            "--xx",
            "--y",
            "--z", "1",
            "-w", "true",
            "-n", "false",
            "-x", "h",
            "-xxx", "1", "x", "true"
        ]));
        assert.equal(_._.join(), ["a", "b"].join());
        assert.equal(_.xx, true);
        assert.equal(_.y, true);
        assert.equal(_.z, 1);
        assert.equal(_.w, true);
        assert.equal(_.n, false);
        assert.equal(_.x, "h");
        assert.equal(_.xxx.join(), ["1", "x", "true"].join());
        assert.ok(true);
    });
});
