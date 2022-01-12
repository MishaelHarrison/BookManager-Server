var express = require("express");
const Op = require("sequelize").Op;
const Book = require("../repositories/BookModel");
var router = express.Router();

router.post("/", (req, res) => {
  Book.create(req.body)
    .then(() => res.status(201).send())
    .catch(() => res.status(500).send());
});

router.get("/", (_req, res) => {
  Book.findAll()
    .then((x) => res.status(200).send(x))
    .catch((x) => {
      console.log(x);
      res.status(500).send();
    });
});

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

router.delete("/:id", (req, res) => {
  Book.findByPk(req.params.id)
    .then((x) => x.destroy().then(() => res.status(200).send()))
    .catch(() => res.status(500).send());
});

router.put("/", (req, res) => {
  Book.findByPk(req.body.id)
    .then((x) => x.set(req.body))
    .then((x) => x.save().then((x) => res.status(200).send(x)))
    .catch(() => res.status(500).send());
});

module.exports = router;
