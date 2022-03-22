const express = require("express");

const router = express.Router();
const Cashback = require("../Controllers/Cashback.controller");

router.get("/", Cashback.get);
// router.get("/:postId", Cashback.getFlatComments);
// router.get("/nested/:postId", Cashback.getNestedComments);

module.exports = router;
