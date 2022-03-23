const supertest = require("supertest");
require("dotenv").config();
const mongoose = require("mongoose");
const app = require("../index"); // Link to your server file

/* eslint-env jest */
beforeAll(async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(`error: ${err}`);
  }
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe("Connectivity Test", () => {
  it("POST /ruleset", async () => {
    const data = {
      startDate: "2018-04-10",
      endDate: "2018-05-10",
      amount: 2.0,
    };

    await supertest(app).post("/ruleset").send(data).expect(200);
  });

  it("POST /transaction", async () => {
    const data = {
      date: "2018-03-01",
      id: 99,
    };

    await supertest(app).post("/transaction").send(data).expect(200);
  });

  it("POST /transaction - duplicate", async () => {
    const data = {
      date: "2018-03-01",
      id: 99,
    };

    await supertest(app).post("/transaction").send(data).expect(409);
  });

  it("GET /ruleset", async () => {
    await supertest(app)
      .get("/ruleset")
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body).toBeTruthy();
      });
  });

  it("GET /transaction", async () => {
    await supertest(app)
      .get("/transaction")
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body).toBeTruthy();
      });
  });

  it("GET /cashback", async () => {
    await supertest(app)
      .get("/cashback")
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body).toBeTruthy();
      });
  });

  it("GET /abc - invalid Route", async () => {
    await supertest(app).get("/abc").expect(404);
  });

  it("POST /transaction - invalid body", async () => {
    const data = {
      id: 98,
    };

    await supertest(app).post("/transaction").send(data).expect(422);
  });
});

describe("Test Case 1", () => {
  it("POST /ruleset 1", async () => {
    const data = {
      startDate: "2020-04-10",
      endDate: "2020-05-10",
      amount: 2.0,
    };

    await supertest(app).post("/ruleset").send(data).expect(200);
  });

  it("POST /ruleset 2", async () => {
    const data = {
      startDate: "2020-01-10",
      endDate: "2020-02-10",
      amount: 1.0,
    };

    await supertest(app).post("/ruleset").send(data).expect(200);
  });

  it("POST /transaction 1", async () => {
    const data = {
      date: "2020-03-01",
      id: 1,
    };

    await supertest(app).post("/transaction").send(data).expect(200);
  });

  it("POST /transaction 2", async () => {
    const data = {
      date: "2020-02-01",
      id: 2,
    };
    await supertest(app).post("/transaction").send(data).expect(200);
  });

  it("POST /transaction 3", async () => {
    const data = {
      date: "2020-05-01",
      id: 3,
    };
    await supertest(app).post("/transaction").send(data).expect(200);
  });

  it("GET /cashback", async () => {
    await supertest(app)
      .get("/cashback")
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body).toBeTruthy();
      });
  });

  it("POST /ruleset 3 (bud)", async () => {
    const data = {
      startDate: "2020-01-10",
      endDate: "2020-02-10",
      amount: 2.0,
      redemptionLimit: 10,
      minTransactions: 2,
      budget: 100.0,
    };

    await supertest(app).post("/ruleset").send(data).expect(200);
  });

  it("POST /transaction 4", async () => {
    const data = {
      date: "2020-03-01",
      id: 4,
      customerId: 1,
    };

    await supertest(app).post("/transaction").send(data).expect(200);
  });

  it("POST /transaction 5", async () => {
    const data = {
      date: "2020-03-01",
      id: 5,
      customerId: 2,
    };

    await supertest(app).post("/transaction").send(data).expect(200);
  });

  it("POST /transaction 6", async () => {
    const data = {
      date: "2020-03-01",
      id: 6,
      customerId: 1,
    };

    await supertest(app).post("/transaction").send(data).expect(200);
  });

  it("GET /cashback", async () => {
    await supertest(app)
      .get("/cashback")
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body).toBeTruthy();
      });
  });
});
