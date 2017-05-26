import * as assert from "assert";

import { Package } from "../Package";
import { Walker } from "../package-walker";

describe("Package Walker", () => {

    it("Works", () => {
        const packages: Package[] = [
            { name: "1", dependencies: { 2: "?" }},
            { name: "2" },
            { name: "3", dependencies: { 1: "?" } },
        ];

        const byName = (a: Package, b: Package): number => {
            return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
        };

        const walker = Walker(packages.sort(byName), () => true);
        const result = walker.walk();
        assert.ok(result.ok);
        const list = result.completed.map(x => x.name).join(",");
        assert.equal(list, "2,1,3");
    });

    it("Stops", () => {

        const packages = [
            { name: "1", dependencies: { 2: "?" }},
            { name: "2" },
            { name: "3", dependencies: { 1: "?" } },
        ];

        const byName = (a: Package, b: Package): number => {
            return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
        };

        let i = 0;
        const walker = Walker(packages.sort(byName), () => {
            return i++ < 1;
        });
        const result = walker.walk();
        assert.ok(!result.ok);
        const list = result.completed.map(x => x.name).join(",");
        assert.equal(list, "2");
    });
});