import * as chai from "chai";
import { resolve } from "../index";

const expect = chai.expect;


describe("First test", () => {
    it("should return done from a promise", () => {
        return resolve("test").then(result => {
            expect(result).to.equal("test:done");
        })
    })
})