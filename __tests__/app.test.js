const data = require("../db/data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection");
const fs = require("fs/promises");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("/api/products", () => {
  test("returns a status 200 and all product info", () => {
    return request(app)
      .get("/api/products")
      .expect(200)
      .then(({ body }) => {
        console.log(body.products);
      });
  });
});
