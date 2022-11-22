const assert = require("assert");
const config = require('../config');
const mysql = require('mysql');

let con;

function initDb(callback) {
    console.log("Connecting to DB...")
    const { db: { host, user, password, database} } = config;
    new_con = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
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