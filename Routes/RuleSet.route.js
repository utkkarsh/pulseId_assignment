const express = require("express");

const router = express.Router();
const RuleSet = require("../Controllers/RuleSet.controller");

router.post("/", RuleSet.create);
router.get("/", RuleSet.get);
// router.get("/:postId", RuleSet.getPost);

module.exports = router;
