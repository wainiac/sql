import * as chai from "chai";
import { UUID } from "../src/system/random";

const expect = chai.expect;

describe("Random module", () => {
    it("should still generate random numbers", () => {
        expect(typeof Math.random()).to.equal("number");
        expect(Math.random()).to.not.equal(Math.random());
    })

    describe("UUID's", () => {
        it("should generate UUID", () => {
            expect(UUID().length).to.equal(36);
        });
        it("should generate unique UUIDs", () => {
            expect(UUID()).to.not.equal(UUID());
        });
    });
});
