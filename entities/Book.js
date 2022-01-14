const DataTypes = require("sequelize").DataTypes;
const sequelize = require("../repository/SqlInitialize");

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
