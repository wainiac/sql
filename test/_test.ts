require("dotenv").config({ path: "./test/test.env" })

console.log(process.env.TEST);

import * as chai from "chai";


const expect = chai.expect;


describe("First test", () => {
    it("should return done from a promise", () => {
        expect(true).to.be.true;
    })
})