import * as assert from "assert";
import { parse } from "../parse";
import { reduce } from "../reduce";

describe("args: reduce", () => {
    it("works", () => {
        const _ = reduce(parse([
            "a", "b",
            "--xx",
            "--y",
            "--z", "1",
            "-w", "true",
            "-n", "false",
            "-x", "h",
            "-xxx", "1", "x", "true"]));
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