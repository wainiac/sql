require("dotenv").config({ path: "./test/test.env" })
import * as chai from "chai";
const expect = chai.expect;
import * as Promise from "bluebird";
import * as MySQL from "mysql";

import * as db from "../src/system/mysql";


describe("Database module", () => {

    it("should have an active pool", () => {
        expect(db.pool).to.not.be.null;
    });
    it("should create a connection", () => {
        return Promise.using(db.getConnection(), connection => {
            expect(connection.constructor.name).to.equal("PoolConnection");
            return Promise.resolve({});
        });
    });

    describe("Connect to database", () => {
        it("should query tables", () => {
            return Promise.using(db.getConnection(), connection => {
                return db.query(connection, `SELECT * FROM test_table`)
                    .then(rows => {
                        expect(rows.length).to.equal(0);
                        return db.query(connection, `START TRANSACTION`);
                    })
                    .then(_ => {
                        return db.query(connection, `INSERT INTO test_table VALUES ("123", "one"), ("234", "two")`)
                    })
                    .then(rows => {
                        expect(rows.constructor.name).to.equal("OkPacket");
                        expect(rows.affectedRows).to.equal(2);
                        return db.query(connection, `SELECT * FROM test_table`);
                    })
                    .then(rows => {
                        expect(rows.length).to.equal(2);
                        return db.query(connection, `ROLLBACK`);
                    })
                    .then(_ => {
                        return db.query(connection, `SELECT * FROM test_table`);
                    })
                    .then(rows => {
                        expect(rows.length).to.equal(0);
                    });
            })   
        })
         
    })

})
