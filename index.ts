require("dotenv").config();

import * as Promise from "bluebird";
import { Log, DEBUG_LEVEL } from "./src/system/log";
import * as db from "./src/system/mysql";

let c = Log(DEBUG_LEVEL.sql, "SQL");

c.log("Log");
c.info("Info")


Promise.using(db.getConnection(), connection => {
        return db.query(connection, `SELECT * FROM currencies`)
    })
    .then(r => c.log(r));