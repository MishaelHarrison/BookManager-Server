const express = require("express");

const Orm = require("./repository/SqlInitialize");
const LoadData = require("./repository/LoadInitialData");
const BookRouter = require("./controllers/BookController");

const app = express();
const path = require("path");
const createDoc = require("apidoc").createDoc;

const doc = createDoc({
  src: __dirname + "/controllers",
  dest: path.resolve(__dirname, "doc"),
  silent: true,
});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (typeof doc === "boolean") console.log("Documentation not generated");

const PORT = 8080;
app.use(require("cors")());
app.use("/book", BookRouter);

app.use("/docs", express.static(__dirname + "/doc"));

app.listen(PORT, () => {
  console.log(`BookManager is running an listening on port ${PORT}`);
});

Orm.sync({ force: true }).then(() => LoadData());

module.exports = app;
