const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const assert = chai.assert;

const Book = require("../entities/Book");
const app = require("../index");

chai.use(chaiHttp);
chai.should();

let stubMethods = [];

describe("Book", () => {
  afterEach(() => {
    stubMethods.forEach((x) => x.restore());
    stubMethods = [];
  });

  describe("GET book/", () => {
    it("should get all books", (done) => {
      let query = sinon.stub(Book, "findAll");
      stubMethods.push(query);
      query.withArgs().resolves(
        new Promise((resolve) => {
          resolve([
            Book.build({
              id: 1,
              title: "book",
              author: "writer",
            }),
          ]);
        })
      );
      chai
        .request(app)
        .get("/book")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an("Array");
          res.body.forEach((x) => {
            expect(x instanceof Object).to.be.true;
          });
          done();
        });
    });
  });

  describe("POST book/", () => {
    it("should add a book", (done) => {
      let query = sinon.stub(Book, "create");
      stubMethods.push(query);
      let passedBook = Book.build({
        id: 2,
        title: "book",
        author: "writer",
      });
      query.returns(
        new Promise((resolve) => {
          resolve(
            Book.build({
              id: 1,
              title: "book",
              author: "writer",
            })
          );
        })
      );
      chai
        .request(app)
        .post("/book")
        .send(passedBook)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.id).to.equal(1);
          expect(query.calledOnce).to.be.true;
          done();
        });
    });
  });

  describe("POST book/", () => {
    it("should add a book", (done) => {
      let query = sinon.stub(Book, "create");
      stubMethods.push(query);
      let passedBook = Book.build({
        id: 2,
        title: "book",
        author: "writer",
      });
      query.returns(
        new Promise((resolve) => {
          resolve(
            Book.build({
              id: 1,
              title: "book",
              author: "writer",
            })
          );
        })
      );
      chai
        .request(app)
        .post("/book")
        .send(passedBook)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.id).to.equal(1);
          expect(query.calledOnce).to.be.true;
          done();
        });
    });
  });
});
