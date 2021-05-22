const express = require("express");
const question = require("./question");
const auth = require("./auth");

const router = express.Router();

router.use("/question",question);
router.use("/auth",auth);


module.exports = router;