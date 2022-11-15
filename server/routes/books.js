const express = require("express");
const router = express.Router();

const books = require("./book-data");


/**
 * @swagger
 * /books:
 *  get:
 *    summary: Retrieve a list of JSONPlaceholder users
 *    description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *    responses:
 *      200:
 *        description: A list of users.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */
router.get('/', function(req, res) {
  res.status(200).json(books);
});

router.get("/:id", function (req, res) {
  let book = books.find(function (item) {
    return item.id == req.params.id;
  });

  book ? res.status(200).json(book) : res.sendStatus(404);
});

/**
 * @swagger
 * /books:
 *  post:
 *    summary: Retrieve a list of JSONPlaceholder users
 *    parameters:
 *      - name: title
 *        in: body
 *        description: Titel
 *        schema:
 *          type: string
 *      - name: author
 *        in: body
 *        description: Author
 *        schema:
 *          type: string
 *      - name: finished
 *        in: body
 *        description: Finished
 *        schema:
 *          type: boolean
 *  responses:
 *    "200":
 *      description: The created book.
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 */
router.post("/", function (req, res) {
  const { title, author, finished } = req.body;
  console.log(req.body)

  let book = {
    id: books.length + 1,
    title: title,
    author: author,
    finished: finished !== undefined ? finished : false,
    createdAt: new Date(),
  };

  books.push(book);

  res.status(201).json(book);
});

router.put("/:id", function (req, res) {
  let book = books.find(function (item) {
    return item.id == req.params.id;
  });

  if (book) {
    const { title, author, finished } = req.body;

    let updated = {
      id: book.id,
      title: title !== undefined ? title : book.title,
      author: author !== undefined ? author : book.author,
      finished: finished !== undefined ? finished : book.finished,
      createdAt: book.createdAt,
    };

    books.splice(books.indexOf(book), 1, updated);

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

router.delete("/:id", function (req, res) {
  let book = books.find(function (item) {
    return item.id == req.params.id;
  });

  if (book) {
    books.splice(books.indexOf(book), 1);
  } else {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
});

module.exports = router;