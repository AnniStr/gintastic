const express = require("express");
const router = express.Router();
const { Gin } = require("../models/gin.model");

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
router.get('/', async (req, res) => {
	allGins = await Gin.findAll()
	.catch((error) => {
		console.error('ERROR GET:/gins', error);
		return(error);
	});
	res.send(allGins);
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
 *          type: string
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
router.get("/:id", async function (req, res) {
	currentGin = await Gin.findOne({
	where: {
		id : req.params.id
	}
	}).catch((error) => {
		console.error('ERROR GET:/gins/:id', error);
		return(error);
	});
	res.send(currentGin);
});

/**
 * @swagger
 * /gins:
 *  post:
 *    tags:
 *      - gins
 *    summary: Add a new gin
 *    requestBody:
 *      description: Optional description in *Markdown*
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Gin'
 *        text/plain:
 *          schema:
 *            type: string
 *    responses:
 *      '201':
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Gin'
 */
router.post("/", async function (req, res) {
	const newGin = await Gin.create({
		id: req.body.id,
		name: req.body.name,
		type: req.body.type,
		alcohol_content: req.body.alcohol_content,
		origin_country: req.body.origin_country,
		origin_city: req.body.origin_city,
		botanicals: req.body.botanicals,
		main_notes: req.body.main_notes,
		description: req.body.description,
		is_public: req.body.is_public,
		is_tipp: req.body.is_tipp
	}).catch((error) => {
		console.error('ERROR POST:/gins', error);
		return(error);
	});
	res.send(newGin);
});

module.exports = router;