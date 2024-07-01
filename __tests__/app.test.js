const data = require("../db/data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection");
const fs = require("fs/promises");

afterAll(() => {
  return db.end();
});

// beforeEach(() => {
//   return seed(data);
// });

describe("/api/products", () => {
  test("returns a status 200 and all product info", () => {
    return request(app)
      .get("/api/products")
      .expect(200)
      .then(({ body }) => {
        console.log("WORKS");
      });
  });
});
describe("/api/products/:product_id", () => {
  test("returns a status 200 and relevant product info", () => {
    return request(app)
      .get("/api/products/1")
      .expect(200)
      .then(({ body }) => {
        console.log("WORKS");
      });
  });
});

//USERS
describe("/api/:user_id", () => {
  test("returns a status 200 and relevant user info", () => {
    return request(app)
      .get("/api/users/1")
      .expect(200)
      .then(({ body }) => {
        console.log("WORKS");
      });
  });
});

describe("/api/users/:user_id/basket", () => {
  test("returns a status 200 and user basket", () => {
    return request(app)
      .get("/api/users/1/basket")
      .expect(200)
      .then(({ body }) => {
        console.log("WORKS");
      });
  });
});

describe("/api/users/:user_id/basket", () => {
  test("adds item to basket", () => {
    const itemToAdd = { product_id: 1, quantity: 1 };
    return request(app)
      .post("/api/users/1/basket")
      .send(itemToAdd)
      .expect(201)
      .then(({ body }) => {
        console.log(body.product_id);
      });
  });
});

describe("/api/users/:user_id/basket", () => {
  test("returns a status 200 and user basket", () => {
    return request(app)
      .get("/api/users/1/basket")
      .expect(200)
      .then(({ body }) => {
        console.log(body.basket);
      });
  });
});

describe.only("PATCH /api/users/:user_id/basket", () => {
  test("Update item quantity from user's basket", () => {
    const itemToPatch = { product_id: 1, quantity: 1 };
    return request(app)
      .patch("/api/users/1/basket")
      .send(itemToPatch)
      .expect(201)
      .then(({ body }) => {
        console.log(body);
      });
  });
});

describe("DELETE /api/users/:user_id/basket", () => {
  test("Delete item entirely from user's basket", () => {
    return request(app)
      .delete("/api/users/1/basket")
      .expect(200)
      .then(({ body }) => {
        console.log(body.basket);
      });
  });
});
