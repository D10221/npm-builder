import * as assert from "assert";
import { create } from "../lazy";
describe("lazy", () => {
    it("works", () => {
        const i = 0;
        const lazyi = create(() => i + 1);
        assert.equal(lazyi.value, 1);
        assert.equal(lazyi.value, 1);
    });
});