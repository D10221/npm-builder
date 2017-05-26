import * as assert from "assert";
import { Query } from "../query";
describe("args query", () => {
    it("works", () => {
        assert.ok(Query({ argv: ["--xyz"] }).hasFlag("xyz"));
    });
    it("reads as string a list", () => {
        assert.equal(
            Query({ argv: ["--x", "1", "2", "3"] }).getFlagAsString("x", ""),
            "1 2 3"
        )
         assert.equal(
            Query({ argv: [] }).getFlagAsString("x", ""),
            ""
        )
    })
});