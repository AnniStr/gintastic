const express = require("express");
const router = express.Router();
const getDb = require("../services/db").getDb;

/**
 * @swagger
 * /gins:
 *  get:
 *    tags:
 *      - gins
 *    summary: Retrieve a list of Gins
 *    responses:
 *      200:
 *        description: A list of gins.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Gin'
 */
router.get('/', (req, res) => {
    const con = getDb();
    con.query("SELECT * FROM gins", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
})

/**
 * @swagger
 * /gins/{id}:
 *  get:
 *    tags:
 *      - gins
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: A list of gins.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Gin'
 */
router.get("/:id", function (req, res) {
    const con = getDb();
    console.log(req.params.id);
    con.query("SELECT * FROM gins WHERE id = '"+req.params.id+"'", function (err, result, fields) {
        if (err) {
            console.log(err);
            res.sendStatus(404);
            throw err;
        }
        console.log(result);
        res.send(result);
    });
});

module.exports = router;