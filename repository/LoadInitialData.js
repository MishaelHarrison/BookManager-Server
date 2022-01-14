const Book = require("../entities/Book");

module.exports = () =>
  Promise.all([
    Book.bulkCreate([
      {
        author: "Mishael Harrison",
        title: "how to code good",
      },
      {
        author: "J. K. Rowling",
        title: "Harry Potter and the Philosopher's Stone",
      },
      {
        author: "J. K. Rowling",
        title: "Harry Potter and the Chamber of Secrets",
      },
      {
        author: "J. K. Rowling",
        title: "Harry Potter and the Prisoner of Azkaban",
      },
      {
        author: "Rick Riordan",
        title: "The Lightning Thief",
      },
      {
        author: "Rick Riordan",
        title: "The Sea of Monsters",
      },
      {
        author: "Rick Riordan",
        title: "The Titan's Curse",
      },
    ]).catch((x) => console.log(x)),
  ]);
