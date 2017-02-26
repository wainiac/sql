import * as Promise from "bluebird";
import * as MySQL from "mysql2/promise";


let pool = MySQL.createPool({
    user: "root"
});

pool.getConnection().then(connection => {
    connection.query(`SHOW databases`)
        .then(row => {
            console.log(row);
        })
});

console.log(pool);

let resolve = (input: string): Promise<string> => {
    return Promise.resolve()
        .then(_ => {
            return `${input}:done`;
        })
}

export { resolve };