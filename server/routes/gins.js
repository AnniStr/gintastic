const express = require("express");
const router = express.Router();
const getDb = require("../db").getDb;

router.get('/', (req, res) => {
    let con = getDb();
    con.query("SELECT * FROM gins", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
})

router.get("/:id", function (req, res) {
    let con = getDb();
    con.query("SELECT * FROM gins WHERE id = '"+req.params.ginID+"'", function (err, result, fields) {
        if (err) throw err;
        return result;
    });
});

module.exports = router;