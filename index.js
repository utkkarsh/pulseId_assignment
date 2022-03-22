const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const cors = require("cors");

// Manage environment files and environment variables
require("dotenv").config();

// Initialize express app
const app = express();

// API Logging
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

// Route Handling
const cashbackRoute = require("./Routes/Cashback.route");
const transactionRoute = require("./Routes/Transaction.route");
const rulesetRoute = require("./Routes/RuleSet.route");

// configuring end-points
app.use("/transaction", transactionRoute);
app.use("/cashback", cashbackRoute);
app.use("/ruleset", rulesetRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

// Error Handler
app.use((err, req, res, next) => {
  var error = err;
  // Set error status on request
  if (err.isJoi === true) {
    error.status = 422;
  }
  res.status(error.status);

  res.send({
    error: {
      status: error.status,
      message: error.message,
      // stack: process.env.NODE_ENV === "prod" ? "" : error.stack,
    },
  });
});

module.exports = app;
