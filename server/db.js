const assert = require("assert");
const mysql = require('mysql');

let _db;

function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }

    mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "7YkECdk=dhhk",
        database: "gintasticDB"
      }, connected);

    function connected(err, db) {
        
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        });

        if (err) {
            return callback(err);
        }
        console.log("DB initialized");
        _db = db;
        return callback(null, _db);
    }
}

function getDb() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}

module.exports = {
    getDb,
    initDb
};