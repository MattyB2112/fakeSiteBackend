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

describe("GET /api/products", () => {
  test("returns a status 200 and all products", () => {
    return request(app)
      .get("/api/products")
      .expect(200)
      .then(({ body }) => {
        body.products.forEach((product) => {
          expect(product.hasOwnProperty("productname")).toBe(true);
          expect(product.hasOwnProperty("producttype")).toBe(true);
          expect(product.hasOwnProperty("productcategory")).toBe(true);
          expect(product.hasOwnProperty("productprice")).toBe(true);
          expect(product.hasOwnProperty("size5")).toBe(true);
          expect(product.hasOwnProperty("size6")).toBe(true);
          expect(product.hasOwnProperty("size7")).toBe(true);
          expect(product.hasOwnProperty("size8")).toBe(true);
          expect(product.hasOwnProperty("size9")).toBe(true);
          expect(product.hasOwnProperty("size10")).toBe(true);
          expect(product.hasOwnProperty("size11")).toBe(true);
          expect(product.hasOwnProperty("size12")).toBe(true);
          expect(product.hasOwnProperty("productimage1")).toBe(true);
          expect(product.hasOwnProperty("productimage3")).toBe(true);
          expect(product.hasOwnProperty("productimage4")).toBe(true);
          expect(product.hasOwnProperty("about")).toBe(true);
          expect(product.hasOwnProperty("dateadded")).toBe(true);
        });
      });
  });
});

test.only("returns a status 200 and all products available in a chosen size", () => {
  return request(app)
    .get("/api/products")
    .send({ size: 8 })
    .expect(200)
    .then(({ body }) => {
      console.log(body.products);
      body.products.forEach((product) => {
        expect(product.size8).not.toBe(0);
      });
    });
});

describe("GET /api/products/:product_id", () => {
  test("returns a status 200 and relevant product info", () => {
    return request(app)
      .get("/api/products/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.product.length).toBe(1);
        expect(body.product[0].product_id).toBe(1);
      });
  });
  test("valid but non-existent product_id returns a status 404 and error message", () => {
    return request(app)
      .get("/api/products/999999")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("not found");
      });
  });

  test("invalid product_id returns a status 404 and error message", () => {
    return request(app)
      .get("/api/products/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("bad request");
      });
  });
});

//USERS
describe("GET /api/users/", () => {
  test("returns a status 200 and all users info", () => {
    return request(app)
      .get("/api/users/")
      .expect(200)
      .then(({ body }) => {
        body.user.forEach((user) => {
          expect(user.hasOwnProperty("user_id")).toBe(true);
          expect(user.hasOwnProperty("userfirstname")).toBe(true);
          expect(user.hasOwnProperty("userlastname")).toBe(true);
          expect(user.hasOwnProperty("useremail")).toBe(true);
          expect(user.hasOwnProperty("userpassword")).toBe(true);
          expect(user.hasOwnProperty("userimage")).toBe(true);
          expect(user.hasOwnProperty("useraddress1")).toBe(true);
          expect(user.hasOwnProperty("useraddress2")).toBe(true);
          expect(user.hasOwnProperty("useraddress3")).toBe(true);
          expect(user.hasOwnProperty("userpostcode")).toBe(true);
          expect(user.hasOwnProperty("usersince")).toBe(true);
        });
      });
  });
});

describe("GET /api/users/id/:user_id", () => {
  test("returns a status 200 and relevant user info", () => {
    return request(app)
      .get("/api/users/id/1")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
      });
  });

  test("valid but non-existent user_id returns a status 404 and error message", () => {
    return request(app)
      .get("/api/users/id/999999")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("user_id not found");
      });
  });

  test("invalid user_id returns a status 404 and error message", () => {
    return request(app)
      .get("/api/users/id/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("bad request");
      });
  });
});

describe("GET /api/users/email/:email", () => {
  test("returns user info via email search", () => {
    return request(app)
      .get("/api/users/email/anny@parsnip.com")
      .expect(200)
      .then(({ body }) => {
        expect(body.user.length).toBe(1);
        expect(body.user[0].useremail).toBe("anny@parsnip.com");
      });
  });
  test("non-existent email returns 404 and error message", () => {
    return request(app)
      .get("/api/users/email/banana@banana.com")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("email not found");
      });
  });
});

//BASKETS
describe("POST /api/users/id/user_id/basket", () => {
  test("adds item to basket", () => {
    const itemToAdd = { product_id: 1, quantity: 1, size: 5 };
    return request(app)
      .post("/api/users/id/1/basket")
      .send(itemToAdd)
      .expect(201)
      .then(() => {
        return request(app)
          .get("/api/users/id/1/basket")
          .expect(200)
          .then(({ body }) => {
            const addedItem = body.basket[0];
            expect(addedItem.product_id).toBe(1);
          });
      });
  });
});

describe("GET /api/users/id/:user_id/basket", () => {
  test("returns a status 200 and user basket", () => {
    return request(app)
      .get("/api/users/id/1/basket")
      .expect(200)
      .then(({ body }) => {
        body.basket.forEach((basketItem) => {
          expect(basketItem.hasOwnProperty("user_id"));
          expect(basketItem.hasOwnProperty("product_id"));
          expect(basketItem.hasOwnProperty("quantity"));
          expect(basketItem.hasOwnProperty("size"));
          expect(basketItem.hasOwnProperty("productname"));
          expect(basketItem.hasOwnProperty("productprice"));
          expect(basketItem.hasOwnProperty("productimage1"));
        });
      });
  });
});

describe("PATCH /api/users/id/user_id/basket", () => {
  test("Update item quantity from user's basket", () => {
    const itemToPatch = { product_id: 1, quantity: 1, size: 5 };
    return request(app)
      .patch("/api/users/id/1/basket")
      .send(itemToPatch)
      .expect(201)
      .then(() => {
        return request(app)
          .get("/api/users/id/1/basket")
          .expect(200)
          .then(({ body }) => {
            const updatedItem = body.basket[0];
            expect(updatedItem.quantity).toBe(2);
          });
      });
  });
});

describe("DELETE /api/users/id/user_id/basket", () => {
  test("Delete item entirely from user's basket", () => {
    const itemToDelete = { product_id: 1, size: 5 };
    return request(app)
      .delete("/api/users/id/1/basket")
      .send(itemToDelete)
      .expect(200)
      .then(() => {
        return request(app)
          .get("/api/users/id/1/basket")
          .expect(200)
          .then(({ body }) => {
            expect(body.basket).toBe(0);
          });
      });
  });
});

describe("POST /api/users", () => {
  test("Create new user", () => {
    const newUserObj = {
      firstName: "Testy",
      surname: "McTesterson",
      email: "matt@matt.com",
      password: "tester",
    };
    return request(app)
      .post("/api/users")
      .send(newUserObj)
      .expect(201)
      .then(({ body }) => {
        const newUser = body.newUser;
        expect(newUser.userfirstname).toBe("Testy");
        expect(newUser.userlastname).toBe("McTesterson");
        expect(newUser.useremail).toBe("matt@matt.com");
        expect(newUser.userpassword).toBe("tester");
      });
  });
});
