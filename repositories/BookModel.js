const DataTypes = require("sequelize/lib/data-types");
const sequelize = require("./sqlInitialize");

const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    require: true,
  },
  author: {
    type: DataTypes.STRING,
  },
});

module.exports = Book;
