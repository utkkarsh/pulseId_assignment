const express = require("express");

const router = express.Router();
const Cashback = require("../Controllers/Cashback.controller");

router.get("/", Cashback.get);

module.exports = router;
