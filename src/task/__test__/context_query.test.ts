import { contextQuery } from "../context-query";
import * as assert from "assert";
import { isNull } from "util";
import { flatDeps } from "../index";
import { Package } from "../../package/Package";

describe("context query", () => {
    it("flat deps", () => {

        assert.equal(flatDeps([
            // dep
            { name: "a", dependencies: { c: "" } },
            { name: "b", dependencies: { b: "" } },
            // no dep
            { name: "c" },
            // no dep
            { name: "d", dependencies: {} },
        ]).join(), "c,b");

        assert.equal(flatDeps([{ name: "a" }, { name: "b" },]).join(), "");
        assert.equal(flatDeps([{ name: "a", dependencies: {} }, { name: "b" },]).join(), "");
    });
    it("find Package By Name", () => {

        const query = contextQuery(
            {
                // all packages
                packages: [
                    { name: "a", dependencies: { c: "" }, version: "0.0.0" },
                    { name: "b", dependencies: { c: "" } },
                    { name: "c", dependencies: { b: "" } }],
                // selcted packages: any if !length
                packageSelection: [{ name: "a" }, { name: "b" }],
                // required
                taskName: "t",
                // task package filter
                taskPackageFilter: ["b"],
                tasks: ["t"]
            }
        );
        assert.equal(query.findPackageByName("a").version, "0.0.0");
    });
    it("find In Package Selection By Name", () => {

        const query = contextQuery(
            {
                // all packages
                packages: [
                    { name: "a", dependencies: { c: "" }, version: "0.0.0" },
                    { name: "b", dependencies: { c: "" } },
                    { name: "c", dependencies: { b: "" } }],
                // selcted packages: any if !length
                packageSelection: [{ name: "a" }, { name: "b" }],
                // required
                taskName: "t",
                // task package filter
                taskPackageFilter: ["b"],
                tasks: ["t"]
            }
        );
        assert.ok(!isNull(query.findInPackageSelectionByName("a")));
    });
    it("find Filter in List", () => {

        const query = contextQuery(
            {
                // all packages
                packages: [
                    { name: "a", dependencies: { c: "" }, version: "0.0.0" },
                    { name: "b", dependencies: { c: "" } },
                    { name: "c", dependencies: { b: "" } }],
                // selcted packages: any if !length
                packageSelection: [{ name: "a" }, { name: "b" }],
                // required
                taskName: "t",
                // task package filter
                taskPackageFilter: ["b"],
                tasks: ["t"]
            }
        );
        assert.ok(!isNull(query.findInFilterList({ name: "b" })));
    });
    it("task enabled", () => {
        const query = contextQuery({
            // our packages
            packages: [{ name: "x" }],
            // slected packages
            packageSelection: [{ name: "x" }],
            // this task
            taskName: "t",
            taskPackageFilter: [], // any
            // All Task
            tasks: ["t"]
        });
        assert.ok(query.isEnabled());
    });
    it("task disabled", () => {
        const query = contextQuery({
            // our packages
            packages: [{ name: "x" }, { name: "y" }],
            // slected packages
            packageSelection: [{ name: "x" }],
            // this task, doesn exists in all tasks
            taskName: "t",
            // All Task
            tasks: ["t1", "t"],
            taskPackageFilter: ["x"], // any
            // currently this is the only way to disable the task
            disabled: true
        });
        assert.ok(!query.isEnabled());
    });
    it("Package is Dependency", () => {

        const q = contextQuery({
            packages: [
                { name: "a" },
                { name: "b", dependencies: { c: "1" } },
                { name: "c", dependencies: { a: "1" } },
            ], // all packages
            packageSelection: [{ name: "b" }], // all packages selected
            taskName: "t",
            taskPackageFilter: [], // any package
            tasks: ["t"]
        });
        assert.ok(q.isDependency({ name: "a" }));
        assert.ok(q.isDependency({ name: "c" }));
    });
    it("Package NOT is Dependency", () => {

        const q = contextQuery({
            packages: [{ name: "a" }, { name: "b", dependencies: { x: "1" } }],
            packageSelection: [], // any
            taskName: "t2",
            taskPackageFilter: [], // any
            tasks: ["t", "t1"]
        });
        assert.ok(q.isDependency({ name: "x" }));
    });

    /**
     * ?
     */
    it("Task Selected For Package", () => {
        const ctx = {
            packages: [
                { name: "a" },
                { name: "b", dependencies: { x: "1" } }],
            packageSelection: [] as Package[], // any
            taskName: "t1",
            taskPackageFilter: [] as string[], // any
            tasks: ["t", "t1"]
        };
        assert.ok(contextQuery(ctx) // ...
            .isTaskSelectedForPackage({ name: "a" }));

        ctx.taskPackageFilter = ["a"]
        assert.ok(contextQuery(ctx) // ...
            .isTaskSelectedForPackage({ name: "a" }));

        ctx.taskPackageFilter = ["b"]
        assert.ok(contextQuery(ctx) // ...
            .isTaskSelectedForPackage({ name: "b" }));

    });

    /**
     * ?
     */
    it("Task NOT Selected For Package", () => {

        const ctx = {
            packages: [
                { name: "a" },
                { name: "b", dependencies: { x: "1" } }],
            packageSelection: [] as Package[], // any
            taskName: "t1",
            taskPackageFilter: ["a"] as string[], // any
            tasks: ["t", "t1"]
        };
        assert.ok(!contextQuery(ctx) // ...
            .isTaskSelectedForPackage({ name: "b" }));

        ctx.taskPackageFilter = ["b"]
        assert.ok(!contextQuery(ctx) // ...
            .isTaskSelectedForPackage({ name: "a" }));

        ctx.taskPackageFilter = ["b"]
        assert.ok(!contextQuery(ctx) // ...
            .isTaskSelectedForPackage({ name: "a" }));
    });

    /**
     * ?
     */
    it("throws no package not found in packages", () => {
        assert.throws(() => contextQuery({
            packages: [],
            packageSelection: [],
            taskName: "t",
            taskPackageFilter: ["x"],
            tasks: ["t"]
        }));
    });

    /**
     * ?
     */
    it("throws no task found", () => {
        assert.throws(() => contextQuery({
            packages: [],
            packageSelection: [],
            taskName: "",
            taskPackageFilter: [],
            tasks: []
        }));
    });
    it("throws bad taskname", () => {
        assert.throws(() => contextQuery({
            packages: [],
            packageSelection: [],
            taskName: "",
            taskPackageFilter: [],
            tasks: ["x"]
        }));
    });
    it("!ignoreDependency", () => {
        const q = contextQuery({
            packages: [{ name: "x" }, { name: "b", dependencies: { x: "x" } }],
            packageSelection: [{ name: "x" }],
            taskName: "x",
            taskPackageFilter: ["+"], // any + deps
            tasks: ["t"]
        });
        assert.ok(!q.ignoreDependency());
    });
    it("!ignoreDependency x", () => {
        const q = contextQuery({
            packages: [{ name: "x" }, { name: "b", dependencies: { x: "x" } }],
            packageSelection: [{ name: "x" }],
            taskName: "x",
            taskPackageFilter: ["x", "+"], // any + deps
            tasks: ["t"]
        });
        assert.ok(!q.ignoreDependency() && q.isTaskSelectedForPackage({ name: "x" }));
    });
});