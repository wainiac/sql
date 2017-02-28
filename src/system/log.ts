require("dotenv").config();

import * as util from "util";

const DEBUG_LEVEL = {
    none: 0,
    info: 1 << 0,
    log: 1 << 1,
    warn: 1 << 2,
    error: 1 << 3,
    critical: 1 << 4,
    verbose: parseInt("11111", 2),
    sql: 1 << 8,
}

const DEBUG: number = +process.env.DEBUG || 0;
const LOG = process.env.DEBUG_LOG_OUTPUT || "[${now}] |${name}| ${log}\n";
const ERROR = process.env.DEBUG_ERROR_OUTPUT || "[${now}] ${log}\n";
const WARN = process.env.DEBUG_WARN_OUTPUT || LOG;
const INFO = process.env.DEBUG_INFO_OUTPUT || LOG;
const CRITICAL = process.env.DEBUG_CRITICAL_OUTPUT || ERROR;


function _log(name: string, format: string) {
    return (...args: Array<any>) => {
        let now = new Date().toISOString();
        let log = util.format.apply(this, args);
        process.stdout.write(eval("`" + format + "`"));
    }
}

function _error(name: string, format: string) {
    return (...args: Array<any>) => {
        let now = new Date().toISOString();
        let log = util.format.apply(this, args);
        process.stderr.write(eval("`" + format + "`"));
    }
}

function Log(level: number, name: string, format?: string) {

    name = " " + (name + "        ").slice(0,10) + " ";

    if (level === 0 || (DEBUG & level)) {
        return {
            log: (DEBUG_LEVEL.log & DEBUG) ? _log(name, format || LOG) : () => {},
            error: (DEBUG_LEVEL.error & DEBUG) ? _error(name, format || ERROR) : () => {},
            warn: (DEBUG_LEVEL.warn & DEBUG) ? _log(name, format || WARN) : () => {},
            info: (DEBUG_LEVEL.info & DEBUG) ? _log(name, format || INFO) : () => {},
            critical: (DEBUG_LEVEL.critical & DEBUG) ? _error(name, format || CRITICAL) : () => {},
        }
    } else {
        return {
            log: () => {},
            error: () => {},
            warn: () => {},
            info: () => {},
            critical: () => {},
        }
    }
}

export { Log, DEBUG_LEVEL };


// const localLog = Log(DEBUG_LEVEL.sql, "SQL", "[${now}] >> SQL <<\n${log}\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n");



// localLog.log("Log");
// localLog.info("Info");
// localLog.warn("Warn");
// localLog.error("Error");

// localLog.info(`
// SELECT *
//     FROM users 
// WHERE userId = ?
//     AND eventId = ?
// GROUP BY user.name`)


