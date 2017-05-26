"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var context_query_1 = require("../context-query");
var assert = require("assert");
var util_1 = require("util");
var index_1 = require("../index");
describe("context query", function () {
    it("flat deps", function () {
        assert.equal(index_1.flatDeps([
            // dep
            { name: "a", dependencies: { c: "" } },
            { name: "b", dependencies: { b: "" } },
            // no dep
            { name: "c" },
            // no dep
            { name: "d", dependencies: {} },
        ]).join(), "c,b");
        assert.equal(index_1.flatDeps([{ name: "a" }, { name: "b" },]).join(), "");
        assert.equal(index_1.flatDeps([{ name: "a", dependencies: {} }, { name: "b" },]).join(), "");
    });
    it("find Package By Name", function () {
        var query = context_query_1.contextQuery({
            // all packages
            packages: [
                { name: "a", dependencies: { c: "" }, version: "0.0.0" },
                { name: "b", dependencies: { c: "" } },
                { name: "c", dependencies: { b: "" } }
            ],
            // selcted packages: any if !length
            packageSelection: [{ name: "a" }, { name: "b" }],
            // required
            taskName: "t",
            // task package filter
            taskPackageFilter: ["b"],
            tasks: ["t"]
        });
        assert.equal(query.findPackageByName("a").version, "0.0.0");
    });
    it("find In Package Selection By Name", function () {
        var query = context_query_1.contextQuery({
            // all packages
            packages: [
                { name: "a", dependencies: { c: "" }, version: "0.0.0" },
                { name: "b", dependencies: { c: "" } },
                { name: "c", dependencies: { b: "" } }
            ],
            // selcted packages: any if !length
            packageSelection: [{ name: "a" }, { name: "b" }],
            // required
            taskName: "t",
            // task package filter
            taskPackageFilter: ["b"],
            tasks: ["t"]
        });
        assert.ok(!util_1.isNull(query.findInPackageSelectionByName("a")));
    });
    it("find Filter in List", function () {
        var query = context_query_1.contextQuery({
            // all packages
            packages: [
                { name: "a", dependencies: { c: "" }, version: "0.0.0" },
                { name: "b", dependencies: { c: "" } },
                { name: "c", dependencies: { b: "" } }
            ],
            // selcted packages: any if !length
            packageSelection: [{ name: "a" }, { name: "b" }],
            // required
            taskName: "t",
            // task package filter
            taskPackageFilter: ["b"],
            tasks: ["t"]
        });
        assert.ok(!util_1.isNull(query.findInFilterList({ name: "b" })));
    });
    it("task enabled", function () {
        var query = context_query_1.contextQuery({
            // our packages
            packages: [{ name: "x" }],
            // slected packages
            packageSelection: [{ name: "x" }],
            // this task
            taskName: "t",
            taskPackageFilter: [],
            // All Task
            tasks: ["t"]
        });
        assert.ok(query.isEnabled());
    });
    it("task disabled", function () {
        var query = context_query_1.contextQuery({
            // our packages
            packages: [{ name: "x" }, { name: "y" }],
            // slected packages
            packageSelection: [{ name: "x" }],
            // this task, doesn exists in all tasks
            taskName: "t",
            // All Task
            tasks: ["t1", "t"],
            taskPackageFilter: ["x"],
            // currently this is the only way to disable the task
            disabled: true
        });
        assert.ok(!query.isEnabled());
    });
    it("Package is Dependency", function () {
        var q = context_query_1.contextQuery({
            packages: [
                { name: "a" },
                { name: "b", dependencies: { c: "1" } },
                { name: "c", dependencies: { a: "1" } },
            ],
            packageSelection: [{ name: "b" }],
            taskName: "t",
            taskPackageFilter: [],
            tasks: ["t"]
        });
        assert.ok(q.isDependency({ name: "a" }));
        assert.ok(q.isDependency({ name: "c" }));
    });
    it("Package NOT is Dependency", function () {
        var q = context_query_1.contextQuery({
            packages: [{ name: "a" }, { name: "b", dependencies: { x: "1" } }],
            packageSelection: [],
            taskName: "t2",
            taskPackageFilter: [],
            tasks: ["t", "t1"]
        });
        assert.ok(q.isDependency({ name: "x" }));
    });
    /**
     * ?
     */
    it("Task Selected For Package", function () {
        var ctx = {
            packages: [
                { name: "a" },
                { name: "b", dependencies: { x: "1" } }
            ],
            packageSelection: [],
            taskName: "t1",
            taskPackageFilter: [],
            tasks: ["t", "t1"]
        };
        assert.ok(context_query_1.contextQuery(ctx) // ...
            .isTaskSelectedForPackage({ name: "a" }));
        ctx.taskPackageFilter = ["a"];
        assert.ok(context_query_1.contextQuery(ctx) // ...
            .isTaskSelectedForPackage({ name: "a" }));
        ctx.taskPackageFilter = ["b"];
        assert.ok(context_query_1.contextQuery(ctx) // ...
            .isTaskSelectedForPackage({ name: "b" }));
    });
    /**
     * ?
     */
    it("Task NOT Selected For Package", function () {
        var ctx = {
            packages: [
                { name: "a" },
                { name: "b", dependencies: { x: "1" } }
            ],
            packageSelection: [],
            taskName: "t1",
            taskPackageFilter: ["a"],
            tasks: ["t", "t1"]
        };
        assert.ok(!context_query_1.contextQuery(ctx) // ...
            .isTaskSelectedForPackage({ name: "b" }));
        ctx.taskPackageFilter = ["b"];
        assert.ok(!context_query_1.contextQuery(ctx) // ...
            .isTaskSelectedForPackage({ name: "a" }));
        ctx.taskPackageFilter = ["b"];
        assert.ok(!context_query_1.contextQuery(ctx) // ...
            .isTaskSelectedForPackage({ name: "a" }));
    });
    /**
     * ?
     */
    it("throws no package not found in packages", function () {
        assert.throws(function () { return context_query_1.contextQuery({
            packages: [],
            packageSelection: [],
            taskName: "t",
            taskPackageFilter: ["x"],
            tasks: ["t"]
        }); });
    });
    /**
     * ?
     */
    it("throws no task found", function () {
        assert.throws(function () { return context_query_1.contextQuery({
            packages: [],
            packageSelection: [],
            taskName: "",
            taskPackageFilter: [],
            tasks: []
        }); });
    });
    it("throws bad taskname", function () {
        assert.throws(function () { return context_query_1.contextQuery({
            packages: [],
            packageSelection: [],
            taskName: "",
            taskPackageFilter: [],
            tasks: ["x"]
        }); });
    });
    it("!ignoreDependency", function () {
        var q = context_query_1.contextQuery({
            packages: [{ name: "x" }, { name: "b", dependencies: { x: "x" } }],
            packageSelection: [{ name: "x" }],
            taskName: "x",
            taskPackageFilter: ["+"],
            tasks: ["t"]
        });
        assert.ok(!q.ignoreDependency());
    });
    it("!ignoreDependency x", function () {
        var q = context_query_1.contextQuery({
            packages: [{ name: "x" }, { name: "b", dependencies: { x: "x" } }],
            packageSelection: [{ name: "x" }],
            taskName: "x",
            taskPackageFilter: ["x", "+"],
            tasks: ["t"]
        });
        assert.ok(!q.ignoreDependency() && q.isTaskSelectedForPackage({ name: "x" }));
    });
});
