const express = require("express");
const router = express.Router();
const getDb = require("../db").getDb;

router.get('/', (req, res) => {
    const con = getDb();
    con.query("SELECT * FROM gins", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
})

router.get("/:id", function (req, res) {
    const con = getDb();
    con.query("SELECT * FROM gins WHERE id = '"+req.params.id+"'", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
});

module.exports = router;