"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var query_1 = require("../query");
describe("args query", function () {
    it("works", function () {
        assert.ok(query_1.Query({ argv: ["--xyz"] }).hasFlag("xyz"));
    });
    it("reads as string a list", function () {
        assert.equal(query_1.Query({ argv: ["--x", "1", "2", "3"] }).getFlagAsString("x", ""), "1 2 3");
        assert.equal(query_1.Query({ argv: [] }).getFlagAsString("x", ""), "");
    });
});
