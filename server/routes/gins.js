const express = require("express");
const router = express.Router();

const getDb = require("./db").getDb;
const db = getDb();

router.get('/', (req, res) => {
    con.query("SELECT * FROM gins", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
})

router.get("/:id", function (req, res) {
    con.query("SELECT * FROM gins WHERE id = '"+req.params.ginID+"'", function (err, result, fields) {
        if (err) throw err;
        return result;
    });
});

module.exports = router;