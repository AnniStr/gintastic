const assert = require("assert");
const mysql = require('mysql');

let con;

function initDb(callback) {
    console.log("Connecting to DB...")
    new_con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "7YkECdk=dhhk",
        database: "gintasticDB"
    });
    new_con.connect(function(err) {
        if (err) throw err;
        con = new_con;
        callback;
    });
}

function getDb() {
    assert.ok(con, "Db has not been initialized. Please called init first.");
    return con;
}

module.exports = {
    getDb,
    initDb
};