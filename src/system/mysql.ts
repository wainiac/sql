require("dotenv").config();

import * as MySQL from "mysql";
import * as Promise from "bluebird";
import { Log } from "./log";


// custom logger
const c = Log(0, "MySQL");


let pool = MySQL.createPool({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
});
c.info("#######################");
c.info("MySQL Config:");
c.info("#######################");
c.info(JSON.stringify({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
}, null, 2));


function _getConnection(): Promise<MySQL.IConnection> {
    return new Promise<MySQL.IConnection>((resolve, reject) => {
        pool.getConnection((err, connection) => {
                if (err) {
                    reject (err);
                } else {
                    resolve(connection);
                }
            })
        });
}

function getConnection(): Promise.Disposer<MySQL.IConnection> {

    c.info(">>> Create Pool Connection ...");
    return Promise.try(_getConnection)
        .disposer(connection => {
            connection.release();
            c.info(">>> ... release Pool connection");
        })
}

function query(connection: MySQL.IConnection, ...args: Array<any>) {

    let formatSQL = MySQL.format(args[0], args[1]);
    c.info("QUERY:");
    c.info(formatSQL);
    c.info(">>>>>>>>>>>>>>>>>>>>>");

    return new Promise<any>((resolve, reject) => {
        connection.query(formatSQL, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
    .catch(err => {
        c.error("QUERY ERROR");
        c.error(err);
        c.error(">>>>>>>>>>>>>>>>>>>>>>>>");
        c.error(formatSQL);
        c.error(">>>>>>>>>>>>>>>>>>>>>>>>");
        throw err;
    })
}


export {
    getConnection,
    query,
    pool,
}


