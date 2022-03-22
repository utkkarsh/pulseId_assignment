// A transaction is any financial transaction carried out between a seller and a customer.

const express = require("express");

const router = express.Router();
const Transaction = require("../Controllers/Transaction.controller");

router.post("/", Transaction.create);
router.get("/", Transaction.get);

module.exports = router;
