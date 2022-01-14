var express = require("express");
const Op = require("sequelize").Op;
const Book = require("../entities/Book");
var router = express.Router();

/**
 * @apiDefine acceptBook
 * @apiParamExample {json} Body-Example:
 * {
 *  "author": (string)
 *  "title": (string)
 * }
 */

/**
 * @apiDefine respondBook
 * @apiSuccessExample responce:
 * {
 *  "id": (number)
 *  "author": (string)
 *  "title": (string)
 *  "createdAt": (date)
 *  "updatedAt": (date)
 * }
 */

/**
 * @apiGroup Book
 * @api {GET} /book get all books
 * @apiUse respondBook
 */
router.get("/", (_req, res) => {
  Book.findAll()
    .then((x) => res.status(200).send(x))
    .catch((x) => {
      console.log(x);
      res.status(500).send();
    });
});

/**
 * @apiGroup Book
 * @api {POST} /book add book
 * @apiSuccess (200) {Book} Book added book as it appears after persisting to the database
 * @apiUse acceptBook
 * @apiUse respondBook
 */
router.post("/", (req, res) => {
  Book.create(req.body)
    .then((x) => res.status(201).send(x))
    .catch(() => res.status(500).send());
});

/**
 * @apiGroup Book
 * @api {GET} /book/:input query book
 * @apiParam  {String} input either the id of the book or a substring of the title
 * @apiSuccess (200) {Book} Book responce when given a number
 * @apiSuccess (200) {Book[]} Books responce when given a string
 * @apiUse respondBook
 */
router.get("/:input", (req, res) => {
  (isNaN(req.params.input)
    ? Book.findAll({
        where: {
          title: {
            [Op.like]: `%${req.params.input}%`,
          },
        },
      })
    : Book.findByPk(req.params.input)
  )
    .then(
      (x) => res.status(200).send(x),
      () => res.status(404).send()
    )
    .catch(() => res.status(500).send());
});

/**
 * @apiGroup Book
 * @api {DELETE} /book/:id deletes a book
 * @apiParam id id of the book to get deleted
 */
router.delete("/:id", (req, res) => {
  Book.findByPk(req.params.id)
    .then((x) => x.destroy().then(() => res.status(200).send()))
    .catch(() => res.status(500).send());
});

/**
 * @apiGroup Book
 * @api {PUT} /book updates a book
 * @apiUse acceptBook
 * @apiParamExample {json} Body-Example:
 * {
 *  "id": (number)
 *  "author": (string)
 *  "title": (string)
 * }
 * @apiBody {number} id
 */
router.put("/", (req, res) => {
  Book.findByPk(req.body.id)
    .then((x) => x.set(req.body))
    .then((x) => x.save().then((x) => res.status(200).send(x)))
    .catch(() => res.status(500).send());
});

module.exports = router;
